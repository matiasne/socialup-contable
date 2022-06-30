import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Business } from 'src/app/features/business/models/business';
import { Client } from 'src/app/features/clients/models/client';
import { ToastType } from 'src/app/models/toast.enum';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { SelectedService } from 'src/app/services/global/selected.service';
import { HelperService } from 'src/app/services/helpers.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.page.html',
  styleUrls: ['./form-client.page.scss'],
  providers: [ClientService, HelperService, BusinessService,]
})
export class FormClientPage implements OnInit {
  public client:Client;
  public business: Business;
  public obsBusiness: any
  constructor(
    public clientService: ClientService,
    public toastService: ToastService,
    public businessService: BusinessService,
    public activateRoute: ActivatedRoute,
    public selectedService: SelectedService,
    public router: Router,
    public alertController: AlertController
  ) {
    this.client = new Client ('','','','','','','','','','','','')
   }

  ngOnInit() {
  
  }
  ionViewDidEnter(){

    this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
      next: (data: any) => {
        this.business = data
        this.client.idBusiness = this.business._id;
      }
    })
   
    if (this.activateRoute.snapshot.params.id) { 
      this.client._id = this.activateRoute.snapshot.params.id; 
      
     
    } 


    if(!this.business){
      this.router.navigate(['/list-business'])
      
    }
  }
   
  submit(data){
    console.log(data)
  }



async doAlert(){
  const alert = await this.alertController.create({
    header:'ELIMINAR CUENTA',
    message:'Desea eliminar su cuenta permanentemente.No podra volvr a recuperarla.',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        id: 'cancel-button',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Ok',
        id: 'confirm-button',
        handler: () => {
          this.clientService._delete(this.activateRoute.snapshot.params.id).subscribe({
            next:(data)=>{
              this.toastService.show(ToastType.warning, "Se ha eliminado el cliente correctamente")
              this.router.navigate(['/list-business'])
            },
              error:(err)=>{
                console.log(err);

              }
          })
          
        }
      }
    ],
  });
  (await alert).present()

}

}
