import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';
import { Business } from 'src/app/models/business';
import { Product } from 'src/app/models/product';
import { ToastType } from 'src/app/models/toast.enum';
import { BusinessService } from 'src/app/services/business.service';
import { SelectedService } from 'src/app/services/global/selected.service';
import { HelperService } from 'src/app/services/helpers.service';
import { StorageSessionService } from 'src/app/services/storage-session.service';
import { ToastService } from 'src/app/services/toast.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-list-product-component',
  templateUrl: './list-product-component.component.html',
  styleUrls: ['./list-product-component.component.scss'],
})
export class ListProductComponentComponent implements OnInit {

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
  ) { }

  ngOnInit(): void {
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

  

    ngOnDestroy(){
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
