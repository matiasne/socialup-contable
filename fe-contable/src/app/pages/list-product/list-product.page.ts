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
  public perPage:number;
  public pageCount:number;
  public id:any;
  public searchWord:string;
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
  }

    ionViewDidLeave(){
      this.obsBusiness.unsubscribe()
    }

    refreshProducts(){
      if(this.business._id){
        this.businessService.getBusinessProduct(this.business._id,1,10,this.searchWord).subscribe({
          next:(response)=>{

            
            this.products =response.data
            console.log(this.products)
          }
          })      
  
        }
      }
     
      // slidePrev(){
      //   this.ionSlides.slidePrev();
      // }

      // slideNext(){
      //   this.ionSlides.slideNext();
      // }
  
      searchEventFired(){
//setear paginas a inicio, array vaciar 
this.spinnerDialog.show();


     this.refreshProducts()
     this.spinnerDialog.hide();
      }
}
