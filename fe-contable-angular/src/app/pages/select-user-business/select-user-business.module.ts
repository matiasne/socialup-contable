import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectUserBusinessPageRoutingModule } from './select-user-business-routing.module';

import { SelectUserBusinessPage } from './select-user-business.page';
import { BusinessModule } from 'src/app/features/business/business.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectUserBusinessPageRoutingModule,
    BusinessModule,
  ],
  declarations: [SelectUserBusinessPage],
})
export class SelectUserBusinessPageModule {}
