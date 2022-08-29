import { Component, OnInit, ViewChild } from '@angular/core';
import { Session } from 'protractor';
import { Business } from 'src/app/features/business/models/business';
import { User } from 'src/app/models/user';
import { ListItemsComponent } from 'src/app/shared/components/list-items/list-items.component';


@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.page.html',
  styleUrls: ['./business-list.page.scss'],
  providers:[]
})
export class BusinessListPage implements OnInit {

  @ViewChild('listItem') listItems: ListItemsComponent;

  public businesses : Array<Business> =[] 
  public user:User;
  public session:Session
  public totalPages:number;
  constructor(
  ) { 
    
  }

  ngOnInit() {  
    
  }



  // selectBusiness(business){
  //   this.selectService.setSelectedBusiness(business)
  //   this.sessionService.updateBusiness(business);
  //   this.router.navigate(['/products'])
  // }
  
  // selectAddProduct(business){
  //  this.selectService.setSelectedBusiness(business)
  //  this.sessionService.updateBusiness(business);
  //  this.router.navigate(['/product'])
  // }
  handleClickBusiness(business){
  }
    
}


