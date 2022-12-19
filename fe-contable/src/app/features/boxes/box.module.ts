import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormBoxComponent } from './components/form-box/form-box.component';
import { ListBoxComponent } from './components/list-box/list-box.component';
import { ItemBoxComponent } from './components/item-box/item-box.component';
import { ListMovementComponent } from './components/list-movement/list-movement.component';
import { ItemMovementComponent } from './components/item-movement/item-movement.component';

@NgModule({
  declarations: [FormBoxComponent, ListBoxComponent, ItemBoxComponent, ListMovementComponent, ItemMovementComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    SharedModule,
  ],
  exports: [FormBoxComponent, ListBoxComponent, ItemBoxComponent, ListMovementComponent, ItemMovementComponent],
})
export class BoxModule { }
