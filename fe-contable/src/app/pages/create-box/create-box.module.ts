import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBoxPageRoutingModule } from './create-box-routing.module';

import { CreateBoxPage } from './create-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateBoxPageRoutingModule
  ],
  declarations: [CreateBoxPage]
})
export class CreateBoxPageModule {}
