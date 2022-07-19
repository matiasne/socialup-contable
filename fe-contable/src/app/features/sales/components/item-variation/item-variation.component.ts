import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Variation } from '../../models/variation';
import { Sale } from '../../models/sale';
import { CurrentSaleService } from '../../services/current-sale.service';
import { FormSaleProductComponent } from '../form-sale-product/form-sale-product.component';

@Component({
  selector: 'app-item-variation',
  templateUrl: './item-variation.component.html',
  styleUrls: ['./item-variation.component.scss'],
})
export class ItemVariationComponent implements OnInit {
  @Input() saleVariation:Variation;
  public saleVariation:Variation;

  constructor(
    private modalCtrl:ModalController,
    private currentSaleService:CurrentSaleService,
    private alertController:AlertController
  ) {
    console.log(this.saleVariation)
  }

  ngOnInit() {
    console.log(this.saleVariation)
  }

  async doAlert(){
    const alert = await this.alertController.create({
      header:'ELIMINAR CUENTA',
      message:'Desea quitar el producto de la lista.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
          //  this.currentSaleService.deleteSaleProduct(this.saleVariation)
          }
        }
      ],
    });
    (await alert).present()
  
  }

  handleClickDelete(){
    this.doAlert()
  }
  
   async handleClickEdit(){
    const modal2: HTMLIonModalElement = await this.modalCtrl.create({
      component: FormSaleProductComponent,
      componentProps: {
        selectSaleProduct:this.saleVariation,
        other: {couldAlsoBeAnObject: true}
     }
    });
    modal2.present();
  
    let { data, role } = await modal2.onWillDismiss();
  
    this.currentSaleService.updateSaleProduct(data)
  
  }

}
