import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Business } from 'src/app/features/business/models/business';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { Client } from 'src/app/features/clients/models/client';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { ToastType } from 'src/app/models/toast.enum';
import { SelectedService } from 'src/app/services/global/selected.service';
import { HelperService } from 'src/app/services/helpers.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.page.html',
  styleUrls: ['./edit-client.page.scss'],
  providers:[ClientService,HelperService, BusinessService  ]
})
export class EditClientPage implements OnInit {

  public client:Client;
  public business: Business;
  public obsBusiness: any

  constructor(
    public clientService: ClientService,
    public toastService: ToastService,
    public businessService: BusinessService,
    public activateRoute: ActivatedRoute,
    public selectedService: SelectedService,
    public router: Router,
    public alertController: AlertController,

  ) {

    this.client = new Client ('','','','','','','','','','','','')

    this.obsBusiness = this.selectedService.obsSelectedBusiness().subscribe({
      next: (data: any) => {
        this.business = data
        this.client.idBusiness = this.business._id;
      }
    })
   
   }

  ngOnInit() {
    this.client = Client.adapt(JSON.parse(this.activateRoute.snapshot.paramMap.get('client')))
    console.log(this.client._id)
  }

  submit(data){
 
  }

  



}
