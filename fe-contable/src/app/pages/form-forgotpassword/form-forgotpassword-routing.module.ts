import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormForgotpasswordPage } from './form-forgotpassword.page';

const routes: Routes = [
  {
    path: '',
    component: FormForgotpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormForgotpasswordPageRoutingModule {}
