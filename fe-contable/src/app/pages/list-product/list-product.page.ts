import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
  providers:[UserService, HelperService,BusinessService, ProductService,SelectedService]
})
export class ListProductPage implements OnInit {
  public products : Array<Product> =[] 
  private business:any;
  private obsBusiness:any;

  constructor(
    public route:ActivatedRoute,
    public storageSessionService:StorageSessionService,
    public helperService: HelperService  ,
    public productService:ProductService,
    public selectedService:SelectedService, 
  ) { 
    
  }

  ngOnInit() {
    
      this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
      next:(data:any)=>{

        this.business = data
        this.refreshProducts()
      }
    })
  }

    ngOnDestroy(){
      this.obsBusiness.unsubscribe()
    }

    refreshProducts(){
  
      this.productService.getBusinessProduct(this.business._id).subscribe({
        next:(response)=>{
  
        this.products =response.data;
        }
        })      

      }
    
  

}
