import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm,Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'src/app/models/session';
import { StorageSessionService } from 'src/app/services/storage-session.service';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Bussines } from 'src/app/models/bussines';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from 'src/app/services/global';
import { HelperService } from 'src/app/services/helpers.service';
import { BussinesService } from 'src/app/services/bussines.service';





@Component({
  selector: 'app-bussines',
  templateUrl: './bussines.page.html',
  styleUrls: ['./bussines.page.scss'],
  providers:[BussinesService,HelperService ]
})
export class BussinesPage implements OnInit {
  public title:'Perfil BUSSINES'
  public bussines:any;
  public priority:string;
  public router: any;
  public formBussines:FormGroup;
  public dbData: any;
  public FormGroup:FormControl  ;
  public isSubmitted=false;
  public token: any;
  public imagePreview:any=""
  public mostrar=false;
  
constructor(public route:ActivatedRoute,
    public storageSessionService:StorageSessionService,
    public bussinesService:BussinesService){
 
}
  ngOnInit() {
 
   this.formBussines= new FormGroup({
         name: new FormControl('',Validators.compose([Validators.required,Validators.minLength(3)])),
         address: new FormControl('',Validators.compose([Validators.required,Validators.minLength(5),])),
         category:new FormControl('',Validators.required),
         email: new FormControl('',Validators.compose([Validators.required,Validators.email,Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)])),
         phone:new FormControl('',Validators.compose([Validators.required])),
         image: new FormControl('')
    });
  }

  onDestroy(){
    this.formBussines.reset();
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

     if(this.formBussines.valid){
      
      let bussines = new Bussines("",
        this.formBussines.controls['name'].value,
        this.formBussines.controls['image'].value,
        this.formBussines.controls['category'].value,
        this.formBussines.controls['address'].value,
        this.formBussines.controls['email'].value,
        this.formBussines.controls['phone'].value)
      this.bussinesService.add(bussines).subscribe({
        next:(data)=>{
          console.log(data)
        }
      })
      
      console.log('valid')
    }else{
        if(!this.filesToUpload){

        }else{
      console.log('not valid')
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
    this.formBussines.reset();
  }

  public filesToUpload: Array<File>


  get name(){return this.formBussines.get('name');}
  get address(){return this.formBussines.get ('address');}
  get category(){return this.formBussines.get('category');}
  get email(){return this.formBussines.get('email');}
  get phone(){return this.formBussines.get('phone');}

  imageClick(){
    let content = document.getElementById('selectedFile');
    content.click();
  }

  changeImage(event:any){
    this.formBussines.patchValue({
      image:event
    })
  }
}