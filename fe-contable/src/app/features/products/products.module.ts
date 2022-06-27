import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemProductComponent } from './components/item-product/item-product.component';
import { ListProductComponentComponent } from './components/list-product-component/list-product-component.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    ItemProductComponent,
    ListProductComponentComponent
  ],
  imports: [
    ComponentsModule,
    IonicModule,
    CommonModule
  ],
  exports:[
    ListProductComponentComponent
  ]
  
})
export class ProductsModule { }
