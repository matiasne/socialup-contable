import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';
import { ToastType } from '../../models/toast.enum';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private toastCtrl: ToastController) {}

  async show(type: ToastType, message: string, duration: number = 3000) {
    let toastOptions: ToastOptions = {
      message: message,
      duration: duration,
      position: 'top',
      animated: true,
    };
    switch (type) {
      case ToastType.success:
        toastOptions.color = 'primary';
        break;
      case ToastType.error:
        toastOptions.color = 'danger';
        break;
      case ToastType.warning:
        toastOptions.color = 'warning';
        break;
    }

    const toast = await this.toastCtrl.create(toastOptions);
    toast.present();
  }
}
