import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBoxPageRoutingModule } from './create-box-routing.module';

import { CreateBoxPage } from './create-box.page';
import { BoxModule } from 'src/app/features/boxes/box.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateBoxPageRoutingModule,
    BoxModule,
  ],
  declarations: [CreateBoxPage],
})
export class CreateBoxPageModule {}
