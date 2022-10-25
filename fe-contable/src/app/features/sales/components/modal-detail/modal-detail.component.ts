import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { paymentTypes } from '../../models/payment';
import { Sale } from '../../models/sale';
import { SaleProduct } from '../../models/SaleProduct';

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
      if (element.type == paymentTypes.cash.name) {
        element['tipo'] = 'Efectivo';
      }

      if (element.type == paymentTypes.creditCard.name) {
        element['tipo'] = 'Tarjeta Crédito';
      }
      if (element.type == paymentTypes.debitCard.name) {
        element['tipo'] = 'Tarjeta Debito ';
      }

      if (element.type == paymentTypes.personalAccount.name) {
        element['tipo'] = 'Cuenta Corriente';
      }
      if (element.type == paymentTypes.transfer.name) {
        element['tipo'] = 'Transeferencia';
      }
      if (element.type == paymentTypes.check.name) {
        element['tipo'] = 'Cheque';
      }
      if (element.type == paymentTypes.empty.name) {
        element['tipo'] = 'empty';
      }
    });
  }
}
