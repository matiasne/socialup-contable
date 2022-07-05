import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'; 
import { Client } from 'src/app/features/clients/models/client';
import { SelectClientComponent } from '../select-client/select-client.component';

@Component({
  selector: 'socialup-form-sale',
  templateUrl: './form-sale.component.html',
  styleUrls: ['./form-sale.component.scss'],
})
export class FormSaleComponent implements OnInit {
  @Input() client:Client;


 
  message = 'This modal example uses the modalController to present and dismiss modals.';
  constructor(private modalCtrl: ModalController) {
    
  }

  ngOnInit() {}
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SelectClientComponent,
    });
    modal.present();

    // const { data, role } = await modal.onWillDismiss();
    const { data, role } = await modal.onWillDismiss();

    this.client=data
  }
}
