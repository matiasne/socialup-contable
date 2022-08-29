import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { HelperService } from 'src/app/services/helpers.service';
import { Business } from 'src/app/features/business/models/business';
import { SessionService } from 'src/app/auth/services/session.service';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [HelperService]
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
 public business:Business
  
 
 constructor(
    private authService : AuthService,
    private _sessionService: SessionService, 
    public router:Router
  ){ 
      this.user = new User('','','','','ROLE_USER','','','','');
      this.business = new Business('','','','','','','','');
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
         email: new FormControl('',([Validators.required])),
         password: new FormControl('',([Validators.required])),
    });

  }

   public onSubmit(){
    
    this.isSubmited=true;
    
    if(this.formData.valid){
      let email = this.formData.controls['email'].value
      let password = this.formData.controls['password'].value
      
      this.authService.authenticate(email,password).then((data:any) =>{
       this.router.navigate(['/list-business'])
      })
    }

  }

  onResetForm(){
    this.formData.reset();    

  }

  // navigate(destination:string){
  //   this.router.navigate([destination])
  //   this.router.navigate(['items'], { relativeTo: this.route });

  ionViewDidEnter(){
    this.onResetForm()
  }
  
  ionViewWillEnter(){
console.log('!!!!!')
  }

  get email(){return this.formData.get('email');}
  get password(){return this.formData.get ('password');}
 }


 