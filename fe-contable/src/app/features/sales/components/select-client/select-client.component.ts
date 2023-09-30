import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { FormClientComponent } from 'src/app/features/clients/components/form-client/form-client.component';
import { ListClientComponent } from 'src/app/features/clients/components/list-client/list-client.component';
import { ModalFormClientComponent } from 'src/app/features/clients/components/modal-form-client/modal-form-client.component';
import { Client } from 'src/app/features/clients/models/client';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { HelperService } from 'src/app/shared/services/helpers.service';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'socialup-select-client',
  templateUrl: './select-client.component.html',
  styleUrls: ['./select-client.component.scss'],
})
export class SelectClientComponent implements OnInit {
  public name: string;
  public clients: Array<Client> = [];
  public client: Client;
  constructor(
    private modalCtrl: ModalController,
    public activateRoute: ActivatedRoute,
    public helperService: HelperService,
    public clientService: ClientService,
    public businessService: BusinessService,
    public router: Router
  ) {}

  ngOnInit() {}

  handleClick(client) {

    this.modalCtrl.dismiss(client, '', 'select');
  }

  async openModalNewClient() {
    const modal = await this.modalCtrl.create({
      id: '1',
      component: ModalFormClientComponent,
    });
    modal.present();

    // const { data, role } = await modal.onWillDismiss();
    const { data, role } = await modal.onWillDismiss();

    if (data) {
      this.handleClick(data);
    }
  }
}
