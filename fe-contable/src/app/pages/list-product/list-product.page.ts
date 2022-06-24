import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'protractor';
import { Business } from 'src/app/models/business';
import { BusinessService } from 'src/app/services/business.service';
import { UserService } from 'src/app/services/user.service';
import {StorageSessionService} from 'src/app/services/storage-session.service'
import { GLOBAL } from 'src/app/services/global';
import { HelperService } from 'src/app/services/helpers.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { SelectedService } from 'src/app/services/global/selected.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/models/toast.enum';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
  providers:[UserService, HelperService,BusinessService, ProductService]
})
export class ListProductPage implements OnInit {

  @ViewChild('listItem') listItems: ListItemsComponent;

  public products : Array<Product> =[] 
  private business:Business;
  public id:any;  
  private obsBusiness:any;
  public totalPages:number;

  constructor(
    public activateRoute:ActivatedRoute,
    public storageSessionService:StorageSessionService,
    public helperService: HelperService  ,
    public productService:ProductService,
    public selectedService:SelectedService, 
    public businessService:BusinessService,
    public router:Router,
    public toastService: ToastService
  ) { 
   
  }

  ngOnInit() {
    
      
  }
  ionViewDidEnter(){

    this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
      next:(data:any)=>{
        this.business = data
        this.refreshProducts({perPage:10,pageCount:1,searchWord:""})
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

    refreshProducts(data:any){

    
      if(this.business._id){
        this.businessService.getBusinessProduct(this.business._id,data.pageCount,data.perPage,data.searchWord).subscribe({
          next:(response)=>{
            
          this.products = response.data
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
