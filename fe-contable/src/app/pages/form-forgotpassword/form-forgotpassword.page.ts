import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-forgotpassword',
  templateUrl: './form-forgotpassword.page.html',
  styleUrls: ['./form-forgotpassword.page.scss'],
})
export class FormForgotpasswordPage implements OnInit {
  public formForgotPassword: FormGroup;

  constructor() { }

  ngOnInit() {
  
    
    this.formForgotPassword= new FormGroup({
      email: new FormControl('',[Validators.required]),
    })


    
  }
  onReset(){
   console.log("SendEmail")
  }
}
