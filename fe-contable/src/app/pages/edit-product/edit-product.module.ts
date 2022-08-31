import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProductPageRoutingModule } from './edit-product-routing.module';

import { EditProductPage } from './edit-product.page';
import { ProductsModule } from 'src/app/features/products/products.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductsModule,
    IonicModule,
    EditProductPageRoutingModule
  ],
  declarations: [EditProductPage]
})
export class EditProductPageModule {}
