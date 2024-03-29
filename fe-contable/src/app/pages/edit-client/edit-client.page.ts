import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Business } from 'src/app/features/business/models/business';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { Client } from 'src/app/features/clients/models/client';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { ToastType } from 'src/app/models/toast.enum';
import { HelperService } from 'src/app/services/helpers.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.page.html',
  styleUrls: ['./edit-client.page.scss'],
})
export class EditClientPage implements OnInit {
  public clientId: string = '';
  public obsBusiness: any;

  constructor(
    public clientService: ClientService,
    public toastService: ToastService,
    public businessService: BusinessService,
    public activateRoute: ActivatedRoute,
    public router: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    console.log(this.activateRoute.snapshot.params.clientId);
    if (this.activateRoute.snapshot.params.clientId) {
      this.clientId = this.activateRoute.snapshot.params.clientId;
    }
  }

  submit(data) {
    this.router.navigateByUrl('/clients');
  }
}
