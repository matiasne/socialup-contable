import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';
import { Business } from 'src/app/features/business/models/business';
import { Client } from 'src/app/features/clients/models/client';
import { ToastType } from 'src/app/models/toast.enum';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { SelectedService } from 'src/app/services/global/selected.service';
import { HelperService } from 'src/app/services/helpers.service';
import { StorageSessionService } from 'src/app/services/storage-session.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'socialup-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss'],
})
export class ListClientComponent implements OnInit {
  @ViewChild('listItem') listItems: ListItemsComponent;
  @Output() clickClient = new EventEmitter<Client>();

  public clients: Array<Client> = [];
  private business: Business;
  public id: any;
  private obsBusiness: any;
  public totalPages: number;
  constructor(
    public activateRoute: ActivatedRoute,
    public storageSessionService: StorageSessionService,
    public helperService: HelperService,
    public clientService: ClientService,
    public selectedService: SelectedService,
    public businessService: BusinessService,
    public router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
      next: (data: any) => {
        this.business = data;
        this.refreshClients({ perPage: 10, pageCount: 1, searchWord: '' });
      },
    });

    if (!this.business) {
      this.router.navigate(['/list-business']);
      this.toastService.show(
        ToastType.warning,
        'Necesita ingresar con una empresa'
      );
    }
  }

  refreshClients(data: any) {
    if (this.business._id) {
      this.businessService
        .getBusinessClient(
          this.business._id,
          data.pageCount,
          data.perPage,
          data.searchWord
        )
        .subscribe({
          next: (response) => {
            this.clients = response.data;
            this.listItems.totalPages = response.paging.totalPages;
            this.listItems.buttonController();
          },
        });
    }
  }
  click(client) {
    this.clickClient.emit(client);
  }
  handleClickClient(client) {
    this.router.navigate(['/edit-client', { client: JSON.stringify(client) }]);
  }
}
