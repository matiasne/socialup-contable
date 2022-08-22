import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';
import { Business } from 'src/app/features/business/models/business';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ProductService } from 'src/app/features/products/services/product.service';
import { ToastType } from 'src/app/models/toast.enum';
import { SelectedService } from 'src/app/services/global/selected.service';
import { HelperService } from 'src/app/services/helpers.service';
import { StorageSessionService } from 'src/app/services/storage-session.service';
import { ToastService } from 'src/app/services/toast.service';
import { Sale } from '../../models/sale';

@Component({
  selector: 'socialup-list-sale-component',
  templateUrl: './list-sale.component.html',
  styleUrls: ['./list-sale.component.scss'],
})
export class ListSaleComponent implements OnInit {
  @Input() items = [];
  @ViewChild('listItem') listItems: ListItemsComponent;
  @Output() clickSales = new EventEmitter<Sale>();

  public sales: Array<Sale> = [];
  public totalPages: number;
  private business: Business;
  public id: any;
  public obsBusiness: any;
  
 

  constructor(
    public activateRoute: ActivatedRoute,
    public storageSessionService: StorageSessionService,
    public helperService: HelperService,
    public productService: ProductService,
    public selectedService: SelectedService,
    public businessService: BusinessService,
    public router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
      next: (data: any) => {
        this.business = data;
        this.refreshSales({ perPage: 10, pageCount: 1, searchWord: '' });
      },
    });

    if (!this.business) {
      this.router.navigate(['/list-business']);
      this.toastService.show(
        ToastType.warning,
        'Necesita ingresar con una empresa'
      );
    }
  }

  refreshSales(data: any) {
    if (this.business._id) {
      console.log(this.business._id);
      this.businessService
        .getBusinessSales(
          this.business._id,
          data.pageCount,
          data.perPage,
          data.searchWord
        )
        .subscribe({
          next: (response) => {
            this.sales = response.data;
            this.listItems.totalPages = response.paging.totalPages;
            this.listItems.buttonController();
          },
        });
    }
  }

  click(sale){
    console.log(sale)
    this.clickSales.emit(sale);
  }
  handleClickSales(sale) {
    this.router.navigate(['/form-sale', { sale: JSON.stringify(sale) }]);
  }
}
