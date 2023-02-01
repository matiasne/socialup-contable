import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { ProductService } from 'src/app/features/products/services/product.service';
import { HelperService } from 'src/app/shared/services/helpers.service';
import { Variation } from '../../models/variation';
import { SaleProduct } from '../../models/SaleProduct';

@Component({
  selector: 'socialup-modal-form-product',
  templateUrl: './modal-form-product.component.html',
  styleUrls: ['./modal-form-product.component.scss'],
  providers: [],
})
export class ModalFormProductComponent implements OnInit {
  @Input() saleProduct: SaleProduct;
  @Output() handleSubmit = new EventEmitter<any>();

  public formSaleProduct: FormGroup;
  public isEditing: boolean = false;
  public isSubmited: boolean = false;
  public buttonLabel = 'Añadir Producto';

  constructor(private modalCtrl: ModalController) {
    this.saleProduct = new SaleProduct(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      0,
      '',
      0,
      new Variation()
    );

    this.formSaleProduct = new FormGroup({
      amount: new FormControl('', Validators.required),
      detail: new FormControl('', Validators.required),
      variationType: new FormControl(''),
      variationValue: new FormControl(''),
      variationDescription: new FormControl(''),
    });
  }

  ngOnInit() {}

  handleClickSaleProduct(saleProduct) {
    this.modalCtrl.dismiss(saleProduct);
  }
  submit() {
    this.modalCtrl.dismiss(this.saleProduct);
  }

  cancel() {
    this.modalCtrl.dismiss(undefined);
  }
}
