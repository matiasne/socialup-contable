import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BussinesPageRoutingModule } from './bussines-routing.module';

import { BussinesPage } from './bussines.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    BussinesPageRoutingModule
  ],
  declarations: [BussinesPage]
})
export class BussinesPageModule  {
 
}
