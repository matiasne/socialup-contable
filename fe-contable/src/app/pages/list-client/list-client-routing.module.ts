import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListClientPage } from './list-client.page';

const routes: Routes = [
  {
    path: '',
    component: ListClientPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListClientPageRoutingModule {}
