import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardBusinessPageRoutingModule } from './dashboard-business-routing.module';

import { DashboardBusinessPage } from './dashboard-business.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardBusinessPageRoutingModule
  ],
  declarations: [DashboardBusinessPage]
})
export class DashboardBusinessPageModule {}
