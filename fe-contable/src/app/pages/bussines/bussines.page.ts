import { Component, Injectable, OnInit,  } from '@angular/core';
import { inject } from '@angular/core/testing';
import { ReactiveFormsModule,FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Bussines } from 'src/app/models/bussines';
import { BussinesService } from 'src/app/services/bussines.service';
import { StorageSessionService } from 'src/app/services/storage-session.service';



@Component({
  selector: 'app-bussines',
  templateUrl: './bussines.page.html',
  styleUrls: ['./bussines.page.scss'],
})
export class BussinesPage implements OnInit {
  public title:'Perfil BUSINESS'
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
    private bussinesService:BussinesService){
 
}
  ngOnInit() {
    

    this.formBussines= new FormGroup({
         name: new FormControl('',Validators.compose([Validators.required,Validators.minLength(3)])),
         address: new FormControl('',Validators.compose([Validators.required,Validators.minLength(5),])),
         category:new FormControl('',Validators.required),
         email: new FormControl('',Validators.compose([Validators.required,Validators.email,Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/)])),
         phone:new FormControl('',Validators.compose([Validators.required])),
    });
  }

  validation_messages = {
    'name': [
      { type: 'required', message: 'Campo Obligatorio.' },
      { type: 'minLength', message: 'El nombre es demasiado corto.' },	
    ],									
    'adresse': [
      { type: 'required', message: 'Campo Obligatorio.' },
      { type: 'minLength', message:'Escriba la dirección completa.'},
    ],
    'heading':[
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
    }
    
    

onSubmit(){
 this.isSubmitted=true;

     if(this.formBussines.valid){
      
      let idUser = this.storageSessionService.getUSer()._id;
      let bussines = new Bussines("",
        this.formBussines.controls['name'].value,
        "", //this.formBussines.controls['image'].value,
        this.formBussines.controls['category'].value,
        this.formBussines.controls['address'].value,
        this.formBussines.controls['email'].value,
        this.formBussines.controls['phone'].value,
        idUser)
      this.bussinesService.register(bussines).subscribe({
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

  onResetForm(){
    this.formBussines.reset();
  }

  public filesToUpload: Array<File>

  /*fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    
  } 

  makeFileRequest(url:string,params:Array<string>,files:Array<File>){
    var token=this.token;

      return new Promise(function(resolve,reject){
        var formBussines:any = new formBussines();
        var xhr = new XMLHttpRequest();

        for(var i = 0;i<files.length;i++){
          formBussines.append('image', files[i],files[i].name)
        }
        xhr.onreadystatechange =function(){
          if(xhr.readyState ==4){
            if(xhr.status == 200){
              resolve(JSON.parse(xhr.response));    
          }else{
             reject(xhr.response);
           }
          }
        }
        xhr.open('POST',url,true);
        xhr.setRequestHeader('Authotization',token);
        xhr.send(formBussines);
      });
  }*/



  get name(){return this.formBussines.get('name');}
  get adresse(){return this.formBussines.get ('adresse');}
  get heading(){return this.formBussines.get('heading');}
  get email(){return this.formBussines.get('email');}
  get phone(){return this.formBussines.get('phone');}
}