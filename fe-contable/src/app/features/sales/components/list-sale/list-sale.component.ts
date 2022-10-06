import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'src/app/features/business/models/business';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ToastService } from 'src/app/services/toast.service';
import { ListItemsComponent } from 'src/app/shared/components/list-items/list-items.component';
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
  public salesClient: Array<any> = [];
  public totalPages: number;
  private business: Business;
  public id: any;
  public obsBusiness: any;

  constructor(
    public businessService: BusinessService,
    public router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.refreshSales();
  }

  refreshSales(data: any = { perPage: 10, pageCount: 1, searchWord: '' }) {
    this.businessService
      .getBusinessSales(data.pageCount, data.perPage, data.searchWord)
      .subscribe({
        next: (response) => {
          this.sales = response.data;
          this.sales.forEach((element) => {
            if (element.client) {
              this.salesClient.push(element.client.name);
            }
          });
          this.listItems.totalPages = response.paging.totalPages;
          this.listItems.buttonController();
        },
      });
  }

  findclient(data) {
    console.log('Canario');
    this.businessService
      .getBusinessSales(data.pageCount, data.perPage, data.searchWord)
      .subscribe({
        next: (response) => {
          this.sales = response.data;
          let filtersales = this.sales.filter((sales) => sales.client);
          let otrofilto = filtersales.filter((filtersales) =>
            filtersales.client.name.includes(data.searchWord)
          );
          this.sales = otrofilto;
          this.listItems.totalPages = response.paging.totalPages;
          this.listItems.buttonController();
        },
      });
  }

  click(data) {
    this.clickSales.emit(data);
  }
}
