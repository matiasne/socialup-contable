import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListBoxPage } from './list-box.page';

const routes: Routes = [
  {
    path: '',
    component: ListBoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListBoxPageRoutingModule {}
