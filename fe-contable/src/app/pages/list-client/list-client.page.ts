import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ListClientComponent } from 'src/app/features/clients/components/list-client/list-client.component';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.page.html',
  styleUrls: ['./list-client.page.scss'],
  providers: [],
})
export class ListClientPage implements OnInit {
  @ViewChild('listItem') listItems: ListClientComponent;

  constructor(public router: Router) {}

  ngOnInit() {
    console.log(this.listItems)
  }

  ngAfterViewInit() {}

  handleClickClient(client) {
    this.router.navigate(['/edit-client', { client: JSON.stringify(client) }]);
  }
}
