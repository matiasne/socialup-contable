import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { UserService } from 'src/app/services/user.service';
import { HelperService } from 'src/app/services/helpers.service';
import { ProductService } from 'src/app/features/products/services/product.service';
import { NavigationEnd, Router } from '@angular/router';
import { ListItemsComponent } from 'src/app/shared/components/list-items/list-items.component';
import { ListProductComponentComponent } from 'src/app/features/products/components/list-product-component/list-product-component.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
  providers: [],
})
export class ListProductPage implements OnInit {
  @ViewChild('list') listItems: ListProductComponentComponent;

  constructor(public router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if ((val.url = '/products')) this.listItems.refreshProducts();
      }
    });
  }

  ngOnInit() {}

  handleClickProduct(product) {
    console.log('!!!!');
  }

  handleClickEditProduct(product) {
    this.router.navigate(['/edit-product', { productId: product._id }]);
  }
}
