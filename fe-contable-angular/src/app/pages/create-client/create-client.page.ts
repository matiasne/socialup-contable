import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business } from 'src/app/features/business/models/business';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.page.html',
  styleUrls: ['./create-client.page.scss'],
})
export class CreateClientPage implements OnInit {
  public business: Business;
  constructor(public router: Router) {}

  ngOnInit() {}

  submit(data) {
    this.router.navigateByUrl('/clients');
  }
}
