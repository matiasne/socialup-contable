import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm,Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'src/app/models/session';
import { StorageSessionService } from 'src/app/services/storage-session.service';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Business } from 'src/app/models/business';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from 'src/app/services/global';
import { HelperService } from 'src/app/services/helpers.service';
import { BusinessService } from 'src/app/services/business.service';





@Component({
  selector: 'app-business',
  templateUrl: './business.page.html',
  styleUrls: ['./business.page.scss'],
  providers:[BusinessService,HelperService ]
})
export class  BusinessPage implements OnInit {
  public title:'Perfil BUSINESS'
  public business:any;
  public priority:string;
  public router: any;
  public formBusiness:FormGroup;
  public dbData: any;
  public FormGroup:FormControl  ;
  public isSubmitted=false;
  public token: any;
  public imagePreview:any=""
  public mostrar=false;
  
constructor(public route:ActivatedRoute,
    public storageSessionService:StorageSessionService,
    public businessService:BusinessService){
 
}
  ngOnInit() {
 
   this.formBusiness= new FormGroup({
         name: new FormControl('',Validators.compose([Validators.required,Validators.minLength(3)])),
         address: new FormControl('',Validators.compose([Validators.required,Validators.minLength(5),])),
         category:new FormControl('',Validators.required),
         email: new FormControl('',Validators.compose([Validators.required,Validators.email,Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)])),
         phone:new FormControl('',Validators.compose([Validators.required])),
         image: new FormControl('')
    });
  }

  /*validation_messages = {
    'name': [
      { type: 'required', message: 'Campo Obligatorio.' },
      { type: 'minLength', message: 'El nombre es demasiado corto.' },	
    ],									
    'address': [
      { type: 'required', message: 'Campo Obligatorio.' },
      { type: 'minLength', message:'Escriba la dirección completa.'},
    ],
    'category':[
      { type:'required', message:'Campo Obligatorio.'},
    ],
    'email':[
      { type: 'required', message:'Campo Obligatorio.'},
      { type: 'email', message:'El formato ingresado no es valido.'},
      { type: 'pattern', message:'Ingrese un email valido.'}
    ],
    'phone':[
      { type: 'required', message:'Campo Obligatorio.'},
      { type: 'pattern', message:'Ingrese un número de teléfono valido.'}
    ]
    }*/
    
    

onSubmit(){
 this.isSubmitted=true;

     if(this.formBusiness.valid){
      
      let idUser = this.storageSessionService.getUSer()._id;
      let business= new Business("",
        this.formBusiness.controls['name'].value,
        this.formBusiness.controls['image'].value,
        this.formBusiness.controls['category'].value,
        this.formBusiness.controls['address'].value,
        this.formBusiness.controls['email'].value,
        this.formBusiness.controls['phone'].value,
        idUser)
      this.businessService.register(business).subscribe({
        next:(data)=>{
        //  console.log(data)
        }
      })
      
    //  console.log('valid')
    }else{
        if(!this.filesToUpload){

        }else{
      //console.log('not valid')
        }
    }
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

  onResetForm(){
    this.formBusiness.reset();
  }

  public filesToUpload: Array<File>


  get name(){return this.formBusiness.get('name');}
  get address(){return this.formBusiness.get ('address');}
  get category(){return this.formBusiness.get('category');}
  get email(){return this.formBusiness.get('email');}
  get phone(){return this.formBusiness.get('phone');}

  imageClick(){
    let content = document.getElementById('selectedFile');
    content.click();
  }

  changeImage(event:any){
    this.formBusiness.patchValue({
      image:event
    })
  }
}