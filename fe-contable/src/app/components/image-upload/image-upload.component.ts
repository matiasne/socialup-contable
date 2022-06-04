import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController, ModalController, Platform } from '@ionic/angular';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { CropImageComponent } from '../crop-image/crop-image.component';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  providers: [ImagePicker, Camera, File]
})
export class ImageUploadComponent implements OnInit {

  
  @Input() public croppedImage ="";
  @Input() public showImageCroped = true;
  @Input() public aspectRatio ="";
  @Input() public resizeToWidth="";
  @Input() public resizeToHeight="";
  @Input() public height=0;
  @Output() onSelectValue = new EventEmitter<any>();

  public IsMobile = false;

  ngOnInit(): void {
    /*if(this.croppedImage == ""){
      this.croppedImage = "../../../assets/img/add-image.fw.png"
    }*/
  }

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 5
  };
  
  constructor(
    public actionSheetController: ActionSheetController,
    private imagePicker: ImagePicker,
    private camera: Camera,
    private deviceFile: File,
    public modalController: ModalController,
    private platform:Platform,
    ) { 

      if (this.platform.is('desktop')) {
        this.IsMobile = false;
      } else {
        this.IsMobile = true;
      } 

    }

 

  async selectImage(fileInput) {

    if(this.IsMobile){
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
          text: 'Seleccionar de la Galería',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Sacar Foto',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
        ]
      });
      await actionSheet.present();
    }
    else{
      fileInput.click();
    }
    
  }

  pickImage(sourceType) {

    if(sourceType == 0){
      this.imagePicker.getPictures(this.imagePickerOptions).then((results) => {
        for (var i = 0; i < results.length; i++) {
          console.log(results)
          this.showImage(results[0]);        
        }
      }, (err) => {
        alert(err);
      });
    }

    if(sourceType == 1){
      const options: CameraOptions = {
        quality: 5,
        sourceType: sourceType,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      }
      this.camera.getPicture(options).then((imageData) => {       
        this.showImage(imageData);      
      }, (err) => {
        // Handle error
      });
    }    
  }

  showImage(ImagePath) {
    
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.deviceFile.readAsDataURL(filePath, imageName).then(base64 => {     
      this.croppedImage = base64; 
      this.onSelectValue.emit(this.croppedImage);   
    }, error => {
      alert('Error in showing image' + error);
      
    });
  }


  async recortarImagen(file){
    const modal = await this.modalController.create({
      component: CropImageComponent,
      componentProps: { 
        file: file,
        aspectRatio:this.aspectRatio,
        resizeToWidth:this.resizeToWidth,
        resizeToHeight:this.resizeToHeight 
      }     
    });
    modal.onDidDismiss()
    .then((retorno:any) => {
      if(retorno.data){
        this.croppedImage = retorno.data;
        this.onSelectValue.emit(this.croppedImage);
      }      
    });
    return await modal.present();
  }

  seleccionarImagenWeb(event){
    this.recortarImagen(event);
  }
}