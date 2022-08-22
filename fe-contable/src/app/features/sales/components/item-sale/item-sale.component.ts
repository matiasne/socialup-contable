import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { async } from 'rxjs';
import { Client } from 'src/app/features/clients/models/client';
import { Sale } from '../../models/sale';
import { SaleProduct } from '../../models/sale-product';
import { SalesModule } from '../../sale.module';
import { CurrentSaleService } from '../../services/current-sale.service';
import { FormSaleProductComponent } from '../form-sale-product/form-sale-product.component';

@Component({
  selector: 'socialup-item-sale',
  templateUrl: './item-sale.component.html',
  styleUrls: ['./item-sale.component.scss'],
})
export class ItemSaleComponent implements OnInit {
  @Input() sale:Sale;
  @Input() valor1:Number;
  public saleProduct: Array<any>=[SaleProduct]

  constructor(  ) {

   }
 
  ngOnInit() {
  

  }


ionViewWillEnter(){

}

}
