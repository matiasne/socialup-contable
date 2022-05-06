import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormProfilePageRoutingModule } from './form-profile-routing.module';

import { FormProfilePage } from './form-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormProfilePage]
})
export class FormProfilePageModule {}
