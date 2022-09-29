import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Session } from 'protractor';
import { Business } from 'src/app/features/business/models/business';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { UserService } from 'src/app/services/user.service';
import { HelperService } from 'src/app/services/helpers.service';
import { User } from 'src/app/models/user';
import { ListBusinessComponent } from 'src/app/features/business/components/list-business/list-business.component';

@Component({
  selector: 'app-select-user-business',
  templateUrl: './select-user-business.page.html',
  styleUrls: ['./select-user-business.page.scss'],
})
export class SelectUserBusinessPage implements OnInit {
  @ViewChild('list') listItems: ListBusinessComponent;
  public businesses: Array<Business> = [];
  public user: User;
  public session: Session;
  public totalPages: number;
  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    public helperService: HelperService,
    public businessService: BusinessService,
    public userService: UserService
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if ((val.url = '/select-user-business')) {
          this.listItems.refreshBusinesses();
        }
      }
    });
  }

  ngOnInit() {}

  handleClickBusiness(business) {
    this.businessService.setSelectedBusiness(business);

    this.router.navigate(['/dashboard-business']);
  }

  botonprueba() {
    this.router.navigate(['/business']);
  }
}
