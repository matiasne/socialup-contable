import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BussinesPageRoutingModule } from './bussines-routing.module';

import { BussinesPage } from './bussines.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BussinesPageRoutingModule
  ],
  declarations: [BussinesPage]
})
export class BussinesPageModule  {
 
}
