import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/auth/services/session.service';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { HelperService } from 'src/app/shared/services/helpers.service';
import { ListItemsComponent } from 'src/app/shared/components/list-items/list-items.component';
import { Movement } from '../../models/movement';
import { MovementService } from '../../services/movement.service';
import { ModalController } from '@ionic/angular';
import { ModalDetailComponent } from 'src/app/features/sales/components/modal-detail/modal-detail.component';



@Component({
  selector: 'app-list-movement',
  templateUrl: './list-movement.component.html',
  styleUrls: ['./list-movement.component.scss'],
})
export class ListMovementComponent implements OnInit {
  @ViewChild('listItem') listItems: ListItemsComponent;
  @Input() showEditButton = false;
  @Input() idBox = '';
  @Output() clickMovement = new EventEmitter<Movement>();


  public movements: Array<Movement> = [];
  public id: any;
  public totalPages: number;

  constructor(
    public activateRoute: ActivatedRoute,
    public sessionService: SessionService,
    public helperService: HelperService,
    public businessService: BusinessService,
    public router: Router,
    public movementService: MovementService,
    public modalCtrl: ModalController,

  ) { }

  ngOnInit(): void {
    console.log(this.idBox)
    this.refreshMovements();
  }

  refreshMovements(data: any = { perPage: 10, pageCount: 1, searchWord: '' }) {
    this.movementService.getMovement(this.idBox).subscribe({
      next: (response) => {
        console.log(response.data)
        this.movements = response.data;
      },
    });
  }

  handleClick(data) {
    console.log(data)
    this.clickMovement.emit(data);
  }


}
