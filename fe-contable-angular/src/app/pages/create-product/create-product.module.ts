import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateProductPageRoutingModule } from './create-product-routing.module';

import { CreateProductPage } from './create-product.page';
import { ProductsModule } from 'src/app/features/products/products.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateProductPageRoutingModule,
    ProductsModule,
  ],
  declarations: [CreateProductPage],
})
export class CreateProductPageModule {}
