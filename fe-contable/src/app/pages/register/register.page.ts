import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators,FormBuilder  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public title : "REGISTRATE";
  public formData: FormGroup;
  public isSubmitted: boolean;
  public showPassword : boolean;
  public passwordToggleIcon='eye';


  constructor(private route: ActivatedRoute) { 
    
  }
  togglePassword(): void {
    this.showPassword = !this.showPassword
    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon= 'eye-off';
    }else{
      this.passwordToggleIcon='eye';
    }

  }

  ngOnInit() {
     // this.priority = this.route.snapshot.paramMap.get('priority');
    
    this.formData = new FormGroup({
      name: new FormControl("",[Validators.required, Validators.minLength(5)]),
      surname: new FormControl("",[Validators.required, Validators.minLength(5)]),
      email: new FormControl ("",[Validators.required,Validators.maxLength(30), Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)]),
      password: new FormControl("",Validators.compose([Validators.required, Validators.minLength(5)])),
      validpassword: new FormControl("",Validators.compose ([Validators.required])),
    })

  
  }
 

  onSubmit (){
    this.isSubmitted=true;
    if(this.formData.valid){
     
      
    }else{
      
    }
  }
  onResetForm() {
    throw new Error('Method not implemented.');
  }

  isMatching(){
    let password = this.formData.controls.password.value
    let validpassword = this.formData.controls.validpassword.value

    if(password != validpassword){
      return true
    }
    else
      return false
  }

  userRegister(formRegister: NgForm){
  
}
get name(){return this.formData.get('name');}
get surname(){return this.formData.get('surname');}
get password(){return this.formData.get('password');}
get validpassword(){return this.formData.get('validpassword');}
get email(){return this.formData.get('email');}
}

