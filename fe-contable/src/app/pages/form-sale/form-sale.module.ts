import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormSalePageRoutingModule } from './form-sale-routing.module';

import { FormSalePage } from './form-sale.page';
import { SalesModule } from 'src/app/features/sales/sale.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormSalePageRoutingModule,
    SalesModule,
    SharedModule
    
  ],
  declarations: [FormSalePage]
})
export class FormSalePageModule {}
