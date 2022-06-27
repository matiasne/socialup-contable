import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import { UserService } from 'src/app/services/user.service';
import { HelperService } from 'src/app/services/helpers.service';
import { ProductService } from 'src/app/features/products/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
  providers:[UserService, HelperService,BusinessService, ProductService]
})
export class ListProductPage implements OnInit {
  constructor(
   
  ) { 
   
  }

  ngOnInit() {
    
      
  }
  
}
