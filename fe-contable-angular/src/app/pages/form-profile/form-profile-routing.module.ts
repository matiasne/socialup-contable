import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { FormProfilePage } from './form-profile.page';

const routes: Routes = [
  {
    path: '',
    component: FormProfilePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class FormProfilePageRoutingModule {}
