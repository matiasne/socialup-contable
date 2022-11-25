import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonSelect, ModalController } from '@ionic/angular';
import { Box } from 'src/app/features/boxes/models/box';
import { BoxService } from 'src/app/features/boxes/service/box.service';
import { BusinessService } from 'src/app/features/business/service/business.service';
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
  public boxSelected: Box;
  public boxes: Array<Box> = [];
  public boxchoised = false;
  public selectedBoxId:string;

  public isPaymentValid = false;
  constructor(
    public currentSaleService: CurrentSaleService,
    private modalCtrl: ModalController,
    public businessService: BusinessService,
    public boxService:BoxService
  ) {}

  ngOnInit() {

    this.total = this.currentSaleService.currentSale.total;
    this.calculate();

      this.isPaymentValid = true;


    this.businessService.getBusinessBox().subscribe({
      next: (boxes: any) => {
        this.boxes = boxes.data;
        this.selectedBoxId = this.boxService.getSelectedBox()
      },
    });


  }

  clickButtonCash() {}

  clickButtonCard() {}

  clickButtonBudget() {}

  clickCheckboxBill() {}

  calculate() {

      this.isPaymentValid = true;


    this.totalVuelto = 0;
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
    if (this.totalRemaining <= 0) {
      this.totalVuelto = Math.abs(this.totalRemaining);
      this.totalVuelto.toFixed(2);
      this.totalMostar = '0,00';
      if (this.boxchoised){
      this.isPaymentValid = false;
      }
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
      let payment: Payment = new Payment(
        paymentTypes.cash.value,
        this.cashAmount
      );
      this.currentSaleService.addPayment(payment);
    }
    if (this.inputCheckCard) {
      let payment: Payment = new Payment(
        paymentTypes.creditCard.value,
        this.cardAmount
      );
      this.currentSaleService.addPayment(payment);
    }
    if (this.inputCheckPersonalAccount) {
      let payment: Payment = new Payment(
        paymentTypes.personalAccount.value,
        this.personalAccountAmount
      );
      this.currentSaleService.addPayment(payment);
    }
    if (this.inputCheckCheck) {
      let payment: Payment = new Payment(
        paymentTypes.check.value,
        this.checkAmount
      );
      this.currentSaleService.addPayment(payment);
    }
    if (this.inputCheckTransfer) {
      let payment: Payment = new Payment(
        paymentTypes.transfer.value,
        this.transferAmount
      );
      this.currentSaleService.addPayment(payment);
    }

    if (this.totalRemaining <= 0) {
      let saleStatus: Status = new Status();

      saleStatus.isPayed = true;


      this.currentSaleService.addStatus(saleStatus);
    }
    this.currentSaleService.currentSale.idClient = this.currentSaleService.currentSale.client._id || '';

    this.currentSaleService.currentSale.idBusiness = this.currentSaleService.currentSale.business._id;

    this.currentSaleService.add(this.currentSaleService.currentSale);

    this.modalCtrl.dismiss(status);
  }

  cancelSale() {
    let saleStatus: Status = new Status();
    saleStatus.isCanceled = true;
    this.currentSaleService.addStatus(saleStatus);
    this.currentSaleService.add(this.currentSaleService.currentSale);
    this.modalCtrl.dismiss(status);
  }

  handleChangeBox(event) {
    this.currentSaleService.addBox(this.selectedBoxId);
    this.boxService.setSelectedBox(this.selectedBoxId);
    this.boxchoised = true
    this.calculate();
  }
}
