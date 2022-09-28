import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardBusinessPage } from './dashboard-business.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardBusinessPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardBusinessPageRoutingModule {}
