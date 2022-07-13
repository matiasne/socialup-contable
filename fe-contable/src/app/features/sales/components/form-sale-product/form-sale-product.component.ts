import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { Product } from 'src/app/features/products/models/product';
import { ProductService } from 'src/app/features/products/services/product.service';
import { HelperService } from 'src/app/services/helpers.service';
import { Discount, DiscountType } from '../../models/discount';
import { SaleProduct } from '../../models/sale-product';
import { CurrentSaleService } from '../../services/current-sale.service';

@Component({
  selector: 'socialup-form-sale-product',
  templateUrl: './form-sale-product.component.html',
  styleUrls: ['./form-sale-product.component.scss'],
  providers:[ HelperService,BusinessService, ClientService,ProductService ]
})
export class FormSaleProductComponent implements OnInit {
  @Input() product:Product;
  @Input() saleProduct:SaleProduct;
 
 
  public discountTypes = DiscountType;
 

  public formSaleProduct: FormGroup;
  public isEditing: boolean = false;  
  public isSubmited: boolean = false;
  public buttonLabel = "Añadir Producto"
  
  constructor(
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private currentSaleService:CurrentSaleService
  ) {
    
    this.saleProduct =  new SaleProduct('','','','','','','',0,'',0,new Discount())

    this.formSaleProduct = new FormGroup({
      amount: new FormControl('', Validators.required),
      detail: new FormControl('', Validators.required),
      discountType: new FormControl(''),
      discountValue: new FormControl(''),
      discountDescription: new FormControl('')
    });
   }

  ngOnInit() {

    if(this.navParams.get('selectProduct')){
      this.product = this.navParams.get('selectProduct');

      this.saleProduct = new SaleProduct(
        this.product.name,
        this.product.description,
        this.product.code,
        this.product.costPrice,
        this.product.salePrice,
        this.product.idBusiness,
        this.product.image,
        0,
        "",
        0,
        new Discount()
      )
    }
    
    if(this.navParams.get('selectSaleProduct'))
      this.saleProduct = this.navParams.get('selectSaleProduct')
    

    this.formSaleProduct.setValue({
      amount: this.saleProduct.amount?this.saleProduct.amount:"",
      detail: this.saleProduct.detail?this.saleProduct.detail:"",
      discountType: this.saleProduct.discount.type?this.saleProduct.discount.type:"",
      discountValue: this.saleProduct.discount.value?this.saleProduct.discount.value:"",
      discountDescription: this.saleProduct.discount.description?this.saleProduct.discount.description:"",
    })
      
    
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.formSaleProduct.valid) {

      this.saleProduct.amount = this.formSaleProduct.controls.amount .value
      this.saleProduct.detail = this.formSaleProduct.controls.detail.value
      this.saleProduct.discount.type = this.formSaleProduct.controls.discountType.value
      this.saleProduct.discount.value = this.formSaleProduct.controls.discountValue.value
      this.saleProduct.discount.description = this.formSaleProduct.controls.discountDescription.value
      var subTotal:number;
      


      
      this.saleProduct.subTotal= this.currentSaleService.calculateProductSubTotal(this.saleProduct)


      this.modalCtrl.dismiss(this.saleProduct)
    }
  }


}
