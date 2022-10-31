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
import { Business } from 'src/app/features/business/models/business';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ProductService } from 'src/app/features/products/services/product.service';
import { HelperService } from 'src/app/shared/services/helpers.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ListItemsComponent } from 'src/app/shared/components/list-items/list-items.component';
import { Box } from '../../models/box';

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
  private business: Business;
  public id: any;
  private obsBusiness: any;
  public totalPages: number;

  constructor(
    public activateRoute: ActivatedRoute,
    public sessionService: SessionService,
    public helperService: HelperService,
    public businessService: BusinessService,
    public router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.refreshBoxes();
  }

  refreshBoxes(data: any = { perPage: 10, pageCount: 1, searchWord: '' }) {
    this.businessService
      .getBusinessBox(data.pageCount, data.perPage, data.searchWord)
      .subscribe({
        next: (response) => {
          console.log(response);
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
