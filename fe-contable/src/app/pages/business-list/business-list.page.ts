import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'protractor';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/services/business.service';
import { UserService } from 'src/app/services/user.service';
import {StorageSessionService} from 'src/app/services/storage-session.service'
import { HelperService } from 'src/app/services/helpers.service';
import { User } from 'src/app/models/user';
import { SelectedService } from 'src/app/services/global/selected.service';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';


@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.page.html',
  styleUrls: ['./business-list.page.scss'],
  providers:[UserService,BusinessService,HelperService]
})
export class BusinessListPage implements OnInit {

  @ViewChild('listItem') listItems: ListItemsComponent;

  public businesses : Array<Business> =[] 
  public user:User;
  public session:Session
  public totalPages:number;
  constructor(
    public activateRoute:ActivatedRoute,
    public router:Router,
    public storageSessionService:StorageSessionService,
    public helperService: HelperService,
    public businessService:BusinessService ,
    public selectService :SelectedService,
    public userService:UserService
  ) { 
    
  }

  ngOnInit() {  
    let idUser = this.storageSessionService.getUser()._id;
    this.userService.getUserBusiness(idUser).subscribe({
      next:(response)=>{
  
      this.businesses =response.data;
      }
    })      
  }

  ionViewWillEnter() { 
      let idUser = this.storageSessionService.getUser()._id;
      this.userService.getUserBusiness(idUser).subscribe({
        next:(response)=>{
        this.businesses =response.data;
        }
      })  
  }

  // selectBusiness(business){
  //   this.selectService.setSelectedBusiness(business)
  //   this.storageSessionService.updateBusiness(business);
  //   this.router.navigate(['/products'])
  // }
  
  // selectAddProduct(business){
  //  this.selectService.setSelectedBusiness(business)
  //  this.storageSessionService.updateBusiness(business);
  //  this.router.navigate(['/product'])
  // }
  refreshBusinesses(data:any){
    if(this.user._id){
      this.userService.getUserBusiness(this.user._id,data.pageCount,data.perPage,data.searchWord).subscribe({
        next:(response)=>{
          
        this.businesses = response.data
        this.listItems.totalPages = response.paging.totalPages
        this.listItems.buttonController()
        }
        })      
      }
    }
 click(){
   console.log("click")
  }
    
}


