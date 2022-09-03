import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss'],
})
export class CropImageComponent implements OnInit {
  public imagen: any;
  public croppedImage: any;
  public imageChangedEvent: any;
  public aspectRatio = '';
  public resizeToWidth = 0;
  public resizeToHeight = 0;

  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.resizeToWidth = this.navParams.get('resizeToWidth');
    this.resizeToHeight = this.navParams.get('resizeToHeight');
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  ngOnInit() {
    this.imageChangedEvent = this.navParams.get('file');
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  guardar() {
    this.modalCtrl.dismiss(this.croppedImage);
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }
}
