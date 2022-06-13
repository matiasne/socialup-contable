import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'protractor';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/services/business.service';
import { UserService } from 'src/app/services/user.service';
import {StorageSessionService} from 'src/app/services/storage-session.service'
import { HelperService } from 'src/app/services/helpers.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.page.html',
  styleUrls: ['./business-list.page.scss'],
  providers:[UserService,BusinessService,HelperService]
})
export class BusinessListPage implements OnInit {
  public businesses : Array<Business> =[] 
  public user:User;

  constructor(
    public route:ActivatedRoute,
    public storageSessionService:StorageSessionService,
    public helperService: HelperService,
    public businessService:BusinessService ,
  ) { 
   
  }

  ngOnInit() {  
    let idUser = this.storageSessionService.getUser()._id;
    this.businessService.getUserBusiness(idUser).subscribe({
      next:(response)=>{
  
      this.businesses =response.data;
      }
      })      
        
    }

ionViewWillEnter() { 
      let idUser = this.storageSessionService.getUser()._id;
      this.businessService.getUserBusiness(idUser).subscribe({
        next:(response)=>{
        this.businesses =response.data;
        }
      })  
  }

}


