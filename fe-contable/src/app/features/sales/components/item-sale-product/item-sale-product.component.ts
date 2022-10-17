import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { SaleProduct } from '../../models/sale-product';
import { Variation } from '../../models/variation';
import { CurrentSaleService } from '../../services/current-sale.service';
import { FormSaleProductComponent } from '../form-sale-product/form-sale-product.component';

@Component({
  selector: 'socialup-item-sale-product',
  templateUrl: './item-sale-product.component.html',
  styleUrls: ['./item-sale-product.component.scss'],
})
export class ItemSaleProductComponent implements OnInit {
  @Input() saleProduct: SaleProduct;
  @Input() valor1: Number;
  @Input() saleVariation: Variation;

  @Input() showDelete: boolean = false;
  @Input() showEdit: boolean = false;

  public valueVariationView: number;
  public typeVariation;
  public title = 'Recargo';
  constructor(
    private modalCtrl: ModalController,
    private currentSaleService: CurrentSaleService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    let type = Math.sign(this.saleProduct.variation.value);

    if (type == -1) {
      this.title = 'Descuento';
    }
    this.valueVariationView = Math.abs(this.saleProduct.variation.value);
  }

  ionViewWillEnter() {}
  async doAlert() {
    const alert = await this.alertController.create({
      header: 'REMOVER DE LA VENTA',
      message: 'Desea quitar el producto de la lista.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
            this.currentSaleService.deleteSaleProduct(this.saleProduct);
          },
        },
      ],
    });
    (await alert).present();
  }

  handleClickDelete() {
    this.doAlert();
  }

  async handleClickEdit() {
    const modal2: HTMLIonModalElement = await this.modalCtrl.create({
      component: FormSaleProductComponent,
      componentProps: {
        selectSaleProduct: this.saleProduct,
        other: { couldAlsoBeAnObject: true },
      },
    });
    modal2.present();

    let { data, role } = await modal2.onWillDismiss();

    this.currentSaleService.updateSaleProduct(data);
  }
}
