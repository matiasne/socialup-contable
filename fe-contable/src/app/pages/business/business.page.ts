import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm,Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'src/app/auth/model/session';
import { AlertController, NavParams, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Business } from 'src/app/features/business/models/business';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from 'src/app/services/global';
import { HelperService } from 'src/app/services/helpers.service';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/models/toast.enum';





@Component({
  selector: 'app-business',
  templateUrl: './business.page.html',
  styleUrls: ['./business.page.scss']
})
export class  BusinessPage implements OnInit {
  public title:'Perfil BUSINESS'
  public business:Business;
  public user:User;
  public priority:string;
  
  public dbData: any;
  
  public token: any;
  public imagePreview:any=""
  public mostrar=false;
  
  session: Session; 

  
constructor(
  public toastService: ToastService,
  public businessService: BusinessService,
  public activateRoute: ActivatedRoute,
  public router: Router,
  public alertController: AlertController
){
  this.business = new Business ('','','','','','','','')

}
  ngOnInit() {
   

   
 
  }


  

  // onResetForm(){
  //   this.formBusiness.reset();
  // }

  public filesToUpload: Array<File>


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
            this.businessService._delete(this.activateRoute.snapshot.params.id).subscribe({
              next:(data)=>{
                this.toastService.show(ToastType.warning, "Se ha eliminado la empresa correctamente")
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