import { Component, OnInit, ViewChild } from '@angular/core';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { UserService } from 'src/app/services/user.service';
import { HelperService } from 'src/app/services/helpers.service';
import { ProductService } from 'src/app/features/products/services/product.service';
import { ListProductComponentComponent } from 'src/app/features/products/components/list-product-component/list-product-component.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
  providers:[UserService, HelperService,BusinessService, ProductService]
})
export class ListProductPage implements OnInit {

  @ViewChild('ListProductComponentComponent') listProduct: ListProductComponentComponent;
  
  constructor(
   
  ) { 
   
  }

  ngOnInit() {
    
   
  }

  ionViewDidEnter (){
    console.log(this.listProduct)
    setTimeout(()=>{
      this.listProduct.refreshProducts({perPage:10,pageCount:1,searchWord:""})
    },300)
    
  }

  

  handleClickProduct(product){
    console.log(product)
  }
  
}
