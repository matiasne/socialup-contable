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
  selector: 'app-create-client',
  templateUrl: './create-client.page.html',
  styleUrls: ['./create-client.page.scss'],
  providers:[ClientService,HelperService, BusinessService  ]
})
export class CreateClientPage implements OnInit {

  public client:Client;
  public business: Business;
  public obsBusiness: any
  constructor(
    public clientService: ClientService,
    public toastService: ToastService,
    public businessService: BusinessService,
    public activateRoute: ActivatedRoute,
    public router: Router,
    public alertController: AlertController
  ) {
    this.client = new Client ('','','','','','','','','','','','')
   }

  ngOnInit() {
    this.client.idBusiness = this.businessService.getBusinessId();
  }
  
   
  submit(data){
 
  }



}
