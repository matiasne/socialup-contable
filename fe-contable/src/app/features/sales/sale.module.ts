import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectClientComponent } from './components/select-client/select-client.component';
import { FormSaleComponent } from './components/form-sale/form-sale.component';
import { ClientsModule } from '../clients/clients.module';
import { ItemSaleProductComponent } from './components/item-sale-product/item-sale-product.component';
import { ModalSelectProductComponent } from './components/modal-select-product/modal-select-product.component';
import { ListSaleProductComponent } from './components/list-sale-product/list-sale-product.component';
import { ModalFormProductComponent } from './components/modal-form-product/modal-form-product.component';
import { FormSalePageRoutingModule } from 'src/app/pages/form-sale/form-sale-routing.module';
import { FormSaleProductComponent } from './components/form-sale-product/form-sale-product.component';
import { ProductsModule } from '../products/products.module';

@NgModule({
  declarations: [
    FormSaleComponent,
    SelectClientComponent,
    ItemSaleProductComponent,
    ModalSelectProductComponent,
    ListSaleProductComponent,
    ModalFormProductComponent,
    FormSaleProductComponent,
    

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    ClientsModule,
    ComponentsModule,
    ProductsModule
    
  ],
  exports:[
    FormSaleComponent,
    SelectClientComponent,
    ItemSaleProductComponent,
    ModalSelectProductComponent,
    ListSaleProductComponent,
    ModalFormProductComponent,
    FormSaleProductComponent

  ]
  
})
export class SalesModule { }