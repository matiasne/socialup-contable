import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SelectedService } from 'src/app/services/global/selected.service';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class unselectedBusinessRedirectGuard implements CanActivate {
  constructor(
    private sessionService: SessionService, 
    private router: Router,
    private selectedService:SelectedService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.sessionService.isAuthenticated()) {
        if(this.selectedService.SelectedBusiness.value._id !="")
            return true;
        else    
            this.router.navigateByUrl('/list-business');
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
