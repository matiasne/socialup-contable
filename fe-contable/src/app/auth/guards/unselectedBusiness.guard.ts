import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { BusinessService } from 'src/app/features/business/service/business.service';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class unselectedBusinessRedirectGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private businessService: BusinessService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.sessionService.isAuthenticated()) {
      if (this.businessService.SelectedBusiness.value._id != '') return true;
      else this.router.navigateByUrl('/select-user-business');
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
