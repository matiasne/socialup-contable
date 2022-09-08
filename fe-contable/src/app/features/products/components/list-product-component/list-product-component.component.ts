import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/features/business/models/business';
import { Product } from 'src/app/features/products/models/product';
import { ToastType } from 'src/app/models/toast.enum';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { HelperService } from 'src/app/services/helpers.service';
import { SessionService } from 'src/app/auth/services/session.service';
import { ToastService } from 'src/app/services/toast.service';
import { ProductService } from '../../services/product.service';
import { ListItemsComponent } from 'src/app/shared/components/list-items/list-items.component';

@Component({
  selector: 'app-list-product-component',
  templateUrl: './list-product-component.component.html',
  styleUrls: ['./list-product-component.component.scss'],
})
export class ListProductComponentComponent implements OnInit {
  @ViewChild('listItem') listItems: ListItemsComponent;
  @Input() showEditButton = false;
  @Output() clickProduct = new EventEmitter<Product>();
  @Output() clickEditProduct = new EventEmitter<Product>();

  public products: Array<Product> = [];
  private business: Business;
  public id: any;
  private obsBusiness: any;
  public totalPages: number;

  constructor(
    public activateRoute: ActivatedRoute,
    public sessionService: SessionService,
    public helperService: HelperService,
    public productService: ProductService,
    public businessService: BusinessService,
    public router: Router,
    public toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.refreshProducts();
  }

  refreshProducts(data: any = { perPage: 10, pageCount: 1, searchWord: '' }) {
    this.businessService
      .getBusinessProduct(data.pageCount, data.perPage, data.searchWord)
      .subscribe({
        next: (response) => {
          this.products = response.data;
          this.listItems.totalPages = response.paging.totalPages;
          this.listItems.buttonController();
        },
      });
  }

  handleClick(data) {
    this.clickProduct.emit(data);
  }

  handleClickEdit(product) {
    this.clickEditProduct.emit(product);
  }
}
