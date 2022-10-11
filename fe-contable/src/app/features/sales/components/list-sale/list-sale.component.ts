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
  onTimeChange(arg0: string) {
    throw new Error('Method not implemented.');
  }
  @Input() items = [];
  @ViewChild('listItem') listItems: ListItemsComponent;
  @Output() clickSales = new EventEmitter<Sale>();

  public sales: Array<Sale> = [];
  public salesClient: Array<any> = [];
  public totalPages: number;
  private business: Business;
  public id: any;
  public obsBusiness: any;
  public searchWord: string = '';
  public dateFrom: any;
  public dateTo: any;
  selectedTime: any;

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
          this.listItems.buttonController();
        },
      });
  }

  showdate() {
    console.log(this.dateFrom);
    console.log(this.dateTo);
  }

  click(data) {
    console.log(this.searchWord);
  }
}
