import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormClientPageRoutingModule } from './form-client-routing.module';
import { FormClientPage } from './form-client.page';
import { ClientsModule } from 'src/app/features/clients/clients.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormClientPageRoutingModule,
    ClientsModule
  ],
  declarations: [FormClientPage]
})
export class FormClientPageModule {}
