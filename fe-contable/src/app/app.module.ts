import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/authInterceptorservice';
import { StorageSessionService } from './services/storage-session.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StorageSessionService,{provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
