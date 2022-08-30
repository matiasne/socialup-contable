import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SessionService } from "../services/session.service";

@Injectable({
    providedIn: "root"
})
export class isAuthRedirectGuard implements CanActivate {
    constructor(private sessionService: SessionService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.sessionService.isAuthenticated()) {
            this.router.navigateByUrl("/select-user-business");
            return false;
        }
        return true;
    }
}