import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessPageRoutingModule } from './business-routing.module';

import { BusinessPage } from './business.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    BusinessPageRoutingModule
  ],
  declarations: [BusinessPage]
})
export class BusinessPageModule  {
 
}
