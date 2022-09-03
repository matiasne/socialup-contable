import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'socialup-modal-select-product',
  templateUrl: './modal-select-product.component.html',
  styleUrls: ['./modal-select-product.component.scss']
})
export class ModalSelectProductComponent implements OnInit {

constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}


  handleClickProduct(product){
    this.modalCtrl.dismiss(product)
    
    
  }
   
  
}
