import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditClientPageRoutingModule } from './edit-client-routing.module';

import { EditClientPage } from './edit-client.page';
import { ClientsModule } from 'src/app/features/clients/clients.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClientsModule,
    IonicModule,
    EditClientPageRoutingModule,
  ],
  declarations: [EditClientPage],
})
export class EditClientPageModule {}
