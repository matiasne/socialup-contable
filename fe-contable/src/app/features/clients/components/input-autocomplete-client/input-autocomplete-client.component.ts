import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { BusinessService } from 'src/app/features/business/service/business.service';
import { Client } from '../../models/client';

@Component({
  selector: 'app-input-autocomplete-client',
  templateUrl: './input-autocomplete-client.component.html',
  styleUrls: ['./input-autocomplete-client.component.scss'],
})
export class InputAutocompleteClientComponent implements OnInit {
  // @Output() clients: Array<Client> = [];
  public clients: Array<Client> = [];
  @Output() emitClients = new EventEmitter<any[]>();
  public searchWord = '';
  constructor(public businessService: BusinessService) {}

  ngOnInit() {
    this.businessService.getBusinessClient(0, 0, this.searchWord).subscribe({
      next: (response) => {
        this.clients = response.data;
        this.emitClients.emit(this.clients);
      },
    });
  }
}
