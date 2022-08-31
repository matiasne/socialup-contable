import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Business } from 'src/app/features/business/models/business';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { Product } from 'src/app/features/products/models/product';
import { ProductService } from 'src/app/features/products/services/product.service';
import { ToastType } from 'src/app/models/toast.enum';
import { SelectedService } from 'src/app/services/global/selected.service';
import { HelperService } from 'src/app/services/helpers.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
  providers:[ProductService,HelperService, BusinessService  ]
})
export class EditProductPage implements OnInit {
  public product:Product;
  public business: Business;
  public obsBusiness: any
  constructor(
    public productService: ProductService,
    public toastService: ToastService,
    public businessService: BusinessService,
    public activateRoute: ActivatedRoute,
    public selectedService: SelectedService,
    public router: Router,
    public alertController: AlertController,
  ) { 


    this.product = new Product ('','','','','','','','')

    this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
      next: (data: any) => {
        this.business = data
        this.product.idBusiness= this.business._id;
      }
    })
  }

  ngOnInit() {
    this.product = Product.adapt(JSON.parse(this.activateRoute.snapshot.paramMap.get('product')))
    console.log(this.product._id)
  }

  submit(data){
 
  }
 
  }

