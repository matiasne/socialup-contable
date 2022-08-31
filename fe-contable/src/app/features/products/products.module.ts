import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemProductComponent } from './components/item-product/item-product.component';
import { ListProductComponentComponent } from './components/list-product-component/list-product-component.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormProductComponent } from './components/form-product/form-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ItemProductComponent,
    ListProductComponentComponent,
    FormProductComponent,
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    ComponentsModule,
  ],
  exports:[
    ListProductComponentComponent,
    FormProductComponent, 
    ItemProductComponent,
  ]
  
})
export class ProductsModule { }
