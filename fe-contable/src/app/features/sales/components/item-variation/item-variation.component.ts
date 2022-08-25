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
  public saleVariatio :Variation;
  public valueVariationView:number;
  public typeVariation
  public title='Recargo'
  constructor(
    private modalCtrl:ModalController,
    private currentSaleService:CurrentSaleService,
    private alertController:AlertController
  ) {

  }

  ngOnInit() {
    let type = Math.sign(this.saleVariation.value)

    if(type == -1){
      this.title = "Descuento"
    }
    this.valueVariationView = Math.abs(this.saleVariation.value)
  }

  async doAlert(){
    const alert = await this.alertController.create({
      header:'ELIMINAR CUENTA',
      message:'Desea quitar el Variacion de la lista.',
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
           this.currentSaleService.deleteSaleVariation(this.saleVariation)
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
