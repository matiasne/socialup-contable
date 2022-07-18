import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { instanceAvailability } from '@awesome-cordova-plugins/core';
import { ModalController } from '@ionic/angular'; 
import { timeStamp } from 'console';
import { element } from 'protractor';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { Client } from 'src/app/features/clients/models/client';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { ListProductComponentComponent } from 'src/app/features/products/components/list-product-component/list-product-component.component';
import { Product } from 'src/app/features/products/models/product';
import { ProductService } from 'src/app/features/products/services/product.service';
import { HelperService } from 'src/app/services/helpers.service';
import { Sale } from '../../models/sale';
import { SaleProduct } from '../../models/sale-product';
import { CurrentSaleService } from '../../services/current-sale.service';
import { FormSaleProductComponent } from '../form-sale-product/form-sale-product.component';
import { ModalFormDiscountComponent } from '../modal-form-discount/modal-form-discount.component';
import { ModalFormProductComponent } from '../modal-form-product/modal-form-product.component';
import { ModalFormSurchargeComponent } from '../modal-form-surcharge/modal-form-surcharge.component';
import { ModalSelectProductComponent } from '../modal-select-product/modal-select-product.component';
import { SelectClientComponent } from '../select-client/select-client.component';

@Component({
  selector: 'socialup-form-sale',
  templateUrl: './form-sale.component.html',
  styleUrls: ['./form-sale.component.scss'],
  providers:[ HelperService,BusinessService, ClientService,ProductService ]
})
export class FormSaleComponent implements OnInit {

  @Output() handleSubmit = new EventEmitter<any>();


 
  message = 'This modal example uses the modalController to present and dismiss modals.';
  constructor(
    private modalCtrl: ModalController,
    public currentSaleService:CurrentSaleService
    ) {
    
  }

  ngOnInit() {}

  async openModalClient() {
    const modal = await this.modalCtrl.create({
      component: SelectClientComponent,
    });
    modal.present();

    // const { data, role } = await modal.onWillDismiss();
    const { data, role } = await modal.onWillDismiss();

    this.currentSaleService.addClient(data)
    
  }

  async openModalProduct() {
    const modal = await this.modalCtrl.create({
      component: ModalSelectProductComponent,
    });
    modal.present();

    // const { data, role } = await modal.onWillDismiss();
    const { data, role } = await modal.onWillDismiss();

    
   /* this.product=data

    if(this.product._id){


    data._id=this.product._id
    data.name=this.product.name
    data.description=this.product.description
    data.code=this.product.code
    data.costPrice=this.product.costPrice
    data.salePrice=this.product.salePrice
    data.image=this.product.image
    data.idBusiness=this.product.idBusiness
console.log(data)*/
      this.openModalSaleProduct(data)
    

  }
  async openModalSaleProduct(selectProduct:Product) {

    const modal2: HTMLIonModalElement = await this.modalCtrl.create({
      component: FormSaleProductComponent,
      componentProps: {
        selectProduct:selectProduct,
        other: {couldAlsoBeAnObject: true}
     }
    });
    modal2.present();

    // const { data, role } = await modal.onWillDismiss();
    let { data, role } = await modal2.onWillDismiss();


    this.currentSaleService.addSaleProduct(data)
   
  }

  isClient(){
    return this.currentSaleService.currentSale.client != undefined
  }

  clientInSale(){
    return this.currentSaleService.currentSale.client
  }

  listSaleProductAdded(){
    return this.currentSaleService.currentSale.saleProducts
  }

  listSaleVariationAdded(){
    return this.currentSaleService.currentSale.discounts
  }

  totalSaleProducts(){
    return this.currentSaleService.currentSale.total
  }
  saveSale(){
   return this.currentSaleService.add(this.currentSaleService.currentSale)
  }

  async openModalDiscountTotal() {

    const modal2: HTMLIonModalElement = await this.modalCtrl.create({
      component: ModalFormDiscountComponent,
      componentProps: {
        other: {couldAlsoBeAnObject: true}
     }
    });
    modal2.present();

    // const { data, role } = await modal.onWillDismiss();
    let { data, role } = await modal2.onWillDismiss();

    this.currentSaleService.addDiscount(data)
   
  }

  async openModalSurchargeTotal() {

    const modalSurcharge: HTMLIonModalElement = await this.modalCtrl.create({
      component: ModalFormSurchargeComponent,
      componentProps: {
        other: {couldAlsoBeAnObject: true}
     }
    });
    modalSurcharge.present();

    let { data, role } = await modalSurcharge.onWillDismiss();
console.log(data)
    this.currentSaleService.addDiscount(data)
   
  }
  
}
