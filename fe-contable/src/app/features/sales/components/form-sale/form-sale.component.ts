import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { instanceAvailability } from '@awesome-cordova-plugins/core';
import { ModalController, Platform } from '@ionic/angular';
import { timeStamp } from 'console';
import { element } from 'protractor';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ListClientComponent } from 'src/app/features/clients/components/list-client/list-client.component';
import { Client } from 'src/app/features/clients/models/client';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { ListProductComponentComponent } from 'src/app/features/products/components/list-product-component/list-product-component.component';
import { Product } from 'src/app/features/products/models/product';
import { ProductService } from 'src/app/features/products/services/product.service';
import { HelperService } from 'src/app/services/helpers.service';
import { InputAutocompleteComponent } from 'src/app/shared/components/input-autocomplete/input-autocomplete.component';
import { Sale } from '../../models/sale';
import { SaleProduct } from '../../models/sale-product';
import { CurrentSaleService } from '../../services/current-sale.service';
import { FormSaleProductComponent } from '../form-sale-product/form-sale-product.component';

import { ModalFormProductComponent } from '../modal-form-product/modal-form-product.component';
import { ModalFormSaleStatusComponent } from '../modal-form-sale-status/modal-form-sale-status.component';
import { ModalFormVariationComponent } from '../modal-form-variation/modal-form-variation.component';
import { ModalSelectProductComponent } from '../modal-select-product/modal-select-product.component';
import { SelectClientComponent } from '../select-client/select-client.component';

@Component({
  selector: 'socialup-form-sale',
  templateUrl: './form-sale.component.html',
  styleUrls: ['./form-sale.component.scss'],
  providers: [InputAutocompleteComponent],
})
export class FormSaleComponent implements OnInit {
  @Output() handleSubmit = new EventEmitter<any>();
  public buttonLabel = '';
  public isDesktop = true;
  public formSaleClient: FormGroup = new FormGroup({
    saleClient: new FormControl('', Validators.required),
  });
  public sale: Sale;
  public client: Client;
  public items: any[] = [];

  message =
    'This modal example uses the modalController to present and dismiss modals.';
  constructor(
    private modalCtrl: ModalController,
    public currentSaleService: CurrentSaleService,
    public plt: Platform,
    public clientService: ClientService
  ) {
    this.client = new Client('', '', '', '', '', '', '', '', '', '', '', '');
    console.log(this.isDesktop);
    this.isDesktop = this.plt.is('desktop');
    console.log(this.isDesktop);
  }

  ngOnInit() {
    console.log(this.formSaleClient);
    console.log(this.isDesktop);
  }

  async openModalClient() {
    const modalSelectClient = await this.modalCtrl.create({
      id: 'select',
      component: SelectClientComponent,
    });
    modalSelectClient.present();

    // const { data, role } = await modal.onWillDismiss();
    const { data, role } = await modalSelectClient.onWillDismiss();

    this.currentSaleService.addClient(data);
  }

  async handleChange(event) {
    console.log(this.formSaleClient.value.saleClient);
    console.log(event);
    if (this.formSaleClient.value.saleClient) {
      let data = await this.clientService
        .get(this.formSaleClient.value.saleClient)
        .toPromise();
      console.log(data);
      this.currentSaleService.addClient(data.client);
    }
  }

  async openModalProduct() {
    const modal = await this.modalCtrl.create({
      component: ModalSelectProductComponent,
    });
    modal.present();

    // const { data, role } = await modal.onWillDismiss();
    const { data, role } = await modal.onWillDismiss();

    if (data) this.openModalSaleProduct(data);
  }
  async openModalSaleProduct(selectProduct: Product) {
    const modal2: HTMLIonModalElement = await this.modalCtrl.create({
      component: FormSaleProductComponent,
      componentProps: {
        selectProduct: selectProduct,
        other: { couldAlsoBeAnObject: true },
      },
    });
    modal2.present();

    // const { data, role } = await modal.onWillDismiss();
    let { data, role } = await modal2.onWillDismiss();

    if (data) this.currentSaleService.addSaleProduct(data);
  }

  isClient() {
    return this.currentSaleService.currentSale.client != undefined;
  }

  clientInSale() {
    console.log(this.currentSaleService.currentSale.client);
    return this.currentSaleService.currentSale.client;
  }

  listSaleProductAdded() {
    return this.currentSaleService.currentSale.saleProducts;
  }

  listSaleVariationAdded() {
    return this.currentSaleService.currentSale.variations;
  }

  totalSaleProducts() {
    return this.currentSaleService.currentSale.total;
  }
  async openModalSaveSale() {
    console.log(this.currentSaleService.currentSale);
    const modalStatus: HTMLIonModalElement = await this.modalCtrl.create({
      component: ModalFormSaleStatusComponent,
      componentProps: {
        other: { couldAlsoBeAnObject: true },
      },
    });
    modalStatus.present();

    let { data, role } = await modalStatus.onWillDismiss();
    if (data) {
      return this.currentSaleService.add(this.currentSaleService.currentSale);
    }
  }

  async openModalVariationTotal(type) {
    const modalSurcharge: HTMLIonModalElement = await this.modalCtrl.create({
      component: ModalFormVariationComponent,
      componentProps: {
        type: type,
        other: { couldAlsoBeAnObject: true },
      },
    });
    modalSurcharge.present();

    let { data, role } = await modalSurcharge.onWillDismiss();
    if (data) this.currentSaleService.addVariation(data);
  }
  removeClient(client: Client) {
    this.currentSaleService.removeClient();
  }
}
