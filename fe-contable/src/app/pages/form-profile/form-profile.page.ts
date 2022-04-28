import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm,Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.page.html',
  styleUrls: ['./form-profile.page.scss'],
})
export class FormProfilePage implements OnInit {
  public formProfile: FormGroup;
  isSubmitted =false;
  showPassword= false;
  passwordToggleIcon='eye';
  mostrar= false;
  imagePreview: any="";

  constructor(public route: ActivatedRoute) { }
  togglePassword():void{
    this.showPassword=!this.showPassword
    if(this.passwordToggleIcon =='eye'){
      this.passwordToggleIcon='eye-off';
    }else{
      this.passwordToggleIcon ='eye';
    }
  }

  ngOnInit() {
    this.formProfile = new FormGroup({
      name: new FormControl("",[Validators.required, Validators.minLength(3)]),
      surname: new FormControl("",[Validators.required,Validators.minLength(3)]),
      gender: new FormControl("",[]),
      direction: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required, Validators.minLength(5)])
    })
  }
 

  onSubmit (){
    this.isSubmitted=true;
    if(this.formProfile.valid){
     
      console.log('valid');
    }else{
      console.log('Not Valid')
    }
  }
  get name (){return this.formProfile.get('name');}
  get surname(){return this.formProfile.get('surname');}
  get password(){return this.formProfile.get('password');}
  get gender(){return this.formProfile.get('gender');}
  get direction(){return this.formProfile.get('direction');}
  
  imageClick(){
    let content = document.getElementById('selectedFile');
    content.click();
  }
 submitImage(){
       if(this.mostrar=!this.mostrar){
       }
    }
  handleImageChange(event:any):void{
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }
}
