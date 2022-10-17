import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { paymentTypes } from '../../models/payment';
import { Sale } from '../../models/sale';
import { SaleProduct } from '../../models/sale-product';

@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.component.html',
  styleUrls: ['./modal-detail.component.scss'],
})
export class ModalDetailComponent implements OnInit {
  @Input() sale: Sale;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log(this.sale);
    this.renameSale();
  }

  closeModal() {
    this.modalCtrl.dismiss(onclick);
  }
  renameSale() {
    this.sale.payments.forEach((element) => {
      if (element.type == paymentTypes.cash) {
        element['tipo'] = 'Efectivo';
      }

      if (element.type == paymentTypes.card) {
        element['tipo'] = 'Tarjeta';
      }
      if (element.type == paymentTypes.personalAccount) {
        element['tipo'] = 'Cuenta Corriente';
      }
      if (element.type == paymentTypes.transfer) {
        element['tipo'] = 'Transeferencia';
      }
      if (element.type == paymentTypes.check) {
        element['tipo'] = 'Cheque';
      }
      if (element.type == paymentTypes.empty) {
        element['tipo'] = 'empty';
      }
    });
  }
}
