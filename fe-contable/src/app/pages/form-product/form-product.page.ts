import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.page.html',
  styleUrls: ['./form-product.page.scss'],
})
export class FormProductPage implements OnInit {
  isSubmited=false;
  formProduct : FormGroup;
  FormGroup: FormControl
  public bussines:any;
  constructor() { }

  ngOnInit() {
    this.formProduct = new FormGroup({
      name: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      code: new FormControl('', Validators.required),
      costPrice: new FormControl('', Validators.required),
      salePrice: new FormControl('', Validators.required)
      
    });
  }
  
  onSubmit(){
    this.isSubmited=true;
    
    if(this.isSubmited = true){
      let product = new Product("",
        this.formProduct.controls['name'].value,
        this.formProduct.controls['description'].value,
        this.formProduct.controls['code'].value,
        this.formProduct.controls['costPrice'].value,
        this.formProduct.controls['salePrice'].value,
        ''
        /*idBusiness*/)
      console.log('valid')
    }else{
      console.log('not  valid')
    }
  }
}
