import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormForgotpasswordPageRoutingModule } from './form-forgotpassword-routing.module';

import { FormForgotpasswordPage } from './form-forgotpassword.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormForgotpasswordPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    
  ],
  declarations: [FormForgotpasswordPage]
})
export class FormForgotpasswordPageModule {}
