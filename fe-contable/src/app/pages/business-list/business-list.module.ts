import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessListPageRoutingModule } from './business-list-routing.module';

import { BusinessListPage } from './business-list.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessListPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [BusinessListPage]
})
export class BusinessListPageModule {}
