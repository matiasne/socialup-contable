import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
import { Client } from 'src/app/features/clients/models/client';
import { ModalFormClientComponent } from '../modal-form-client/modal-form-client.component';

@Component({
  selector: 'socialup-item-client',
  templateUrl: './item-client.component.html',
  styleUrls: ['./item-client.component.scss'],
})
export class ItemClientComponent implements OnInit {

  @Input() client:Client;
  @Input() showButton=false
  @Output() handleClickRemove=new EventEmitter<any>();
  @Output() handleClickEdit =new EventEmitter<any>();
  constructor(
    public modalCtrl:ModalController
  ) { }

  ngOnInit() {}

  handleClickDelete(){
    this.handleClickRemove.emit(this.client)
  }
  handleClickEditing(){
  this.handleClickEdit.emit(this.client)
 this.openModalNewClient(this.client)
  }
  async openModalNewClient(client) {

    const modal = await this.modalCtrl.create({
      id:"1",
      component: ModalFormClientComponent,
      componentProps: {
        client:client,
        other: {couldAlsoBeAnObject: true}
     }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    
    if(data){      
      // this.handleClickClient(data) 
    }

  }
}
