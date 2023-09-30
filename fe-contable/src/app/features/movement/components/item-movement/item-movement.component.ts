import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Movement } from '../../models/movement';
import { MovementService } from '../../services/movement.service';
import { ModalDetailComponent } from 'src/app/features/sales/components/modal-detail/modal-detail.component';
import { BusinessService } from 'src/app/features/business/service/business.service';


@Component({
  selector: 'app-item-movement',
  templateUrl: './item-movement.component.html',
  styleUrls: ['./item-movement.component.scss'],
})
export class ItemMovementComponent implements OnInit {
  public statusMovement: boolean = false;
  public idSale = '';
  @Input() movement: Movement;
  @Input() showEditButton = false;
  @Input() movementId: string = '';
  @Output() eventClickEdit = new EventEmitter<any>();
  @Output() eventClickStatus = new EventEmitter<any>();
  @Output() eventClick = new EventEmitter<any>();
  @Output() handleClickItem = new EventEmitter<any>();

  constructor(public router: Router,
    public movementService: MovementService,
    public modalCtrl: ModalController,
    public businessService: BusinessService,
  ) { }

  ngOnInit() {
    // this.movementService.getMovement(this.movement._id).subscribe({
    //   next: (movement: Movement) => {
    //     this.movement = movement
    //   }
    // })
  }

  handleClickEdit() {
    1

    this.eventClickEdit.emit(this.movement);

  }

  handleClick(data) {
    console.log(data)
    this.eventClick.emit(this.movement);
  }
  async openModalMovement() {
    this.idSale = this.movement.idSale
    console.log(this.idSale)
    const modal = await this.modalCtrl.create({
      id: '1',
      component: ModalDetailComponent,
      componentProps: {
        idSale: this.idSale,
        other: { couldAlsoBeAnObject: true },
      },
    });
    modal.present();

    const { role } = await modal.onWillDismiss();
  }
}
