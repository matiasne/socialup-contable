import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectClientComponent } from './components/select-client/select-client.component';
import { FormSaleComponent } from './components/form-sale/form-sale.component';
import { ClientsModule } from '../clients/clients.module';

@NgModule({
  declarations: [
    FormSaleComponent,
    SelectClientComponent

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    ClientsModule,
    
  ],
  exports:[
    FormSaleComponent,
    SelectClientComponent
  ]
  
})
export class SalesModule { }
