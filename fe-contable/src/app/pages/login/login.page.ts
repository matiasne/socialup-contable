import { Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { Session } from 'src/app/models/session';
import { StorageSessionService } from 'src/app/services/storage-session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [UserService,StorageSessionService]
})

export class LoginPage implements OnInit{
 public title="Inicio De Sesion"
 public identity:any;
 public token:any;
 public priority:string;
 public formData:FormGroup;
 public dbData:any;
 //public router: any;
 public isSubmited=false;
 public user:User;
 showPassword =false;
 passwordToggleIcon = 'eye';
 
  
 
 constructor(
  private _userService : UserService,
    private _storageSessionService: StorageSessionService, 
    public router:Router
    ){ this.user = new User('','','','','ROLE_USER','','','','');
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
      console.log('y vamos de nuevo')
      this._userService.singnup(email,password).subscribe(
        {
          next: (data:any)=>{
          //  let session:Session = new Session(data.token, data.user)
            let user:User = new User(
              data.user._id,
              data.user.name,
              data.user.surname, 
              data.user.email,
              data.user.role,
              data.user.image,
              data.user.gender,
              data.user.address,
              data.user.phone);

              let session:Session = new Session(data.token, user)

            this._storageSessionService.setSession(session);
            console.log(session.token);
          },
          error:(err)=>{
            console.log(err)
            if(err.status == 400){
              alert(err.error.message)
            }
          },
          complete:()=>{
            console.log("Completo")
            

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
  navigate(destination:string){
    this.router.navigate([destination])
    // this.router.navigate(['items'], { relativeTo: this.route });
  }

    
  get email(){return this.formData.get('email');}
  get password(){return this.formData.get ('password');}
 }


 