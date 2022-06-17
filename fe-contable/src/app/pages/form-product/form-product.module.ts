import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormProductPageRoutingModule } from './form-product-routing.module';
import { FormProductPage } from './form-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    IonicModule,
    FormProductPageRoutingModule
  ],
  declarations: [FormProductPage]
})
export class FormProductPageModule {}
