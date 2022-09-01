import { Component, Input, OnInit } from '@angular/core';
import { Business } from 'src/app/features/business/models/business';

@Component({
  selector: 'app-item-business',
  templateUrl: './item-business.component.html',
  styleUrls: ['./item-business.component.scss'],
})
export class ItemBusinessComponent implements OnInit {

  @Input() business: Business;

  constructor() { }

  ngOnInit() { }

}
