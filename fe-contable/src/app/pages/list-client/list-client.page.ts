import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'protractor';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/services/business.service';
import { UserService } from 'src/app/services/user.service';
import {StorageSessionService} from 'src/app/services/storage-session.service'
import { GLOBAL } from 'src/app/services/global';
import { HelperService } from 'src/app/services/helpers.service';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { SelectedService } from 'src/app/services/global/selected.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/models/toast.enum';


@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.page.html',
  styleUrls: ['./list-client.page.scss'],
  providers:[UserService, HelperService,BusinessService, ClientService]
})
export class ListClientPage implements OnInit {
  public clients : Array<Client> =[] 
  private business:Business;
  private obsBusiness:any;
public id:any;
  constructor(
    public activateRoute:ActivatedRoute,
    public storageSessionService:StorageSessionService,
    public helperService: HelperService  ,
    public clientService:ClientService,
    public selectedService:SelectedService, 
    public businessService:BusinessService,
    public router:Router,
    public toastService: ToastService,
    
  ) { 
    
  }

  ngOnInit() {
      
  }
  ionViewDidEnter(){

    this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
      next:(data:any)=>{
        this.business = data
        this.refreshClients()
      }
    })
  
    if(!this.business){
      this.router.navigate(['/list-business'])
      this.toastService.show(ToastType.warning , "Necesita ingresar con una empresa")
    }
  }

    ionViewDidLeave(){
      this.obsBusiness.unsubscribe()
    }

    refreshClients(){
      if(this.business._id){
        this.clientService.get(this.business._id).subscribe({
          next:(response)=>{
            this.clients =response.data
          }
          })      
  
        }
      }
     
    
  

}
