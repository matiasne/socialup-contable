import { Component, OnInit } from '@angular/core';
import { Session } from './models/session';
import { StorageSessionService } from './services/storage-session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers:[StorageSessionService]
})
export class AppComponent implements OnInit {
  
  public appPages = [
    { title: 'Login', url: '/login', icon: 'mail' },
    { title: 'Register', url: '/register', icon: 'paper-plane' },
    { title: 'Business', url: '/business', icon: 'heart' },
    { title: 'Profile', url: '/form-profile', icon: 'archive' },
    { title: 'Recuperar Contraseña', url: '/form-forgotpassword', icon: 'trash' },
    { title: 'Lista de Empresas', url: '/list-business', icon: 'warning' },
    { title: 'Producto', url: '/products', icon: 'warning' },
    { title: 'Lista Producto', url: '/list-product', icon: 'mail' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  public showMenu = false;

  constructor(
    private storageSessionService:StorageSessionService,
    private router:Router
    ){
      

      this.storageSessionService.loadSession();     

  }

  ngOnInit() {
    this.storageSessionService.obsLoguedIn().subscribe({
      next:(value)=>{
        this.showMenu = value;
      },
    })
  }

  LogoutSession():void{
    this.storageSessionService.logoutSession();
    
}
}