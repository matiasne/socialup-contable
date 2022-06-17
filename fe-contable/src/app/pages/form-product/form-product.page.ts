import { Product } from 'src/app/models/product';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { HelperService } from 'src/app/services/helpers.service';
import { Business } from 'src/app/models/business';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/models/toast.enum';
import { BusinessService } from 'src/app/services/business.service';
import { SelectedService } from 'src/app/services/global/selected.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.page.html',
  styleUrls: ['./form-product.page.scss'],
  providers: [ProductService, HelperService, BusinessService,]
})
export class FormProductPage implements OnInit {
  public isSubmited: boolean = false;
  public isEditing: boolean = false;
  public formProduct: FormGroup;
  public FormGroup: FormControl;
  public imagePreview: any = "";
  public product: any;
  public business: Business
  public filesToUpload: Array<File>
  public buttonLabel = "Crear Producto"
  public obsBusiness: any;
  
  constructor(
    public productService: ProductService,
    public toastService: ToastService,
    public businessService: BusinessService,
    public activateRoute: ActivatedRoute,
    public selectedService: SelectedService,
    public router: Router,
    public alertController: AlertController
  ) {

  }

  ngOnInit() {  
    
    this.formProduct = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      costPrice: new FormControl('', Validators.required),
      salePrice: new FormControl('', Validators.required),
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
      this.productService.get(this.activateRoute.snapshot.params.id).subscribe({
        next: (data) => {

          console.log(data.product)
          this.formProduct.setValue({
            name: data.product.name,
            description: data.product.description,
            code: data.product.code,
            costPrice: data.product.costPrice,
            salePrice: data.product.salePrice,
            image: data.product.image?data.product.image:""
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

  changeImage(event: any) {
    this.formProduct.patchValue({
      image: event
    })
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.formProduct.valid) {
      if (this.isEditing) {
        this.updateProfileProducts();
      }
      else {
        this.createProduct();
      }
    } else {
      this.toastService.show(ToastType.error, "Por favor complete todos los campos")
    }
  }

  createProduct() {
    this.isSubmited = true;
    let product = new Product('',
      this.formProduct.controls['name'].value,
      this.formProduct.controls['description'].value,
      this.formProduct.controls['code'].value,
      this.formProduct.controls['costPrice'].value,
      this.formProduct.controls['salePrice'].value,
      this.business._id,
      this.formProduct.controls['image'].value,
    )
    console.log(product)
    this.productService.add(product).subscribe({
      next: (data) => {
        console.log(data)
      }
    })

  }

  updateProfileProducts() {
    let idProduct = this.activateRoute.snapshot.params.id
    let product = new Product(
      idProduct,
      this.formProduct.controls['name'].value,
      this.formProduct.controls['description'].value,
      this.formProduct.controls['code'].value,
      this.formProduct.controls['costPrice'].value,
      this.formProduct.controls['salePrice'].value,
      this.business._id,
      this.formProduct.controls['image'].value,
    )
    this.productService.update(product).subscribe({
      next: (data) => {
        this.toastService.show(ToastType.success, "Se ha actualizado el producto correctamente")
      }
    })
  }

  onDestroy() {
    this.formProduct.reset();
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
            this.productService._delete(this.activateRoute.snapshot.params.id).subscribe({
              next:(data)=>{
                this.toastService.show(ToastType.warning, "Se ha eliminado el producto correctamente")
                this.router.navigate(['/products'])
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
