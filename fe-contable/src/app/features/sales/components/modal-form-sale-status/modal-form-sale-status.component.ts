import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms'
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

public status:Status
public total:number = 0;
public totalRemaining:number=0;
public totalMostar:string='';
public inputCheckCard:boolean = false;
public inputCheckCash:boolean = false;
public inputCheckTransfer:boolean = false;
public inputCheckCheck:boolean = false;
public inputCheckPersonalAccount:boolean = false;
public cashAmount = 0;
public cardAmount=0;
public checkAmount = 0;
public transferAmount=0;
public personalAccountAmount = 0;
public sale: Sale;
public formSale:FormGroup;
  constructor(
    public currentSaleService:CurrentSaleService
  ) { 
   
  }

  ngOnInit() {
     this.total=this.currentSaleService.currentSale.total 
  }

  clickButtonCash(){


  }

  clickButtonCard(){

  }

  clickButtonBudget(){

  }

  clickCheckboxBill(){

  }

  calculate(){
    this.totalRemaining = this.total - this.cashAmount -this.cardAmount -this.personalAccountAmount-this.checkAmount-this.transferAmount
    this.totalMostar=this.totalRemaining.toFixed(2)
  }

  submit(){
    if(this.inputCheckCash){
      let payment:Payment = new Payment(paymentTypes.cash,this.cashAmount);
      this.currentSaleService.addPayment(payment)
    }
    if(this.inputCheckCard){
      let payment:Payment = new Payment(paymentTypes.card,this.cardAmount);
      this.currentSaleService.addPayment(payment)
  }
    if(this.inputCheckPersonalAccount){
      let payment:Payment = new Payment(paymentTypes.personalAccount,this.personalAccountAmount);
      this.currentSaleService.addPayment(payment)
    }
    if(this.inputCheckCheck){
      let payment:Payment = new Payment(paymentTypes.check,this.checkAmount);
      this.currentSaleService.addPayment(payment)
  }
    if(this.inputCheckTransfer){
      let payment:Payment = new Payment(paymentTypes.transfer,this.transferAmount);
      this.currentSaleService.addPayment(payment)
    }
console.log(this.currentSaleService.currentSale)
this.currentSaleService.add(this.currentSaleService.currentSale)

this.formSale.reset()
}
}
