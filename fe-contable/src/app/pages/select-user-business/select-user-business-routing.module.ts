import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectUserBusinessPage } from './select-user-business.page';

const routes: Routes = [
  {
    path: '',
    component: SelectUserBusinessPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectUserBusinessPageRoutingModule {}
