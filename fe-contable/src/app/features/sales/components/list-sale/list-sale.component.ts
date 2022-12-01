import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { Client } from 'src/app/features/clients/models/client';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ListItemsComponent } from 'src/app/shared/components/list-items/list-items.component';
import { paymentTypes } from '../../models/payment';
import { Sale } from '../../models/sale';
import { CurrentSaleService } from '../../services/current-sale.service';
import { SelectClientComponent } from '../select-client/select-client.component';
import { ModalDetailComponent } from '../modal-detail/modal-detail.component';
import { Box } from 'src/app/features/boxes/models/box';

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
  public boxFilter:string
  public boxes: Array<Box> = [];
  public filter:Object
  private cd :ChangeDetectorRef
  constructor(
    public businessService: BusinessService,
    public router: Router,
    public toastService: ToastService,
    public modalCtrl: ModalController,
    public currentSaleService: CurrentSaleService
  ) {

  }

  ngOnInit() {

    delete this.paymentTypes.empty;
    this.businessService.getBusinessBox().subscribe({
      next: (boxes: any) => {
        this.boxes = boxes.data;
      },
    });



  const f =this.currentSaleService.getSelectedFilter()

  this.dateFrom=  f.dateFrom
  this.dateTo= f.dateTo
  this.clientfilter = f.clientfilter
  this.paymentTypeFilter = f.paymentTypeFilter
  this.boxFilter=f.boxFilter
  this.refreshSales()


  }



  refreshSales(data: any = { perPage: 10, pageCount: 1, searchWord: '' }) {
    this.businessService
      .getBusinessSales(data.pageCount, data.perPage, this.clientfilterselected,  this.dateFrom,
        this.dateTo, this.paymentTypeFilter, this.boxFilter)
        .subscribe({
        next: (response) => {
          console.log(response.data)
          this.sales = response.data;
          this.listItems.totalPages = response.paging.totalPages;
          this.listItems.buttonController();
        },
      });
  }

  showdate() {}

  click() {
    this.filter = {
      dateFrom:this.dateFrom,
      dateTo:this.dateTo,
      clientfilter:this.clientfilter,
      paymentTypeFilter:this.paymentTypeFilter,
      boxFilter:this.boxFilter
    }
    this.currentSaleService.setSelectedFilter(this.filter)
    this.businessService
      .getBusinessSales(
        this.pageCount,
        this.perPage,
        this.clientfilterselected,
        this.dateFrom,
        this.dateTo,
        this.paymentTypeFilter,
        this.boxFilter
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
    if(data){
    this.clientfilterselected = data._id;
    }
  }
  handleChange(event) {

    // this.paymentTypeFilter = event.target.value;
  }
  async openModalSale(data) {
    const modal = await this.modalCtrl.create({
      id: '1',
      component: ModalDetailComponent,
      componentProps: {
        sale: data,
        other: { couldAlsoBeAnObject: true },
      },
    });
    modal.present();

    const { role } = await modal.onWillDismiss();
  }
  handleChangeBox(event) {
//this.boxFilter = event.target.value
  }
}
