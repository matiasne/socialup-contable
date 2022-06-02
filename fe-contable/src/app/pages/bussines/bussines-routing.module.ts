import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BussinesPage } from './bussines.page';

const routes: Routes = [
  {
    path: '',
    component: BussinesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BussinesPageRoutingModule {
 
}

