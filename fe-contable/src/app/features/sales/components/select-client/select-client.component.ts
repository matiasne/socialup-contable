import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ListClientComponent } from 'src/app/features/clients/components/list-client/list-client.component';
import { Client } from 'src/app/features/clients/models/client';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { SelectedService } from 'src/app/services/global/selected.service';
import { HelperService } from 'src/app/services/helpers.service';
import { StorageSessionService } from 'src/app/services/storage-session.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'socialup-select-client',
  templateUrl: './select-client.component.html',
  styleUrls: ['./select-client.component.scss'],
  providers:[UserService, HelperService,BusinessService, ClientService, ]
})
export class SelectClientComponent implements OnInit {
    public name: string;
    public clients : Array<Client> =[] 
    public client:Client
  constructor(private modalCtrl: ModalController,
    public activateRoute:ActivatedRoute,
    public storageSessionService:StorageSessionService,
    public helperService: HelperService  ,
    public clientService:ClientService,
    public selectedService:SelectedService, 
    public businessService:BusinessService,
    public router:Router,) { }

  ngOnInit() {}

  handleClickClient(client){
  this.modalCtrl.dismiss(client)
  }
}
