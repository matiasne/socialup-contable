import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBusinessComponent } from './components/form-business/form-business.component';
import { ItemBusinessComponent } from './components/item-business/item-business.component';
import { ListBusinessComponent } from './components/list-business/list-business.component';




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
    ComponentsModule
  ],
  exports:[
    FormBusinessComponent,
    ItemBusinessComponent,
    ListBusinessComponent
    
  ]
  
})
export class BusinessModule { }
