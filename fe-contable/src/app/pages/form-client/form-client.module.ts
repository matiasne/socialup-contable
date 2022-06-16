import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormClientPageRoutingModule } from './form-client-routing.module';
import { FormClientPage } from './form-client.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormClientPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [FormClientPage]
})
export class FormClientPageModule {}
