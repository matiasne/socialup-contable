import { Injectable } from "@angular/core";

@Injectable()
export class HelperService{

    constructor (){
        
    }

    toFormData<T>( formValue: T ) {
        const formData = new FormData();      
        for ( const key of Object.keys(formValue) ) {
          const value = formValue[key];
          if(key == 'image' && value){
            let blob = this.DataURIToBlob(value)
            if(blob.type.includes("image"))
              formData.append(key,blob, "imagen.jpg");
          }
          else
            formData.append(key, value);
        }
      
        return formData;
      }
      

      DataURIToBlob(dataURI: string) {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
      }

   
}   