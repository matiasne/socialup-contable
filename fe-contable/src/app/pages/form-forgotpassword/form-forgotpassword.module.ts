import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormForgotpasswordPageRoutingModule } from './form-forgotpassword-routing.module';

import { FormForgotpasswordPage } from './form-forgotpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormForgotpasswordPageRoutingModule
  ],
  declarations: [FormForgotpasswordPage]
})
export class FormForgotpasswordPageModule {}
