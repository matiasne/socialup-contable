import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'protractor';
import { Business } from 'src/app/features/business/models/business';
import { BusinessService } from 'src/app/features/business/service/business.service';
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
  handleClickBusiness(business){
    console.log(business)
  }
    
}


