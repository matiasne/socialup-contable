import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListBoxPageRoutingModule } from './list-box-routing.module';

import { ListBoxPage } from './list-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListBoxPageRoutingModule
  ],
  declarations: [ListBoxPage]
})
export class ListBoxPageModule {}
