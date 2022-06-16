import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormClientPage } from './form-client.page';

const routes: Routes = [
  {
    path: '',
    component: FormClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormClientPageRoutingModule {}
