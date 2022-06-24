import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectedService } from 'src/app/services/global/selected.service';
import { AfipService } from '../../services/afip.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public formData:FormGroup;
  public isSubmited=false;
  private obsBusiness:any;
  
  constructor(
    private afipService: AfipService,
    private selectedService: SelectedService,
  ) { 
    this.formData = new FormGroup({
      businessId: new FormControl('',Validators.required),
      email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
      password: new FormControl('',([Validators.required])),
      puntoVenta: new FormControl('',([Validators.required])),
      fileKey: new FormControl('',([Validators.required])),
      filePem: new FormControl('',([Validators.required])),
    });
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
      next: (data:any)=>{
        this.formData.patchValue({
          businessId: data.id,
        })
      }
    })
  }

  ionViewWillLeave(){
    this.obsBusiness.unsubscribe();
  }

  onSubmit(){
    this.isSubmited=true;  
    if(this.formData.valid){
      this.afipService.register(this.formData.value).subscribe({
        next: (data:any)=>{
          console.log(data)
        }
      })
    }
  }

}
