import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemMovementComponent } from './components/item-movement/item-movement.component';
import { ListMovementComponent } from './components/list-movement/list-movement.component';

@NgModule({
  declarations: [
    ItemMovementComponent,
    ListMovementComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
  ],
  exports: [
    ItemMovementComponent,
    ListMovementComponent
  ],
})
export class MovementsModule { }
