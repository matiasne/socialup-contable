import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListBoxPageRoutingModule } from './list-box-routing.module';

import { ListBoxPage } from './list-box.page';
import { BoxModule } from 'src/app/features/boxes/box.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListBoxPageRoutingModule,
    BoxModule,
  ],
  declarations: [ListBoxPage],
})
export class ListBoxPageModule {}
