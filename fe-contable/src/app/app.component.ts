import { Component, OnInit } from '@angular/core';
import { Session } from './models/session';
import { StorageSessionService } from './services/storage-session.service';
import { Router } from '@angular/router';
import { User } from './models/user';
import { Business } from './features/business/models/business';
import { SelectedService } from './services/global/selected.service';
import { isTabSwitch } from '@ionic/angular/directives/navigation/stack-utils';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers:[]
})
export class AppComponent implements OnInit {
  
 

  public appPages = [
    { title: 'Business', url: '/business', icon: 'heart' },
    { title: 'Profile', url: '/form-profile', icon: 'archive' },
    { title: 'Recuperar Contraseña', url: '/form-forgotpassword', icon: 'trash' },
    { title: 'Lista de Empresas', url: '/select-user-business', icon: 'warning' },
    { title: 'Producto', url: '/product', icon: 'warning' },
    { title: 'Lista Producto', url: '/products', icon: 'mail' },
    { title: 'Cliente', url: '/create-client', icon: 'mail' },
    { title: 'Lista Cliente', url: '/list-client', icon: 'mail' },
    { title: 'Venta', url: '/form-sale', icon: 'mail' },
    { title: 'Lista de Ventas', url: '/list-sale', icon: 'mail' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  public showMenu = false;
  public user:User
  public business:Business

  constructor(
    private storageSessionService:StorageSessionService,
    private router:Router,
    private selectedService:SelectedService,
    

    ){
      
      this.user=new User('','','','','','','','','')
      this.business = new Business('','','','','','','','');
      let session = this.storageSessionService.getSession();     
    
      this.storageSessionService.obsLoguedIn().subscribe({
        next:(value)=>{
          this.user = this.storageSessionService.getUser()
          this.showMenu = value;
        },
      })
    
      if(session){
        // this.router.navigate([this.storageSessionService.loguedRoute]);
        this.storageSessionService.isLoguedIn.next(true)
        this.user = User.adapt(session.user)
        if(session.business){
          //esto es para cuando se reinicia el navegador
          this.business = Business.adapt(session.business)
          this.selectedService.setSelectedBusiness(this.business)
          
        }       
        this.router.navigate(['/dashboard-business']) 
      }else{
      
        this.storageSessionService.isLoguedIn.next(false)
        this.router.navigate([this.storageSessionService.unloguedRoute]);
      }

      this.selectedService.obsSelectedBusiness().subscribe({
        next:(data:any)=>{
          //esto es para cuando hay un cambio de business dentro de la app
          this.business=data
        }
      })
    
  }

  ngOnInit() {

  }
  ngOnDestroy(){

  }


  LogoutSession():void{
   
    this.storageSessionService.logoutSession();
    this.selectedService.setSelectedBusiness(new Business('','','','','','','',''))
    window.location.replace('/login')
   
}

} 