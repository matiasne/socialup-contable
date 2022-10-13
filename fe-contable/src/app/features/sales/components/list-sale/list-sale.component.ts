import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Business } from 'src/app/features/business/models/business';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { Client } from 'src/app/features/clients/models/client';
import { ToastService } from 'src/app/services/toast.service';
import { ListItemsComponent } from 'src/app/shared/components/list-items/list-items.component';
import { Payment, paymentTypes } from '../../models/payment';
import { Sale } from '../../models/sale';
import { CurrentSaleService } from '../../services/current-sale.service';
import { SelectClientComponent } from '../select-client/select-client.component';

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
  public searchWord: any;
  public dateFrom: any;
  public dateTo: any;
  selectedTime: any;
  public perPage: number = 10;
  public pageCount: number = 1;
  public clientfilter: Client;
  public clientfilterselected: string;
  public paymentTypes = paymentTypes;
  public paymentTypeFilter: string;

  constructor(
    public businessService: BusinessService,
    public router: Router,
    public toastService: ToastService,
    public modalCtrl: ModalController,
    public currentSaleService: CurrentSaleService
  ) {}

  ngOnInit() {
    this.refreshSales();
    delete this.paymentTypes.empty;
  }

  refreshSales(data: any = { perPage: 10, pageCount: 1, searchWord: '' }) {
    this.businessService
      .getBusinessSales(data.pageCount, data.perPage, data.searchWord, '', '')
      .subscribe({
        next: (response) => {
          this.sales = response.data;
          this.listItems.buttonController();
        },
      });
  }

  showdate() {}

  click() {
    this.businessService
      .getBusinessSales(
        this.perPage,
        this.pageCount,
        this.clientfilterselected,
        this.dateFrom,
        this.dateTo,
        this.paymentTypeFilter
      )
      .subscribe({
        next: (response) => {
          this.sales = response.data;
          this.listItems.buttonController();
        },
      });
  }

  async openModalClient() {
    const modalSelectClient = await this.modalCtrl.create({
      id: 'select',
      component: SelectClientComponent,
    });
    modalSelectClient.present();
    const { data, role } = await modalSelectClient.onWillDismiss();
    this.clientfilter = data;
    this.clientfilterselected = data._id;
  }
  handleChange(event) {
    this.paymentTypeFilter = event.target.value;
  }
}
