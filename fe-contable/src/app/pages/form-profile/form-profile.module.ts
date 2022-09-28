import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormProfilePageRoutingModule } from './form-profile-routing.module';

import { FormProfilePage } from './form-profile.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FormProfilePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [FormProfilePage],
})
export class FormProfilePageModule {}
