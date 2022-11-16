import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/shared/services/helpers.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Client } from '../../clients/models/client';
import { Sale } from '../models/sale';
import { SaleProduct } from '../models/SaleProduct';
import { BaseCRUDService } from '../../../shared/services/base-crud.service';
import { GLOBAL } from 'src/app/shared/services/global';
import { Variation, VariationType } from '../models/variation';
import { Status } from '../models/status';
import { Payment } from '../models/payment';
import { SessionService } from 'src/app/auth/services/session.service';
import { BusinessService } from '../../business/service/business.service';
import { Business } from '../../business/models/business';
import { Box } from '../../boxes/models/box';

@Injectable({ providedIn: 'root' })
export class CurrentSaleService extends BaseCRUDService {
  public currentSale: Sale;
  public url: string;
  public currentBussines: Business;

  constructor(
    public _http: HttpClient,
    public helperService: HelperService,
    public sessionService: SessionService,
    private businessService: BusinessService
  ) {
    super(_http, sessionService);
    this.url = GLOBAL.url + '/sale';

    this.businessService.obsSelectedBusiness().subscribe((business) => {
      this.currentSale = new Sale(business);
      this.currentBussines = business;
    });
  }

  addClient(client: Client) {
    console.log(client);
    this.currentSale.client = client;
  }
  removeClient() {
    this.currentSale.client = undefined;
  }

  addSaleProduct(saleProduct: SaleProduct) {
    this.currentSale.item.push(saleProduct);

    this.refreshTotal();
  }

  addVariation(variation: Variation) {
    this.currentSale.variations.push(variation);
    this.refreshTotal();
  }

  addBox(box: Box) {
    console.log (box)
    this.currentSale.box = box;
    this.businessService.setSelectedBox(box)
    console.log(this.currentSale)
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
    this.currentSale.item = this.currentSale.item.filter(
      (item) => item !== saleProduct
    );
    this.refreshTotal();
  }

  async refreshTotal() {
    this.currentSale.total = 0;
    for await (let product of this.currentSale.item) {
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
    console.log(sale);

    this.post(this.url, sale).subscribe({
      next: (data) => {
        this.reset();
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

  reset() {
    this.currentSale = new Sale(this.currentBussines);
  }
}
