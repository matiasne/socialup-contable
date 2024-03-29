import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormClientComponent } from './components/form-client/form-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemClientComponent } from './components/item-client/item-client.component';
import { ListClientComponent } from './components/list-client/list-client.component';
import { ModalFormClientComponent } from './components/modal-form-client/modal-form-client.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputAutocompleteClientComponent } from './components/input-autocomplete-client/input-autocomplete-client.component';

@NgModule({
  declarations: [
    FormClientComponent,
    ItemClientComponent,
    ListClientComponent,
    ModalFormClientComponent,
    InputAutocompleteClientComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    SharedModule,
  ],
  exports: [
    FormClientComponent,
    ItemClientComponent,
    ListClientComponent,
    ModalFormClientComponent,
    InputAutocompleteClientComponent,
  ],
})
export class ClientsModule {}
