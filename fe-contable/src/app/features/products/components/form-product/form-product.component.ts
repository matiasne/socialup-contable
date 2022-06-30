import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/features/products/models/product';
import { Business } from 'src/app/features/business/models/business';
import { ToastType } from 'src/app/models/toast.enum';
import { ToastService } from 'src/app/services/toast.service';
import { ProductService } from '../../services/product.service';

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
    private productService:ProductService
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
    this.productService.add(this.product).subscribe({
      next: (data) => {
        console.log(data)
        this.product = data
        this.handleSubmit.emit(data)
      }
    })
  }

  updateProfileProducts() {    
    this.productService.update(this.product).subscribe({
      next: (data) => {
        this.product = data
        this.toastService.show(ToastType.success, "Se ha actualizado el producto correctamente")
        this.handleSubmit.emit(data)
      }
    })
  }


}
