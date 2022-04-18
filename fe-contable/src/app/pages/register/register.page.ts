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
  //public priority: string;
  public formData: FormGroup;
  public dbData: any;
  errorMessage:"La Contraseña no coincide"
  public isSumited= false;
 
  constructor(private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
     // this.priority = this.route.snapshot.paramMap.get('priority');
    console.log("sdfsdf")
    this.formData = new FormGroup({
      name: new FormControl("",[Validators.required, Validators.minLength(5)]),
      surname: new FormControl("",[Validators.required, Validators.minLength(5)]),
      email: new FormControl ("",[Validators.required,Validators.maxLength(30), Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)]),
      password: new FormControl("",Validators.compose([Validators.required, Validators.minLength(5)])),
      validpassword: new FormControl("",Validators.compose ([Validators.required])),
    })

  
  }



  onSubmit (){
    this.isSumited=true;
    if(this.formData.valid){
     
      console.log('valid');
    }else{
      console.log('Not Valid')
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

