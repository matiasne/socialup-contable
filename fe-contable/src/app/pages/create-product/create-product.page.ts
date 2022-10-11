import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'src/app/features/business/models/business';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {
  public business: Business;

  constructor(public router: Router) {}

  ngOnInit() {}

  submit(data) {
    this.router.navigateByUrl('/products');
  }
}
