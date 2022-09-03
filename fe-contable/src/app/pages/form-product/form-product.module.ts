import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormProductPageRoutingModule } from './form-product-routing.module';
import { FormProductPage } from './form-product.page';
import { ProductsModule } from 'src/app/features/products/products.module';

@NgModule({
  imports: [
    CommonModule,
    ProductsModule,
    IonicModule,
    FormProductPageRoutingModule,
  ],
  declarations: [FormProductPage],
})
export class FormProductPageModule {}
