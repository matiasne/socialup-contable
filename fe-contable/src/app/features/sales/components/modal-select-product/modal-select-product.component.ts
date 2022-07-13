import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { Product } from 'src/app/features/products/models/product';
import { ProductService } from 'src/app/features/products/services/product.service';
import { SelectedService } from 'src/app/services/global/selected.service';
import { HelperService } from 'src/app/services/helpers.service';
import { StorageSessionService } from 'src/app/services/storage-session.service';
import { Sale } from '../../models/sale';
import { SaleProduct } from '../../models/sale-product';
import { ModalFormDiscountComponent } from '../modal-form-discount/modal-form-discount.component';
import { ModalFormSurchargeComponent } from '../modal-form-surcharge/modal-form-surcharge.component';


@Component({
  selector: 'socialup-modal-select-product',
  templateUrl: './modal-select-product.component.html',
  styleUrls: ['./modal-select-product.component.scss'],
  providers:[ HelperService,BusinessService, ClientService,ProductService]
})
export class ModalSelectProductComponent implements OnInit {
  public name: string;
  public products : Array<Product> =[] 
  public product:Product
  public saleProduct:SaleProduct
  public sale:Sale
constructor(private modalCtrl: ModalController,
  public activateRoute:ActivatedRoute,
  public storageSessionService:StorageSessionService,
  public helperService: HelperService  ,
  public clientService:ClientService,
  public selectedService:SelectedService, 
  public businessService:BusinessService,
  public router:Router,) { }

  ngOnInit() {}


  handleClickProduct(product){
    this.modalCtrl.dismiss(product)
    
    
    }
    async openModalDiscountTotal(sale:Sale) {

      const modal2: HTMLIonModalElement = await this.modalCtrl.create({
        component: ModalFormDiscountComponent,
        componentProps: {
          sale:sale,
          other: {couldAlsoBeAnObject: true}
       }
      });
      modal2.present();
  
      // const { data, role } = await modal.onWillDismiss();
      let { data, role } = await modal2.onWillDismiss();
  
  
      // this.currentSaleService.addSaleProduct(data)
     
    }
  
    async openModalSurchargeTotal(sale:Sale) {

      const modalSurcharge: HTMLIonModalElement = await this.modalCtrl.create({
        component: ModalFormSurchargeComponent,
        componentProps: {
          sale:sale,
          other: {couldAlsoBeAnObject: true}
       }
      });
      modalSurcharge.present();
  
      let { data, role } = await modalSurcharge.onWillDismiss();
  console.log('fin')
  
      // this.currentSaleService.addSaleProduct(data)
     
    }
  
}
