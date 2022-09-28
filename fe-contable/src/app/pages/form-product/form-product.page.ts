import { Product } from 'src/app/features/products/models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/features/products/services/product.service';
import { HelperService } from 'src/app/services/helpers.service';
import { Business } from 'src/app/features/business/models/business';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/models/toast.enum';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.page.html',
  styleUrls: ['./form-product.page.scss'],
})

/*Responsabilidad:
leer la ruta
manejar servicios
manejar link hacia otras paginas....*/
export class FormProductPage implements OnInit {
  public product: Product;
  public business: Business;
  public obsBusiness: any;

  constructor(
    public productService: ProductService,
    public toastService: ToastService,
    public businessService: BusinessService,
    public activateRoute: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {
    this.product = new Product('', '', '', '', '', '', '', '');
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.product.idBusiness = this.businessService.getBusinessId();

    if (this.activateRoute.snapshot.params.id) {
      this.product._id = this.activateRoute.snapshot.params.id;
    }
  }

  submit(data) {
    this.router.navigateByUrl('/products');
  }
}
