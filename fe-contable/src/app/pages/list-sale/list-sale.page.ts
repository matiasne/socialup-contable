import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ProductService } from 'src/app/features/products/services/product.service';
import { HelperService } from 'src/app/services/helpers.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-sale',
  templateUrl: './list-sale.page.html',
  styleUrls: ['./list-sale.page.scss'],
  providers:[UserService, HelperService,BusinessService, ProductService]
})
export class ListSalePage implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

}
