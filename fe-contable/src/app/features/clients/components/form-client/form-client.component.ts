import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Business } from 'src/app/features/business/models/business';
import { Client } from 'src/app/features/clients/models/client';
import { ToastType } from 'src/app/models/toast.enum';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss'],
})
export class FormClientComponent implements OnInit {

  @Input() client: Client;
  @Input() business: Business;
  @Output() handleSubmit = new EventEmitter<any>();

  public formClient: FormGroup;
  public isEditing: boolean = false;
  public isSubmited: boolean = false;
  public buttonLabel = "Crear Cliente";
  public buttonEdit = "Editar Cliente";

  constructor(
    private toastService: ToastService,
    public clientService: ClientService,
    public activateRoute: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,

  ) {

    this.client = new Client('', '', '', '', '', '', '', '', '', '', '', '')
    this.formClient = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      documentType: new FormControl('', Validators.required),
      documentNumber: new FormControl('', Validators.required),
      postCode: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      image: new FormControl('')
    });
  }

  ngOnInit() {

    if (this.client._id != "") {
      this.isEditing = true
      this.formClient.setValue({
        name: this.client.name,
        address: this.client.address,
        surname: this.client.surname,
        email: this.client.email,
        phone: this.client.phone,
        documentType: this.client.documentType,
        documentNumber: this.client.documentNumber,
        postCode: this.client.postCode,
        city: this.client.city,
        image: this.client.image ? this.client.image : ""
      })
    } else {
      this.isEditing = false
    }
  }

  changeImage(event: any) {
    this.formClient.patchValue({
      image: event
    })
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.formClient.valid) {
      this.client.name = this.formClient.controls.name.value
      this.client.image = this.formClient.controls.image.value
      this.client.city = this.formClient.controls.city.value
      this.client.address = this.formClient.controls.address.value
      this.client.email = this.formClient.controls.email.value
      this.client.phone = this.formClient.controls.phone.value
      this.client.postCode = this.formClient.controls.postCode.value
      this.client.documentType = this.formClient.controls.documentType.value
      this.client.documentNumber = this.formClient.controls.documentNumber.value
      this.client.surname = this.formClient.controls.surname.value

      this.save()
    } else {
      this.toastService.show(ToastType.error, "Por Favor complete todo los campos")
    }
  }
  save() {
    if (this.isEditing) {
      this.updateProfileClient();
    }
    else {
      this.createClient();
      this.formClient.reset();
    }
  }

  createClient() {
    this.clientService.add(this.client).subscribe({
      next: (data) => {
        this.handleSubmit.emit(data)
      }
    })

  }
  updateProfileClient() {

    this.clientService.update(this.client).subscribe({
      next: (data) => {
        this.toastService.show(ToastType.success, "Se ha actualizaddo el prodcuto correctamente")
        this.handleSubmit.emit(data)

      }
    })
  }
  async doAlert() {
    const alert = await this.alertController.create({
      header: 'ELIMINAR CUENTA',
      message: 'Desea eliminar su cuenta permanentemente.No podra volvr a recuperarla.',
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
              next: (data) => {
                this.toastService.show(ToastType.warning, "Se ha eliminado el cliente correctamente")
                this.router.navigate(['/list-client'])
              },
              error: (err) => {
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
