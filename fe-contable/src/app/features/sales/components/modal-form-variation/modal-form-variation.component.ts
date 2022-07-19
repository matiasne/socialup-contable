import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { type } from 'os';
import { Variation } from '../../models/variation';
import { CurrentSaleService } from '../../services/current-sale.service';

@Component({
  selector: 'app-modal-form-variation',
  templateUrl: './modal-form-variation.component.html',
  styleUrls: ['./modal-form-variation.component.scss'],
})
export class ModalFormVariationComponent implements OnInit {
private salesVariation:Variation;
 
@Output()handleChange=new EventEmitter<any>();
 public typeVariation
 public title='Recargo'
  constructor(
    private modalCtrl:ModalController,
    public navParams: NavParams,
    public  currenteSale:CurrentSaleService
  ) {
    this.salesVariation = new Variation();
   
   }

  ngOnInit() {
    this.typeVariation = this.navParams.get('type')
    if(this.typeVariation === 'discount'){
      this.title='Descuento'
      } 
     }

  refreshData(data){
    this.salesVariation=data;
    console.log(data)
  }

  submit(){
    if(this.typeVariation === 'discount'){
      this.salesVariation.value = -this.salesVariation.value;
    }
    
    this.modalCtrl.dismiss(this.salesVariation);
  }

  cancel(){
    this.modalCtrl.dismiss(undefined);
  }

}
