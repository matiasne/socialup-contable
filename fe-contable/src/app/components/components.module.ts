import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { IonicModule } from '@ionic/angular';
import { CropImageComponent } from './crop-image/crop-image.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { ItemClientComponent } from './item-client/item-client.component';
import { ItemBusinessComponent } from './item-business/item-business.component';



@NgModule({
imports: [
    CommonModule,  
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ImageCropperModule,
    ],
  declarations: [
    CropImageComponent,
    ImageUploadComponent,
    ListItemsComponent,
    ItemClientComponent,
    ItemBusinessComponent
  ],
  exports: [
    ListItemsComponent,
    ImageUploadComponent,
    ItemClientComponent,
    ItemBusinessComponent
  ]
})
export class ComponentsModule {}