import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ListProductComponentComponent } from 'src/app/features/products/components/list-product-component/list-product-component.component';
import { ProductService } from 'src/app/features/products/services/product.service';
import { ListSaleComponent } from 'src/app/features/sales/components/list-sale/list-sale.component';
import { HelperService } from 'src/app/services/helpers.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-sale',
  templateUrl: './list-sale.page.html',
  styleUrls: ['./list-sale.page.scss'],
  providers: [],
})
export class ListSalePage implements OnInit {
  @ViewChild('list') listItems: ListSaleComponent;

  constructor(public router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if ((val.url = '/list-sale')) this.listItems.refreshSales();
      }
    });
  }

  ngOnInit() {}
}
