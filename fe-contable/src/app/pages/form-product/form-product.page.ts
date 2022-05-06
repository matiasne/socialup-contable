import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.page.html',
  styleUrls: ['./form-product.page.scss'],
})
export class FormProductPage implements OnInit {
  isSubmited=false;
  formData: any;

  constructor() { }

  ngOnInit() {
  }
  
  onSubmit(){
    this.isSubmited=true;
    
    if(this.formData.valid){
  
      console.log('valid')
    }else{
      console.log('not  valid')
    }
  }
}
