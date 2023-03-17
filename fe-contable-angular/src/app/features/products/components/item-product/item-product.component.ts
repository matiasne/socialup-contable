import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/features/products/models/product';

@Component({
  selector: 'app-item-product',
  templateUrl: './item-product.component.html',
  styleUrls: ['./item-product.component.scss'],
})
export class ItemProductComponent implements OnInit {
  @Input() product: Product;
  @Input() showEditButton = false;
  @Output() eventClickEdit = new EventEmitter<any>();
  @Output() eventClick = new EventEmitter<any>();

  constructor(public router: Router) {}

  ngOnInit() {}

  handleClickEdit() {
    this.eventClickEdit.emit(this.product);
  }

  handleClick() {
    this.eventClick.emit(this.product);
  }
}
