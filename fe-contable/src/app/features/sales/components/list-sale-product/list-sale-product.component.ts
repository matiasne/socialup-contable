import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';
import { Business } from 'src/app/features/business/models/business';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ProductService } from 'src/app/features/products/services/product.service';
import { ToastType } from 'src/app/models/toast.enum';
import { SelectedService } from 'src/app/services/global/selected.service';
import { HelperService } from 'src/app/services/helpers.service';
import { StorageSessionService } from 'src/app/services/storage-session.service';
import { ToastService } from 'src/app/services/toast.service';
import { Discount } from '../../models/discount';
import { SaleProduct } from '../../models/sale-product';

@Component({
  selector: 'socialup-list-sale-product',
  templateUrl: './list-sale-product.component.html',
  styleUrls: ['./list-sale-product.component.scss'],
  providers:[ HelperService,BusinessService,ProductService ]
})
export class ListSaleProductComponent implements OnInit {
  @Input() items = []
  @ViewChild('listItem') listItems: ListItemsComponent;
  @Output() clickSaleProduct = new EventEmitter<SaleProduct>()


  public saleProducts : Array<SaleProduct> =[] 
  public totalPages:number;
  private business:Business;
  public id:any; 
  private obsBusiness:any;

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
    this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
    next:(data:any)=>{
      this.business = data
      this.refreshSaleProducts({perPage:10,pageCount:1,searchWord:""})
    }
  })

  if(!this.business){
    this.router.navigate(['/list-business'])
    this.toastService.show(ToastType.warning , "Necesita ingresar con una empresa")
  }}
  
  refreshSaleProducts(data:any){

    
    if(this.business._id){
      this.businessService.getBusinessProduct(this.business._id,data.pageCount,data.perPage,data.searchWord).subscribe({
        next:(response)=>{
          
        this.saleProducts = response.data
        this.listItems.totalPages = response.paging.totalPages
        this.listItems.buttonController()
        }
        })      

      }
     
    }

  click(data){
    this.clickSaleProduct.emit(data)
  }

}
