import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormBoxComponent } from './components/form-box/form-box.component';
import { ListBoxComponent } from './components/list-box/list-box.component';
import { ItemBoxComponent } from './components/item-box/item-box.component';

@NgModule({
  declarations: [FormBoxComponent, ListBoxComponent, ItemBoxComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    SharedModule,
  ],
  exports: [FormBoxComponent, ListBoxComponent, ItemBoxComponent],
})
export class BoxModule {}
