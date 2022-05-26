import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormProfilePageRoutingModule } from './form-profile-routing.module';

import { FormProfilePage } from './form-profile.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    FormProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormProfilePage]
})
export class FormProfilePageModule {}
