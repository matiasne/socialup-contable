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
import { ToastService } from 'src/app/shared/services/toast.service';
import { ListItemsComponent } from 'src/app/shared/components/list-items/list-items.component';
import { Box } from '../../models/box';
import { Console } from 'console';

@Component({
  selector: 'socialup-list-box',
  templateUrl: './list-box.component.html',
  styleUrls: ['./list-box.component.scss'],
})
export class ListBoxComponent implements OnInit {
  @ViewChild('listItem') listItems: ListItemsComponent;
  @Input() showEditButton = false;
  @Output() clickBox = new EventEmitter<Box>();
  @Output() clickEditBox = new EventEmitter<Box>();

  public boxes: Array<Box> = [];
  public id: any;
  public totalPages: number;

  constructor(
    public activateRoute: ActivatedRoute,
    public sessionService: SessionService,
    public helperService: HelperService,
    public businessService: BusinessService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.refreshBoxes();
  }

  refreshBoxes(data: any = { perPage: 10, pageCount: 1, searchWord: '' }) {
    this.businessService
      .getBusinessBox(data.pageCount, data.perPage, data.searchWord)
      .subscribe({
        next: (response) => {
          this.boxes = response.data;
          this.listItems.totalPages = response.paging.totalPages;
          this.listItems.buttonController();
        },
      });
  }

  handleClick(data) {

    this.clickBox.emit(data);
  }

  handleClickEdit(box) {
    this.clickEditBox.emit(box);
  }
}
