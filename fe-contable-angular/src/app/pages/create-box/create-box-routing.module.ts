import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBoxPage } from './create-box.page';

const routes: Routes = [
  {
    path: '',
    component: CreateBoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBoxPageRoutingModule {}
