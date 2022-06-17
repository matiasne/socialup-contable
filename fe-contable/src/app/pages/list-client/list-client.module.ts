import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListClientPageRoutingModule } from './list-client-routing.module';

import { ListClientPage } from './list-client.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListClientPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [ListClientPage]
})
export class ListClientPageModule {}
