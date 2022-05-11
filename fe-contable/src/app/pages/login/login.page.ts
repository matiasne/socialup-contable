import { Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [UserService]
})



export class LoginPage implements OnInit{
 public title="Inicio De Sesion"
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
  private _userService : UserService,
    public route:ActivatedRoute
    ){ 
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
         email: new FormControl('',Validators.compose([Validators.required,Validators.email,/*Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)*/])),
         password: new FormControl('',([Validators.required])),
        
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
  
   public onSubmit(){
    
      
    this.isSubmited=true;
    
    
    if(this.formData.valid){
      let email = this.formData.controls['email'].value
      let password = this.formData.controls['password'].value
      this._userService.singnup(email,password).subscribe(
        {
          next: (data)=>{
            console.log(data)
          },
          error:(err)=>{
            console.log(err)
            if(err.status == 400){
              alert(err.error.message)
            }
          },
          complete:()=>{
            console.log("Completo")
            localStorage.setItem('identity', JSON.stringify(this.identity));

          }
        }
      
        )
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


 