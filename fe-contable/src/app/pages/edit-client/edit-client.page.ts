import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Business } from 'src/app/features/business/models/business';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { Client } from 'src/app/features/clients/models/client';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { ToastType } from 'src/app/models/toast.enum';
import { SelectedService } from 'src/app/services/global/selected.service';
import { HelperService } from 'src/app/services/helpers.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.page.html',
  styleUrls: ['./edit-client.page.scss'],
  providers:[ClientService,HelperService, BusinessService  ]
})
export class EditClientPage implements OnInit {

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
    public alertController: AlertController,

  ) {

    this.client = new Client ('','','','','','','','','','','','')

    this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
      next: (data: any) => {
        this.business = data
        this.client.idBusiness = this.business._id;
      }
    })
   
   }

  ngOnInit() {
    this.client = Client.adapt(JSON.parse(this.activateRoute.snapshot.paramMap.get('client')))
    console.log(this.client._id)
  }

  submit(data){
 
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
