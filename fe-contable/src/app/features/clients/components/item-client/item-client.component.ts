import { Component, Input, OnInit } from '@angular/core';
import { Client } from 'src/app/features/clients/models/client';

@Component({
  selector: 'socialup-item-client',
  templateUrl: './item-client.component.html',
  styleUrls: ['./item-client.component.scss'],
})
export class ItemClientComponent implements OnInit {

  @Input() client:Client;

  constructor() { }

  ngOnInit() {}

}
