import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'protractor';
import { Business } from 'src/app/features/business/models/business';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { UserService } from 'src/app/services/user.service';
import {StorageSessionService} from 'src/app/services/storage-session.service'
import { GLOBAL } from 'src/app/services/global';
import { HelperService } from 'src/app/services/helpers.service';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { Client } from 'src/app/features/clients/models/client';
import { SelectedService } from 'src/app/services/global/selected.service';
import { ToastService } from 'src/app/services/toast.service';
import { ToastType } from 'src/app/models/toast.enum';
import { SpinnerDialog } from '@awesome-cordova-plugins/spinner-dialog/ngx';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.page.html',
  styleUrls: ['./list-client.page.scss'],
  providers:[UserService, HelperService,BusinessService, ClientService,SpinnerDialog]
})



export class ListClientPage implements OnInit {
  constructor(
    public activateRoute:ActivatedRoute,
    public storageSessionService:StorageSessionService,
    public helperService: HelperService  ,
    public clientService:ClientService,
    public selectedService:SelectedService, 
    public businessService:BusinessService,
    public router:Router,
    public toastService: ToastService,

  ) { 
    
  }

  ngOnInit() {
      
  }
    
  handleClickClient(client){
    console.log(client)
  }
      
                          
}
