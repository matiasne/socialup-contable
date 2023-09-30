import { Component, Input, OnInit } from '@angular/core';
import { Sale } from '../../models/sale';

@Component({
  selector: 'socialup-item-sale',
  templateUrl: './item-sale.component.html',
  styleUrls: ['./item-sale.component.scss'],
})
export class ItemSaleComponent implements OnInit {
  @Input() sale: Sale;
  public total = 0;
  constructor() {}

  ngOnInit() {
    this.getTotalAmount();
  }

  getTotalAmount() {
    this.sale.item.forEach((element) => {
      this.total += Number(element.amount);
    });
    return this.total;
  }

  ionViewWillEnter() {}
}
