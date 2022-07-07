import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular'; 
import { BusinessService } from 'src/app/features/business/service/business.service';
import { Client } from 'src/app/features/clients/models/client';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { ListProductComponentComponent } from 'src/app/features/products/components/list-product-component/list-product-component.component';
import { Product } from 'src/app/features/products/models/product';
import { ProductService } from 'src/app/features/products/services/product.service';
import { HelperService } from 'src/app/services/helpers.service';
import { SaleProduct } from '../../models/sale-product';
import { FormSaleProductComponent } from '../form-sale-product/form-sale-product.component';
import { ModalFormProductComponent } from '../modal-form-product/modal-form-product.component';
import { ModalSelectProductComponent } from '../modal-select-product/modal-select-product.component';
import { SelectClientComponent } from '../select-client/select-client.component';

@Component({
  selector: 'socialup-form-sale',
  templateUrl: './form-sale.component.html',
  styleUrls: ['./form-sale.component.scss'],
  providers:[ HelperService,BusinessService, ClientService,ProductService ]
})
export class FormSaleComponent implements OnInit {
  @Input() client:Client;
  @Input() product:Product
  @Output() handleSubmit = new EventEmitter<any>();
  public saleProducts:Array<SaleProduct> = []

 
  message = 'This modal example uses the modalController to present and dismiss modals.';
  constructor(
    private modalCtrl: ModalController
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

    this.client=data
    
  }

  async openModalProduct() {
    const modal = await this.modalCtrl.create({
      component: ModalSelectProductComponent,
    });
    modal.present();

    // const { data, role } = await modal.onWillDismiss();
    const { data, role } = await modal.onWillDismiss();

    this.product=data

    if(this.product._id){


    data._id=this.product._id
    data.name=this.product.name
    data.description=this.product.description
    data.code=this.product.code
    data.costPrice=this.product.costPrice
    data.salePrice=this.product.salePrice
    data.image=this.product.image
    data.idBusiness=this.product.idBusiness
console.log(data)
      this.openModalSaleProduct(data)
    }

  }
  async openModalSaleProduct(selectSaleProduct:SaleProduct) {

    const modal2: HTMLIonModalElement = await this.modalCtrl.create({
      component: FormSaleProductComponent,
      componentProps: {
        selectSaleProduct:selectSaleProduct,
        other: {couldAlsoBeAnObject: true}
     }
    });
    modal2.present();

    // const { data, role } = await modal.onWillDismiss();
    let { data, role } = await modal2.onWillDismiss();

    
   // this.saleProducts.push(data)
    // console.log(data)
    
    if(!this.saleProducts.includes(data)){
      this.saleProducts.push(data)
    }
      

    
    
     


    // console.log(this.saleProducts)

   

    

  }

  totalSalePrice(){
      
  }

  handleEditSaleProduct(selectSaleProduct){
console.log(selectSaleProduct)
    this.openModalSaleProduct(selectSaleProduct)
    
  }
}
