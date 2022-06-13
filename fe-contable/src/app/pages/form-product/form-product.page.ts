import { Product } from 'src/app/models/product';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm,Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { HelperService } from 'src/app/services/helpers.service';
import { Business } from 'src/app/models/business';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/models/toast.enum';


@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.page.html',
  styleUrls: ['./form-product.page.scss'],
  providers:[ProductService,HelperService,]
})
export class FormProductPage implements OnInit {
  public isSubmited:boolean=false;
  public isEditing:boolean = false;
  public formProduct:FormGroup;
  public FormGroup:FormControl;
  public imagePreview:any="";
  public product:any;
  public business :Business
  public filesToUpload: Array<File>
  public buttonLabel = "Crear Producto"

  constructor(
    public route: ActivatedRoute, 
    public productService:ProductService,
    public toastService:ToastService,
  ) { }

  ngOnInit() {
    this.formProduct = new FormGroup({
      name: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      code: new FormControl('', Validators.required),
      costPrice: new FormControl('', Validators.required),
      salePrice: new FormControl('', Validators.required),
      image: new FormControl('')
    });
  }

  changeImage(event:any){
    this.formProduct.patchValue({
      image:event
    })
  }

  onSubmit(){    
    this.isSubmited=true;
    if(this.formProduct.valid){
      if(this.isEditing){
        this.updateProfileBusinesses();
      }
      else{
        this.createProduct();
      }
    }else{
      this.toastService.show(ToastType.error,"Por favor complete todos los campos")
    }
  }
  
  createProduct(){
    this.isSubmited=true;
    console.log('valid')
      let product = new Product('',
        this.formProduct.controls['name'].value,
        this.formProduct.controls['description'].value,
        this.formProduct.controls['code'].value,
        this.formProduct.controls['costPrice'].value,
        this.formProduct.controls['salePrice'].value,
        'idbusiness',
        this.formProduct.controls['image'].value,
        )
        console.log(product)
      this.productService.add(product).subscribe({
        next:(data)=>{
          console.log(data)
        }
      })
    
  }

  updateProfileBusinesses(){
    
  }
}
