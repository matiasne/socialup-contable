import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ListProductPageRoutingModule } from './list-product-routing.module';
import { ListProductPage } from './list-product.page';
import { ProductsModule } from 'src/app/features/products/products.module';


@NgModule({
  imports: [
    ProductsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ListProductPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ListProductPage]
})
export class ListProductPageModule {}
