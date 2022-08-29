import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBusinessComponent } from './components/form-business/form-business.component';
import { ItemBusinessComponent } from './components/item-business/item-business.component';
import { ListBusinessComponent } from './components/list-business/list-business.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    FormBusinessComponent,
    ItemBusinessComponent,
    ListBusinessComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    SharedModule
  ],
  exports:[
    FormBusinessComponent,
    ItemBusinessComponent,
    ListBusinessComponent
    
  ]
  
})
export class BusinessModule { }
