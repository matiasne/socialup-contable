import { Injectable } from '@angular/core';
import { AlertController, ToastController, ToastOptions } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  public currentItem = new Subject<any>();
  constructor(private alertController: AlertController) {}

  getClientes$(): Observable<any> {
    return this.currentItem.asObservable();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }

  async presentAlertConfirm(data: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          },
        },
        {
          text: 'Okay',
          handler: () => {

            this.currentItem.next(data);
          },
        },
      ],
    });

    await alert.present();
  }
}
