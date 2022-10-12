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
import { ToastService } from 'src/app/services/toast.service';
import { ListItemsComponent } from 'src/app/shared/components/list-items/list-items.component';
import { Sale } from '../../models/sale';
import { ModalDetailComponent } from '../modal-detail/modal-detail.component';

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
    private modalCtrl: ModalController,
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
          this.listItems.totalPages = response.paging.totalPages;
          this.listItems.buttonController();
        },
      });
  }

  click(data) {
    this.openModalSale(data);
  }
  async openModalSale(data) {
    console.log(data);
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

    if (data) {
    }
  }
}
