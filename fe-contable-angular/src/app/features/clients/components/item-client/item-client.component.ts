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
  @Input() client: Client;
  @Input() showDeleteButton = false;
  @Input() showEditButton = false;
  @Output() eventClick = new EventEmitter<any>();
  @Output() eventClickRemove = new EventEmitter<any>();
  @Output() eventClickEdit = new EventEmitter<any>();
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  handleClick() {
    this.eventClick.emit(this.client);
  }

  handleClickDelete() {
    this.eventClickRemove.emit(this.client);
  }
  handleClickEditing() {
    this.eventClickEdit.emit(this.client);
  }
}
