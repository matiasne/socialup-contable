import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Variation } from '../../models/variation';

@Component({
  selector: 'app-modal-form-discount',
  templateUrl: './modal-form-discount.component.html',
  styleUrls: ['./modal-form-discount.component.scss'],
})
export class ModalFormDiscountComponent implements OnInit {

  private data:Variation;

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
