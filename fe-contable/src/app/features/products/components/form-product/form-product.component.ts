import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/features/products/models/product';
import { Business } from 'src/app/features/business/models/business';
import { ToastType } from 'src/app/models/toast.enum';
import { ToastService } from 'src/app/services/toast.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BusinessService } from 'src/app/features/business/service/business.service';

@Component({
  selector: 'socialup-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {

  @Input() product:Product;
  @Input() business:Business;
  @Output() handleSubmit = new EventEmitter<any>();

  public isEditing: boolean = false;  
  public isSubmited: boolean = false;
  public formProduct: FormGroup;
  public buttonLabel = "Crear Producto"

  constructor(
    private toastService:ToastService,
    private productService:ProductService,
    public router: Router,
    public alertController: AlertController,
    public activateRoute:ActivatedRoute,
    public businessService:BusinessService
  ) { 

    this.product =  new Product('','','','','','','','')

    this.formProduct = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      costPrice: new FormControl('', Validators.required),
      salePrice: new FormControl('', Validators.required),
      image: new FormControl('')
    });
  }

  ngOnInit() {
    
    if(this.product._id != ""){
      this.isEditing = true;
      this.productService.get(this.product._id).subscribe({
        next: (data) => {
          this.product = data
        }
      })

      this.buttonLabel = "Guardar";

      this.formProduct.setValue({
        name: this.product.name,
        description: this.product.description,
        code: this.product.code,
        costPrice: this.product.costPrice,
        salePrice: this.product.salePrice,
        image: this.product.image?this.product.image:""
      })
      
    }
    else{
      this.isEditing = false;
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

      this.product.name = this.formProduct.controls.name.value
      this.product.description = this.formProduct.controls.description.value
      this.product.code = this.formProduct.controls.code.value
      this.product.costPrice = this.formProduct.controls.costPrice.value
      this.product.salePrice = this.formProduct.controls.salePrice.value
      this.product.image = this.formProduct.controls.image.value
      this.product.idBusiness = this.businessService.getBusinessId()
      console.log(this.businessService.getBusinessId())
      this.save()

      
    }
    else {
      this.toastService.show(ToastType.error, "Por favor complete todos los campos")
    }
  }

  save() {
    if (this.isEditing) {
      this.updateProfileProducts();
    }
    else {
      this.createProduct();
    }    
  }

  createProduct() {    
    console.log(this.product)
    this.productService.add(this.product).subscribe({
      next: (data) => {
        console.log(data)
        
        this.handleSubmit.emit(data)
      }
    })
  }

  updateProfileProducts() {    
    this.productService.update(this.product).subscribe({
      next: (data) => {
        this.toastService.show(ToastType.success, "Se ha actualizado el producto correctamente")
        this.handleSubmit.emit(data)
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
