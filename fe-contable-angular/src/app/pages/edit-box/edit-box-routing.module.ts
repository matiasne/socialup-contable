import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBoxPage } from './edit-box.page';

const routes: Routes = [
  {
    path: '',
    component: EditBoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBoxPageRoutingModule {}
