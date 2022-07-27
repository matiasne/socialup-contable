import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListSalePageRoutingModule } from './list-sale-routing.module';
import { SalesModule } from 'src/app/features/sales/sale.module';
import { ListSalePage } from './list-sale.page';

@NgModule({
  imports: [
    SalesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ListSalePageRoutingModule
  ],
  declarations: [ListSalePage]
})
export class ListSalePageModule {}
