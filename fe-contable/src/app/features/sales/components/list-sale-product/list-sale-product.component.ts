import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/features/business/models/business';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ProductService } from 'src/app/features/products/services/product.service';
import { HelperService } from 'src/app/shared/services/helpers.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ListItemsComponent } from 'src/app/shared/components/list-items/list-items.component';
import { SaleProduct } from '../../models/sale-product';

@Component({
  selector: 'socialup-list-sale-product',
  templateUrl: './list-sale-product.component.html',
  styleUrls: ['./list-sale-product.component.scss'],
})
export class ListSaleProductComponent implements OnInit {
  @Input() items = [];
  @ViewChild('listItem') listItems: ListItemsComponent;
  @Output() clickSaleProduct = new EventEmitter<SaleProduct>();

  public saleProducts: Array<SaleProduct> = [];
  public totalPages: number;
  private business: Business;
  public id: any;
  private obsBusiness: any;

  constructor(
    public productService: ProductService,
    public businessService: BusinessService,
    public router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.refreshSaleProducts({ perPage: 10, pageCount: 1, searchWord: '' });
  }

  refreshSaleProducts(data: any) {
    this.businessService
      .getBusinessProduct(data.pageCount, data.perPage, data.searchWord)
      .subscribe({
        next: (response) => {
          this.saleProducts = response.data;
          this.listItems.totalPages = response.paging.totalPages;
          this.listItems.buttonController();
        },
      });
  }

  click(data) {
    this.clickSaleProduct.emit(data);
  }
}
