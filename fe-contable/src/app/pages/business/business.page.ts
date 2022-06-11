import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm,Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'src/app/models/session';
import { StorageSessionService } from 'src/app/services/storage-session.service';
import { AlertController, NavParams, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Business } from 'src/app/models/business';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from 'src/app/services/global';
import { HelperService } from 'src/app/services/helpers.service';
import { BusinessService } from 'src/app/services/business.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/models/toast.enum';





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
  public isEditing:boolean=false;
  session: Session; 

  public butonLabel = "Crear Nuevo"
  
constructor(public activateRoute:ActivatedRoute,
    public storageSessionService:StorageSessionService,
    public businessService:BusinessService,
    public toastService: ToastService){
  

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

    if(this.activateRoute.snapshot.params.id){
      this.butonLabel = "Guardar";
      this.isEditing = true
      this.businessService.get(this.activateRoute.snapshot.params.id).subscribe({
        next:(data)=>{
          // console.log(this.business)
          this.formBusiness.setValue({
            name: data.business.name,
            address:data.business.address,
            category:data.business.category,
            email:data.business.email,
            phone:data.business.phone,
            image:data.business.image
          })
      
        }
      })
    }else{
      this.butonLabel = "Crear Nuevo";
      this.isEditing =false
    }   
 
  }


  updateProfileBusinesses(){
   
      let business= new Business(
        this.activateRoute.snapshot.params.id, 
        this.formBusiness.controls['name'].value,
        this.formBusiness.controls['image'].value,
        this.formBusiness.controls['category'].value,
        this.formBusiness.controls['address'].value,
        this.formBusiness.controls['email'].value,
        this.formBusiness.controls['phone'].value, 
        this.storageSessionService.getUser()._id
      )

      this.businessService.update(business).subscribe({
        next:(data)=>{
          this.toastService.show(ToastType.success,"Se ha actualizado el negocio correctamente")
        }
      })
    
  }
    

  onSubmit(){    
    this.isSubmitted=true;
    if(this.formBusiness.valid){
      if(this.isEditing){
        this.updateProfileBusinesses();
      }
      else{
        this.createBusiness();
      }
    }else{
      this.toastService.show(ToastType.error,"Por favor complete todos los campos")
    }
  }

  createBusiness(){
    if(this.formBusiness.valid){
      
      let idUser = this.storageSessionService.getUser()._id;
      let business= new Business("",
        this.formBusiness.controls['name'].value,
        this.formBusiness.controls['image'].value,
        this.formBusiness.controls['category'].value,
        this.formBusiness.controls['address'].value,
        this.formBusiness.controls['email'].value,
        this.formBusiness.controls['phone'].value,
        idUser
      )
      this.businessService.register(business).subscribe({
        next:(data)=>{
          this.toastService.show(ToastType.success,"Se ha creado el negocio correctamente")
        }
      })      
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

  changeImage(event:any){
    this.formBusiness.patchValue({
      image:event
    })
  }

}