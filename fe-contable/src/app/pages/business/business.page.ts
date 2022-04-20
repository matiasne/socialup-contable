import { Component, Injectable, OnInit,  } from '@angular/core';
import { inject } from '@angular/core/testing';
import { ReactiveFormsModule,FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';



@Component({
  selector: 'app-business',
  templateUrl: './business.page.html',
  styleUrls: ['./business.page.scss'],
})
export class BusinessPage implements OnInit {
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
  
constructor(public route:ActivatedRoute){
 
}
  ngOnInit() {
    

    this.formBusiness= new FormGroup({
         name: new FormControl('',Validators.compose([Validators.required,Validators.minLength(3)])),
         adresse: new FormControl('',Validators.compose([Validators.required,Validators.minLength(5),])),
         heading:new FormControl('',Validators.required),
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

     if(this.formBusiness.valid){
       
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
    this.formBusiness.reset();
  }

  public filesToUpload: Array<File>

  /*fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    
  } 

  makeFileRequest(url:string,params:Array<string>,files:Array<File>){
    var token=this.token;

      return new Promise(function(resolve,reject){
        var formBusiness:any = new formBusiness();
        var xhr = new XMLHttpRequest();

        for(var i = 0;i<files.length;i++){
          formBusiness.append('image', files[i],files[i].name)
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
        xhr.send(formBusiness);
      });
  }*/



  get name(){return this.formBusiness.get('name');}
  get adresse(){return this.formBusiness.get ('adresse');}
  get heading(){return this.formBusiness.get('heading');}
  get email(){return this.formBusiness.get('email');}
  get phone(){return this.formBusiness.get('phone');}
}