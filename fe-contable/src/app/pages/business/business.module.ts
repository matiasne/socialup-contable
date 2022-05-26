import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessPageRoutingModule } from './business-routing.module';

import { BusinessPage } from './business.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BusinessPageRoutingModule
  ],
  declarations: [BusinessPage]
})
export class BusinessPageModule  {
 
}
