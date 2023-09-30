import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CropImageComponent } from './components/crop-image/crop-image.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { InputAddressComponent } from './components/input-address/input-address.component';
import { InputAutocompleteComponent } from './components/input-autocomplete/input-autocomplete.component';
import { ButtonAlertDeleteComponent } from './components/button-alert-delete/button-alert-delete.component';
import { ButtonEmitInvoiceComponent } from './components/button-emit-invoice/button-emit-invoice.component';

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
    InputAutocompleteComponent,
    InputAddressComponent,
    ButtonAlertDeleteComponent,
    ButtonEmitInvoiceComponent,
  ],
  exports: [
    ListItemsComponent,
    ImageUploadComponent,
    InputAutocompleteComponent,
    InputAddressComponent,
    ButtonAlertDeleteComponent,
    ButtonEmitInvoiceComponent,
  ],
})
export class SharedModule {}
