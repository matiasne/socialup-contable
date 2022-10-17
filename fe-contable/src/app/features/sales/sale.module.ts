import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSaleComponent } from './components/form-sale/form-sale.component';
import { ClientsModule } from '../clients/clients.module';
import { ItemSaleProductComponent } from './components/item-sale-product/item-sale-product.component';
import { ListSaleProductComponent } from './components/list-sale-product/list-sale-product.component';
import { ModalFormProductComponent } from './components/modal-form-product/modal-form-product.component';
import { FormSaleProductComponent } from './components/form-sale-product/form-sale-product.component';
import { ProductsModule } from '../products/products.module';
import { FormVariationComponent } from './components/form-variation/form-variation.component';

import { ModalFormVariationComponent } from './components/modal-form-variation/modal-form-variation.component';
import { ItemVariationComponent } from './components/item-variation/item-variation.component';
import { ListVariationComponent } from './components/list-variation/list-variation.component';
import { ModalFormSaleStatusComponent } from './components/modal-form-sale-status/modal-form-sale-status.component';
import { ListSaleComponent } from './components/list-sale/list-sale.component';
import { ItemSaleComponent } from './components/item-sale/item-sale.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalSelectProductComponent } from './components/modal-select-product/modal-select-product.component';
import { SelectClientComponent } from './components/select-client/select-client.component';
import { ModalDetailComponent } from './components/modal-detail/modal-detail.component';

@NgModule({
  declarations: [
    FormSaleComponent,
    ItemSaleProductComponent,
    ListSaleProductComponent,
    ModalFormProductComponent,
    FormSaleProductComponent,
    FormVariationComponent,
    ModalFormVariationComponent,
    ItemVariationComponent,
    ListVariationComponent,
    ModalFormSaleStatusComponent,
    ListSaleComponent,
    ItemSaleComponent,
    ModalSelectProductComponent,
    SelectClientComponent,
    ModalDetailComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    ClientsModule,
    SharedModule,
    ProductsModule,
  ],
  exports: [
    FormSaleComponent,
    ItemSaleProductComponent,
    ListSaleProductComponent,
    ModalFormProductComponent,
    FormSaleProductComponent,
    FormVariationComponent,
    ModalFormVariationComponent,
    ItemVariationComponent,
    ListVariationComponent,
    ModalFormSaleStatusComponent,
    ListSaleComponent,
    ItemSaleComponent,
    ModalDetailComponent,
  ],
})
export class SalesModule {}
