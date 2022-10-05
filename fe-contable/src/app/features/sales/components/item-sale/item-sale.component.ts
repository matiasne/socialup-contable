import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { element } from 'protractor';
import { async } from 'rxjs';
import { Sale } from '../../models/sale';
import { SaleProduct } from '../../models/sale-product';
import { CurrentSaleService } from '../../services/current-sale.service';
import { FormSaleProductComponent } from '../form-sale-product/form-sale-product.component';

@Component({
  selector: 'socialup-item-sale',
  templateUrl: './item-sale.component.html',
  styleUrls: ['./item-sale.component.scss'],
})
export class ItemSaleComponent implements OnInit {
  @Input() sale: Sale;

  constructor() {}
  ngOnInit() {
    console.log(this.sale);
  }
  getTotalAmount() {
    let total = 0;
    this.sale.saleProducts.forEach((element) => {
      total += Number(element.amount);
    });

    return total;
  }

  ionViewWillEnter() {}
}
