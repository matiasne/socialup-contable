import { Component, Input, OnInit } from '@angular/core';
import { SaleProduct } from '../../models/sale-product';

@Component({
  selector: 'socialup-item-sale-product',
  templateUrl: './item-sale-product.component.html',
  styleUrls: ['./item-sale-product.component.scss'],
  
})
export class ItemSaleProductComponent implements OnInit {
  @Input() saleProduct:SaleProduct;
  constructor() { }

  ngOnInit() {}

}
