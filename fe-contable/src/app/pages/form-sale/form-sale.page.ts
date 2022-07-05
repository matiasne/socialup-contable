import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { ClientService } from 'src/app/features/clients/services/client.service';
import { HelperService } from 'src/app/services/helpers.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-sale',
  templateUrl: './form-sale.page.html',
  styleUrls: ['./form-sale.page.scss'],
  providers:[UserService, HelperService,BusinessService, ClientService, ]
})
export class FormSalePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
