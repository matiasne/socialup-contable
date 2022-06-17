import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Business } from 'src/app/models/business';
import { Client } from 'src/app/models/client';
import { ToastType } from 'src/app/models/toast.enum';
import { BusinessService } from 'src/app/services/business.service';
import { ClientService } from 'src/app/services/client.service';
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
  public formClient:FormGroup;
  public FormGroup:FormControl;
  public isEditing: boolean = false;
  public isSubmited: boolean = false;
  public buttonLabel = "Crear Cliente"
  public business: Business;
  public obsBusiness: any;
  public imagePreview: any = "";
  public filesToUpload: Array<File>
  constructor(
    public clientService: ClientService,
    public toastService: ToastService,
    public businessService: BusinessService,
    public activateRoute: ActivatedRoute,
    public selectedService: SelectedService,
    public router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.formClient= new FormGroup({
      name: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      surname:new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),
      documentType:new FormControl('',Validators.required),
      documentNumber:new FormControl('',Validators.required),
      postCode:new FormControl('',Validators.required),
      city:new FormControl('',Validators.required),
      image: new FormControl('')
    });
  }
  ionViewDidEnter(){

    this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
      next: (data: any) => {
        this.business = data
      }
    })
    if (this.activateRoute.snapshot.params.id) {
      this.buttonLabel = "Guardar";
      this.isEditing = true
      this.clientService.get(this.activateRoute.snapshot.params.id).subscribe({
        next: (data) => {

          console.log(data.client)
          this.formClient.setValue({
            name: data.client.name,
            address: data.client.address,
            surname: data.client.surname,
            email: data.client.email,
            phone: data.client.phone,
            documentType: data.client.documentType,
            documentNumber: data.client.documentNumber,
            postCode: data.client.postCode,
            city: data.client.city,
            image:  data.client.image?data.client .image:""
          })

        }
      })
    } else {
      this.buttonLabel = "Crear Nuevo";
      this.isEditing = false
    }

    if(!this.business){
      this.router.navigate(['/list-business'])
      
    }
  }
   

onSubmit(){
  this.isSubmited = true;
    if (this.formClient.valid) {
      if (this.isEditing) {
        this.updateProfileClient();
      }
      else {
        this.createClient();
      }
    } else {
      this.toastService.show(ToastType.error, "Por favor complete todos los campos")
    }
}

updateProfileClient() {
  let idClient = this.activateRoute.snapshot.params.id
  let client = new Client(
    idClient,
    this.formClient.controls['name'].value,
    this.formClient.controls['image'].value,
    this.formClient.controls['city'].value,
    this.formClient.controls['address'].value,
    this.formClient.controls['email'].value,
    this.formClient.controls['phone'].value,
    this.business._id,
    this.formClient.controls['postCode'].value,
    this.formClient.controls['documentType'].value,
    this.formClient.controls['documentNumber'].value,
    this.formClient.controls['surname'].value,
  )
  this.clientService.update(client).subscribe({
    next: (data) => {
      this.toastService.show(ToastType.success, "Se ha actualizado el cliente correctamente")
    }
  })
}
createClient() {
  this.isSubmited = true;

  let client = new Client('',
    this.formClient.controls['name'].value,
    this.formClient.controls['image'].value,
    this.formClient.controls['city'].value,
    this.formClient.controls['address'].value,
    this.formClient.controls['email'].value,
    this.formClient.controls['phone'].value,
    this.business._id,
    this.formClient.controls['postCode'].value,
    this.formClient.controls['documentType'].value,
    this.formClient.controls['documentNumber'].value,
    this.formClient.controls['surname'].value,
   
  )
  console.log(client)
  this.clientService.add(client).subscribe({
    next: (data) => {
      console.log(data)
    }
  })

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
changeImage(event: any) {
  this.formClient.patchValue({
    image: event
  })
}

  get name(){return this.formClient.get('name');}
  get address(){return this.formClient.get ('address');}
  get surname(){return this.formClient.get('surname');}
  get email(){return this.formClient.get('email');}
  get phone(){return this.formClient.get('phone');}
  get documentType(){return this.formClient.get('documentType');}
  get documentNumber(){return this.formClient.get('documentNumber');}
  get postCode(){return this.formClient.get('postCode');}
  get city(){return this.formClient.get('city');}
}
