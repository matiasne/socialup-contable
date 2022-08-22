import { Injectable } from '@angular/core';
import { SelectedService } from 'src/app/services/global/selected.service';
import { HelperService } from 'src/app/services/helpers.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Client } from '../../clients/models/client';
import { Sale } from '../models/sale';
import { SaleProduct } from '../models/sale-product';
import { BaseCRUDService } from '../../../services/base-crud.service';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app/services/global';
import { StorageSessionService } from '../../../services/storage-session.service';
import { Variation, VariationType } from '../models/variation';
import { element } from 'protractor';
import { Status } from '../models/status';
import { Payment } from '../models/payment';

@Injectable({ providedIn: 'root' })
export class CurrentSaleService extends BaseCRUDService {
  public currentSale: Sale;
  public url: string;
  public client: Client;
  public saleProducts: Array<SaleProduct> = [];
  public variations: Array<Variation> = [];
  public total: number = 0;
  public date: Date = new Date();
  public status: Status;
  public payments: Array<Payment> = [];
  constructor(
    public _http: HttpClient,
    private selectedService: SelectedService,
    public helperService: HelperService,
    public storageSessionService: StorageSessionService
  ) {
    super(_http, storageSessionService);
    this.url = GLOBAL.url + '/sale';

    this.selectedService.obsSelectedBusiness().subscribe((business) => {
      this.currentSale = new Sale(
        '',
        this.client,
        this.saleProducts,
        this.variations,
        0,
        this.date,
        this.status,
        this.payments,
        business
      );
    });
  }

  addClient(client: Client) {
    this.currentSale.client = client;
  }
  removeClient() {
    this.currentSale.client = undefined;
  }

  addSaleProduct(saleProduct: SaleProduct) {
    this.currentSale.saleProducts.push(saleProduct);
    console.log(saleProduct);
    this.refreshTotal();
  }

  addVariation(variation: Variation) {
    this.currentSale.variations.push(variation);
    this.refreshTotal();
  }
  deleteSaleVariation(variation: Variation) {
    this.currentSale.variations = this.currentSale.variations.filter(
      (item) => item !== variation
    );
    this.refreshTotal();
  }

  updateSaleProduct(saleProduct: SaleProduct) {
    this.refreshTotal();
  }

  deleteSaleProduct(saleProduct: SaleProduct) {
    this.currentSale.saleProducts = this.currentSale.saleProducts.filter(
      (item) => item !== saleProduct
    );
    this.refreshTotal();
  }

  async refreshTotal() {
    this.currentSale.total = 0;
    for await (let product of this.currentSale.saleProducts) {
      this.currentSale.total += product.subTotal;
    }

    for await (let variation of this.currentSale.variations) {
      if (variation.type == VariationType.percentage) {
        this.currentSale.total =
          this.currentSale.total +
          (this.currentSale.total * Number(variation.value)) / 100;
      }
      if (variation.type == VariationType.amount) {
        this.currentSale.total =
          this.currentSale.total + Number(variation.value);
      }
    }
  }

  add(sale: Sale) {
    // let formData = this.helperService.toFormData(sale)
    // console.log(formData)
    console.log(sale);
    this.post(this.url, sale).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  calculateProductSubTotal(saleProduct: SaleProduct) {
    let subTotal = Number(saleProduct.amount) * Number(saleProduct.salePrice);
    let descuento = 0;
    if (saleProduct.variation.type == VariationType.percentage) {
      descuento = (subTotal * Number(saleProduct.variation.value)) / 100;
      subTotal = subTotal + descuento;
    }
    if (saleProduct.variation.type == VariationType.amount) {
      descuento = subTotal + Number(saleProduct.variation.value);
      subTotal = descuento;
    }

    return subTotal;
  }

  addStatus(status: Status) {
    this.currentSale.status = status;
  }

  addPayment(payment: Payment) {
    this.currentSale.payments.push(payment);
  }
}
