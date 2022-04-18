import { Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { EmptyError } from 'rxjs';

import { User } from './models';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
 
})



export class LoginPage implements OnInit{
 public title="Inicio De Sesion"
 public user:User;
 public identity:any;
 public token:any;
 public priority:string;
 public formData:FormGroup;
 public dbData:any;
 public router: any;
 public isSubmited=false;
 showPassword =false;
 passwordToggleIcon = 'eye';
 
  
 
 constructor(
    public route:ActivatedRoute
    ){ 
   this.user = new User('','','','','','ROLE_USER','');
   }
togglePassword():void{
   this.showPassword =!this.showPassword
  
   if(this.passwordToggleIcon =='eye'){
     this.passwordToggleIcon='eye-off';
   }else{
     this.passwordToggleIcon='eye';
   }
}

  ngOnInit() {
   
     
    this.priority=this.route.snapshot.paramMap.get('priority')

    this.formData= new FormGroup({
         email: new FormControl('',Validators.compose([Validators.required,Validators.email,Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)])),
         password: new FormControl('',([Validators.required,Validators.minLength(5),])),
        
    });

    
  }
validation_messages = {
    'email': [
      { type: 'required', message: 'Campo Obligatorio.' },
      { type: 'pattern', message: 'El formato no es valido.' },
    ],
    'password': [
      { type: 'required', message: 'Contraseña Obligatoria' }
    ],
    }
  
    
  onSubmit(){
    this.isSubmited=true;
    
    if(this.formData.valid){
  
      console.log('valid')
    }else{
      console.log('not  valid')
    }
  }

  onResetForm(){
  this.formData.reset();    

  }
  navigate(){
    this.router.navigate(['/register'])
  }

    
  get email(){return this.formData.get('email');}
  get password(){return this.formData.get ('password');}
 }


 