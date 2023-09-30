import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Business } from 'src/app/features/business/models/business';
import { paymentTypes } from '../../models/payment';
import { Sale } from '../../models/sale';
import { CurrentSaleService } from '../../services/current-sale.service';

@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.component.html',
  styleUrls: ['./modal-detail.component.scss'],
})
export class ModalDetailComponent implements OnInit {
  @Input() sale: Sale = new Sale(new Business('', '', '', '', '', '', '', ''));
  @Input() idSale: string = '';

  constructor(private modalCtrl: ModalController, private currentSaleService: CurrentSaleService) {




  }

  async ngOnInit() {
    if (this.idSale != '') {
      await this.currentSaleService.getSale(this.idSale).subscribe({
        next: (data) => {
          this.sale = data
          console.log(data)
        }
      })
      this.renameSale();
    } else {
      this.renameSale();
    }
  }

  closeModal() {
    this.modalCtrl.dismiss(onclick);
  }
  renameSale() {
    this.sale.payments.forEach((element) => {
      if (element.type == paymentTypes.cash.value) {
        element['tipo'] = 'Efectivo';
      }
      if (element.type == paymentTypes.creditCard.value) {
        element['tipo'] = 'Tarjeta Crédito';
      }
      if (element.type == paymentTypes.debitCard.value) {
        element['tipo'] = 'Tarjeta Debito ';
      }
      if (element.type == paymentTypes.personalAccount.value) {
        element['tipo'] = 'Cuenta Corriente';
      }
      if (element.type == paymentTypes.transfer.value) {
        element['tipo'] = 'Transeferencia';
      }
      if (element.type == paymentTypes.check.value) {
        element['tipo'] = 'Cheque';
      }
    });
  }
}
