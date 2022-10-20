import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { Business } from './features/business/models/business';
import { isTabSwitch } from '@ionic/angular/directives/navigation/stack-utils';
import { NavController } from '@ionic/angular';
import { SessionService } from './auth/services/session.service';
import { AuthService } from './auth/services/auth.service';
import { BusinessService } from './features/business/service/business.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Profile', url: '/form-profile', icon: 'person' },
    {
      title: 'Recuperar Contraseña',
      url: '/form-forgotpassword',
      icon: 'lock-closed',
    },
    {
      title: 'Negocios',
      url: '/select-user-business',
      icon: 'storefront',
    },
    { title: 'Productos', url: '/products', icon: 'grid' },
    { title: 'Clientes', url: '/clients', icon: 'people' },
    { title: 'Ventas', url: '/list-sale', icon: 'receipt' },
    { title: 'Cajas', url: '/list-box', icon: 'wallet' },
  ];

  public showMenu = false;
  public user: User = new User('', '', '', '', '', '', '', '', '');
  public business: Business = new Business('', '', '', '', '', '', '', '');

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private businessService: BusinessService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sessionService.observeSession().subscribe({
      next: (session) => {
        if (session) {
          if (session.user) {
            this.user = User.adapt(session.user);
          }

          if (session.business) {
            //esto es para cuando se reinicia el navegador
            this.business = Business.adapt(session.business);
            this.businessService.loadSelectedBusiness(this.business);
          }
        }

        this.showMenu = this.sessionService.isAuthenticated();
      },
    });

    this.businessService.obsSelectedBusiness().subscribe({
      next: (data: Business) => {
        this.business = data;
      },
    });
  }
  ngOnDestroy() {}

  LogoutSession(): void {
    this.authService.logout();
    window.location.replace('/login');
  }
}
