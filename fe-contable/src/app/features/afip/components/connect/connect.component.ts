import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageSessionService } from 'src/app/services/storage-session.service';
import { AfipStorageService } from '../../services/afip-storage.service';
import { AfipService } from '../../services/afip.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnInit {

  public formData:FormGroup;
  public isSubmited=false;

  constructor(
    private afipService: AfipService,
    private storageAfipService: AfipStorageService,
  ) {

    this.formData= new FormGroup({
      email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
      password: new FormControl('',([Validators.required])),
    });

  }

  ngOnInit() {}

  public onSubmit(){   
      
    this.isSubmited=true;  
    
    if(this.formData.valid){
      let email = this.formData.controls['email'].value
      let password = this.formData.controls['password'].value;
      
      this.afipService.connect(email,password).subscribe(
        {
          next: (data:any)=>{
            console.log(data)
            this.storageAfipService.setAfipToken(data.token)
          },
          error:(err)=>{
            console.log(err)
            if(err.status == 400){
              alert(err.error.message)
            }
          },
          complete:()=>{
            // console.log("Completo")
          }
        })
      // console.log('valid')
    }else{
      // console.log('not  valid')
    } 
  }

}
