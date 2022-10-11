import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/features/business/models/business';
import { Client } from 'src/app/features/clients/models/client';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { HelperService } from 'src/app/services/helpers.service';
import { ToastService } from 'src/app/services/toast.service';
import { ListItemsComponent } from 'src/app/shared/components/list-items/list-items.component';
import { SessionService } from 'src/app/auth/services/session.service';

@Component({
  selector: 'socialup-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss'],
})
export class ListClientComponent implements OnInit {
  @ViewChild('listItem') listItems: ListItemsComponent;

  @Input() showEditButton = false;
  @Output() eventClient = new EventEmitter<Client>();
  @Output() clickEditClient = new EventEmitter<Client>();

  public clients: Array<Client> = [];
  public id: any;
  public totalPages: number;
  public obs: any;

  constructor(
    public activateRoute: ActivatedRoute,
    public sessionService: SessionService,
    public helperService: HelperService,
    public clientService: ClientService,
    public businessService: BusinessService,
    public router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.refreshClients();
  }

  refreshClients(data = { perPage: 10, pageCount: 1, searchWord: '' }) {
    this.businessService
      .getBusinessClient(data.pageCount, data.perPage, data.searchWord)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.clients = response.data;
          this.listItems.totalPages = response.paging.totalPages;
          this.listItems.buttonController();
        },
      });
  }

  handleClick(client) {
    this.eventClient.emit(client);
  }

  handleClickEdit(client) {
    this.clickEditClient.emit(client);
  }
}
