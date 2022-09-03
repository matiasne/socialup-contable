import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormSalePage } from './form-sale.page';

const routes: Routes = [
  {
    path: '',
    component: FormSalePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormSalePageRoutingModule {}
