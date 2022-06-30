import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessListPageRoutingModule } from './business-list-routing.module';

import { BusinessListPage } from './business-list.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { BusinessModule } from 'src/app/features/business/business.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    BusinessListPageRoutingModule,
    ReactiveFormsModule,
    BusinessModule
  ],
  declarations: [BusinessListPage]
})
export class BusinessListPageModule {}
