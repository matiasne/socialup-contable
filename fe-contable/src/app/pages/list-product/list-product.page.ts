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
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/models/toast.enum';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog/ngx';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
  providers:[UserService, HelperService,BusinessService, ProductService,SpinnerDialog]
})
export class ListProductPage implements OnInit {
  public products : Array<Product> =[] 
  private business:Business;
  private obsBusiness:any;
  public perPage:number=10;
  public id:any;
  public searchWord:string;
  public pageCount:number;
  public totalPages:number=1;
  public isLoading :boolean=false;
  public isDisabledNext:boolean=true;
  public isDisabledBack:boolean=true;
  constructor(
    public activateRoute:ActivatedRoute,
    public storageSessionService:StorageSessionService,
    public helperService: HelperService  ,
    public productService:ProductService,
    public selectedService:SelectedService, 
    public businessService:BusinessService,
    public router:Router,
    public toastService: ToastService,
    private spinnerDialog: SpinnerDialog
  ) { 
   
  }

  ngOnInit() {
    
      
  }
  ionViewDidEnter(){

    this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
      next:(data:any)=>{
        this.business = data
        this.refreshProducts()
      }
    })
  
    if(!this.business){
      this.router.navigate(['/list-business'])
      this.toastService.show(ToastType.warning , "Necesita ingresar con una empresa")
    }
    this.pageCount=1
    this.searchWord=""
    
  }

    ionViewDidLeave(){
      this.obsBusiness.unsubscribe()
    }

    refreshProducts(){
      this.isLoading=true;
    
      if(this.business._id){
        this.businessService.getBusinessProduct(this.business._id,this.pageCount,this.perPage,this.searchWord).subscribe({
          next:(response)=>{

            
          this.products =response.data
          this.totalPages= response.paging.totalPages
          this.isLoading=false;
          
          },
          complete:()=>{
            this.buttonController();
          }
          })      
  
        }
       
      }

      searchEventFired(){
    this.pageCount=1 
    this.spinnerDialog.show();

    this.refreshProducts()

    this.spinnerDialog.hide();
      }

  nextPagination(){
   
    if(this.pageCount <this.totalPages){
      this.pageCount ++ 
      
      this.refreshProducts()
    }

}
  backPagination(){
    if(this.pageCount != 1){
      this.pageCount --
      this.refreshProducts()
       
  }

}
  buttonController(){
    if(this.pageCount>=2){
      this.isDisabledBack=false
    }else{
      this.isDisabledBack=true
    }
    if(this.pageCount !=this.totalPages){
      this.isDisabledNext=false
    }else{
      this.isDisabledNext=true
      
    }
    if(this.totalPages<=1){
      
      this.isDisabledNext=true
    }
   
  }
  
}
