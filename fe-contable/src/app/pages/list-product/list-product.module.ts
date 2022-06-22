import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ListProductPageRoutingModule } from './list-product-routing.module';
import { ListProductPage } from './list-product.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProductPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [ListProductPage]
})
export class ListProductPageModule {}
