import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormClientComponent } from './components/form-client/form-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemClientComponent } from './components/item-client/item-client.component';
import { ListClientComponent } from './components/list-client/list-client.component';
import { ModalFormClientComponent } from './components/modal-form-client/modal-form-client.component';




@NgModule({
  declarations: [
    FormClientComponent,
    ItemClientComponent,
    ListClientComponent,
    ModalFormClientComponent


  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    ComponentsModule,
  

  ],
  exports:[
    FormClientComponent,
    ItemClientComponent,
    ListClientComponent,
    ModalFormClientComponent

  ]
  
})
export class ClientsModule { }
