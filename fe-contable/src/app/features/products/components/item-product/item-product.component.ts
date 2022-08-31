import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/features/products/models/product';

@Component({
  selector: 'app-item-product',
  templateUrl: './item-product.component.html',
  styleUrls: ['./item-product.component.scss'],
})
export class ItemProductComponent implements OnInit {

  @Input() product:Product;
  @Input() showButton=false;
  @Output() handleClickEdit =new EventEmitter<any>();
  
  constructor(
    public router:Router,
  ){ }

  ngOnInit(){ }
  
  handleClickEditing(){
    console.log(this.product)
    this.router.navigate(['/edit-product',{product:JSON.stringify(this.product)}])
  }

}
