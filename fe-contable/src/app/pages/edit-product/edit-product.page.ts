import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Business } from 'src/app/features/business/models/business';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { Product } from 'src/app/features/products/models/product';
import { ProductService } from 'src/app/features/products/services/product.service';
import { HelperService } from 'src/app/services/helpers.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  public productId: string = '';
  public business: Business;
  public obsBusiness: any;
  constructor(
    public productService: ProductService,
    public toastService: ToastService,
    public businessService: BusinessService,
    public activateRoute: ActivatedRoute,
    public router: Router,
    public alertController: AlertController
  ) {
    if (this.activateRoute.snapshot.params.productId) {
      this.productId = this.activateRoute.snapshot.params.productId;
    }
  }

  ngOnInit() {}

  submit(data) {}
}
