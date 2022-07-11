import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { Product } from 'src/app/features/products/models/product';
import { ProductService } from 'src/app/features/products/services/product.service';
import { HelperService } from 'src/app/services/helpers.service';
import { SaleProduct } from '../../models/sale-product';

@Component({
  selector: 'socialup-form-sale-product',
  templateUrl: './form-sale-product.component.html',
  styleUrls: ['./form-sale-product.component.scss'],
  providers:[ HelperService,BusinessService, ClientService,ProductService ]
})
export class FormSaleProductComponent implements OnInit {
  @Input() product:Product;
  @Input() saleProduct:SaleProduct;
 
 
 

  public formSaleProduct: FormGroup;
  public isEditing: boolean = false;  
  public isSubmited: boolean = false;
  public buttonLabel = "Añadir Producto"
  
  constructor(
    private modalCtrl: ModalController,
    public navParams: NavParams
  ) {
    
    this.saleProduct =  new SaleProduct('','','','','','','','','',0)

    this.formSaleProduct = new FormGroup({
      amount: new FormControl('', Validators.required),
      detail: new FormControl('', Validators.required),
    });
   }

  ngOnInit() {

    this.saleProduct = this.navParams.get('selectSaleProduct');


    this.formSaleProduct.setValue({
      amount: this.saleProduct.amount?this.saleProduct.amount:"",
      detail: this.saleProduct.detail?this.saleProduct.detail:""
    })
      
    
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.formSaleProduct.valid) {

      this.saleProduct.amount = this.formSaleProduct.controls.amount .value
      this.saleProduct.detail = this.formSaleProduct.controls.detail.value

      var subTotal:number;

      subTotal = Number(this.saleProduct.amount)*Number(this.saleProduct.salePrice)
      this.saleProduct.subTotal= subTotal


      this.modalCtrl.dismiss(this.saleProduct)
    }
  }


}
