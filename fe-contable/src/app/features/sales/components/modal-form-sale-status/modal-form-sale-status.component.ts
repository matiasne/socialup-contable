import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { exit } from 'process';
import { TouchSequence } from 'selenium-webdriver';
import { Payment, paymentTypes } from '../../models/payment';
import { Sale } from '../../models/sale';
import { Status } from '../../models/status';
import { CurrentSaleService } from '../../services/current-sale.service';

@Component({
  selector: 'app-modal-form-sale-status',
  templateUrl: './modal-form-sale-status.component.html',
  styleUrls: ['./modal-form-sale-status.component.scss'],
})
export class ModalFormSaleStatusComponent implements OnInit {
  public status: Status;
  public total: number = 0;
  public totalRemaining: number = 0;
  public totalMostar: string = '';
  public totalVuelto: number = 0;
  public inputCheckCard: boolean = false;
  public inputCheckCash: boolean = false;
  public inputCheckTransfer: boolean = false;
  public inputCheckCheck: boolean = false;
  public inputCheckPersonalAccount: boolean = false;
  public cashAmount = 0;
  public cardAmount = 0;
  public checkAmount = 0;
  public transferAmount = 0;
  public personalAccountAmount = 0;
  public sale: Sale;
  public formSale: FormGroup;

  public isPaymentValid = false;
  constructor(
    public currentSaleService: CurrentSaleService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.total = this.currentSaleService.currentSale.total;
    this.calculate();
  }

  clickButtonCash() {}

  clickButtonCard() {}

  clickButtonBudget() {}

  clickCheckboxBill() {}

  calculate() {
    if (!this.inputCheckCash) {
      this.cashAmount = 0;
    }

    if (!this.inputCheckCard) {
      this.cardAmount = 0;
    }
    if (!this.inputCheckPersonalAccount) {
      this.personalAccountAmount = 0;
    }
    if (!this.inputCheckCheck) {
      this.checkAmount = 0;
    }
    if (!this.inputCheckTransfer) {
      this.transferAmount = 0;
    }

    this.totalRemaining =
      this.total -
      this.cashAmount -
      this.cardAmount -
      this.personalAccountAmount -
      this.checkAmount -
      this.transferAmount;
    this.totalMostar = this.totalRemaining.toFixed(2);
    if (this.totalRemaining < 0) {
      this.totalVuelto = Math.abs(this.totalRemaining);
      this.totalVuelto.toFixed(2);
    }

    if (this.inputCheckCard) {
      if (this.cardAmount > this.total - this.cashAmount) {
        alert('Monto mayor');
        return;
      }
    }
  }
  submit() {
    if (this.inputCheckCash) {
      let payment: Payment = new Payment(paymentTypes.cash, this.cashAmount);
      this.currentSaleService.addPayment(payment);
    }
    if (this.inputCheckCard) {
      let payment: Payment = new Payment(paymentTypes.card, this.cardAmount);
      this.currentSaleService.addPayment(payment);
    }
    if (this.inputCheckPersonalAccount) {
      let payment: Payment = new Payment(
        paymentTypes.personalAccount,
        this.personalAccountAmount
      );
      this.currentSaleService.addPayment(payment);
    }
    if (this.inputCheckCheck) {
      let payment: Payment = new Payment(paymentTypes.check, this.checkAmount);
      this.currentSaleService.addPayment(payment);
    }
    if (this.inputCheckTransfer) {
      let payment: Payment = new Payment(
        paymentTypes.transfer,
        this.transferAmount
      );
      this.currentSaleService.addPayment(payment);
    }

    this.currentSaleService.add(this.currentSaleService.currentSale);

    this.modalCtrl.dismiss(status);
  }
}
