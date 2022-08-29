import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { Business } from './features/business/models/business';
import { SelectedService } from './services/global/selected.service';
import { isTabSwitch } from '@ionic/angular/directives/navigation/stack-utils';
import { NavController } from '@ionic/angular';
import { SessionService } from './auth/services/session.service';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Business', url: '/business', icon: 'heart' },
    { title: 'Profile', url: '/form-profile', icon: 'archive' },
    {
      title: 'Recuperar Contraseña',
      url: '/form-forgotpassword',
      icon: 'trash',
    },
    {
      title: 'Lista de Empresas',
      url: '/select-user-business',
      icon: 'warning',
    },
    { title: 'Producto', url: '/product', icon: 'warning' },
    { title: 'Lista Producto', url: '/products', icon: 'mail' },
    { title: 'Cliente', url: '/create-client', icon: 'mail' },
    { title: 'Lista Cliente', url: '/list-client', icon: 'mail' },
    { title: 'Venta', url: '/form-sale', icon: 'mail' },
    { title: 'Lista de Ventas', url: '/list-sale', icon: 'mail' },
  ];

  public showMenu = false;
  public user: User = new User('', '', '', '', '', '', '', '', '');
  public business: Business = new Business('', '', '', '', '', '', '', '');

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private selectedService: SelectedService,
    private router: Router
  ) {
    
  }

  ngOnInit() {

    this.sessionService.observeSession().subscribe({
      next: (session) => {
        console.log(session);
        if (session) {
          if (session.user) 
            this.user = User.adapt(session.user);

          if (session.business && session.business) {
              //esto es para cuando se reinicia el navegador
              this.business = Business.adapt(session.business);
              this.selectedService.setSelectedBusiness(this.business);
            
          }
        }

        this.showMenu = this.sessionService.isAuthenticated();
      },
    });

    this.selectedService.obsSelectedBusiness().subscribe({
      next: (data: Business) => {
        this.business = data;
      },
    });

  }
  ngOnDestroy() {}

  LogoutSession(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
