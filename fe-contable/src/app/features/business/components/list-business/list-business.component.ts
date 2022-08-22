import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';
import { Client } from 'src/app/features/clients/models/client';
import { Business } from 'src/app/features/business/models/business';
import { User } from 'src/app/models/user';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { SelectedService } from 'src/app/services/global/selected.service';
import { HelperService } from 'src/app/services/helpers.service';
import { StorageSessionService } from 'src/app/services/storage-session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'socialup-list-business',
  templateUrl: './list-business.component.html',
  styleUrls: ['./list-business.component.scss'],
})
export class ListBusinessComponent implements OnInit {

  @ViewChild('listItem') listItems: ListItemsComponent;
  @Output() clickBusiness = new EventEmitter<Business>()
  
  public businesses : Array<Business> =[] 
  private user:User;
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
    let idUser = this.storageSessionService.getUser()._id;
    this.userService.getUserBusiness(idUser).subscribe({
      next:(response)=>{
  
      this.businesses =response.data;
      }
    })      
  }

  ngOnInit() {
    let idUser = this.storageSessionService.getUser()._id;
    this.userService.getUserBusiness(idUser).subscribe({
      next:(response)=>{
      this.businesses =response.data;
      }
    })  
  }

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


  click(data){
   this.clickBusiness.emit(data);
   this.router.navigate(['/products'])
  }
}
