import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { element, EventEmitter } from 'protractor';
import { async } from 'rxjs';
import { Sale } from '../../models/sale';
import { SaleProduct } from '../../models/SaleProduct';
import { CurrentSaleService } from '../../services/current-sale.service';
import { FormSaleProductComponent } from '../form-sale-product/form-sale-product.component';

@Component({
  selector: 'socialup-item-sale',
  templateUrl: './item-sale.component.html',
  styleUrls: ['./item-sale.component.scss'],
})
export class ItemSaleComponent implements OnInit {
  @Input() sale: Sale;
  public total = 0;
  constructor() {}

  ngOnInit() {}

  getTotalAmount() {
    console.log('lalala');

    console.log(this.sale.item);
    this.sale.item.forEach((element) => {
      this.total += Number(element.amount);
    });

    return this.total;
  }

  ionViewWillEnter() {}
}
