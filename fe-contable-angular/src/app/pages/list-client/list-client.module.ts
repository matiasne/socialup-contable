import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListClientPageRoutingModule } from './list-client-routing.module';

import { ListClientPage } from './list-client.page';
import { ClientsModule } from 'src/app/features/clients/clients.module';

@NgModule({
  imports: [
    CommonModule,
    ClientsModule,
    IonicModule,
    ListClientPageRoutingModule,
  ],
  declarations: [ListClientPage],
})
export class ListClientPageModule {}
