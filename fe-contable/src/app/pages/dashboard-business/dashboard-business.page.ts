import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../auth/services/session.service';

@Component({
  selector: 'app-dashboard-business',
  templateUrl: './dashboard-business.page.html',
  styleUrls: ['./dashboard-business.page.scss'],
})
export class DashboardBusinessPage implements OnInit {
  constructor(public router: Router, private sessionservice: SessionService) {}

  ngOnInit() {}

  editBusiness() {
    this.router.navigate([
      '/business',
      { business: JSON.stringify(this.sessionservice.getBusiness()) },
    ]);
  }
}
