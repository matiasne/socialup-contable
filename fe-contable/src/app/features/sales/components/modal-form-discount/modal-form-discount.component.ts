import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Discount } from '../../models/discount';

@Component({
  selector: 'app-modal-form-discount',
  templateUrl: './modal-form-discount.component.html',
  styleUrls: ['./modal-form-discount.component.scss'],
})
export class ModalFormDiscountComponent implements OnInit {

  private data:Discount;

  constructor(
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {}

  refreshSaleProducts(data){
    console.log(data)
  }

  submit(){
    this.modalCtrl.dismiss(this.data)
  }

}
