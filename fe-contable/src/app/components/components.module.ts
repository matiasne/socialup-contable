import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { IonicModule } from '@ionic/angular';
import { CropImageComponent } from './crop-image/crop-image.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';



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
    ImageUploadComponent
  ],
  exports: [
    ImageUploadComponent
  ]
})
export class ComponentsModule {}