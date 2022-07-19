import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Variation } from '../../models/variation';

@Component({
  selector: 'app-modal-form-surcharge',
  templateUrl: './modal-form-surcharge.component.html',
  styleUrls: ['./modal-form-surcharge.component.scss'],
})
export class ModalFormSurchargeComponent implements OnInit {
private salesVariation:Variation;
 
@Output()handleChange=new EventEmitter<any>();
  constructor(
    private modalCtrl:ModalController
  ) {
    this.salesVariation = new Variation();
   }

  ngOnInit() {}

  refreshData(data){
    this.salesVariation=data;
    console.log(data)
  }

  submit(){
    this.modalCtrl.dismiss(this.salesVariation);
  }

  cancel(){
    this.modalCtrl.dismiss(undefined);
  }

}
