import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormSalePageRoutingModule } from './form-sale-routing.module';

import { FormSalePage } from './form-sale.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { SalesModule } from 'src/app/features/sales/sale.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormSalePageRoutingModule,
    SalesModule,
    ComponentsModule
    
  ],
  declarations: [FormSalePage]
})
export class FormSalePageModule {}
