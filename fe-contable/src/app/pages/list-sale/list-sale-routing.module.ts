import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListSalePage } from './list-sale.page';

const routes: Routes = [
  {
    path: '',
    component: ListSalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListSalePageRoutingModule {}
