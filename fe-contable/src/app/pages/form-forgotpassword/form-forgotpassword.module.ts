import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormForgotpasswordPageRoutingModule } from './form-forgotpassword-routing.module';

import { FormForgotpasswordPage } from './form-forgotpassword.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormForgotpasswordPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    
  ],
  declarations: [FormForgotpasswordPage]
})
export class FormForgotpasswordPageModule {}
