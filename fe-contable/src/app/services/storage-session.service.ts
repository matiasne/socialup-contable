import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Session } from "../models/session";
import { User } from "../models/user";

@Injectable()
export class StorageSessionService{

    private loguedRoute = '/form-profile'
    private unloguedRoute = '/login'

    private isLoguedIn:BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor (private router:Router){
        
    }

    setSession(session:Session):void{
        this.isLoguedIn.next(true)
        localStorage.setItem('session',JSON.stringify(session));
        this.router.navigate([this.loguedRoute]);
        
    }

    getSession():Session{
        let session:Session = JSON.parse( localStorage.getItem('session'));
        return session;
    }

    updateUser(user:User){
      let storagedSession = this.getSession();
      let newSession = new Session(storagedSession.token, user)
      this.setSession(newSession)

    }

    getUSer():User{
      let session:Session = JSON.parse( localStorage.getItem('session'));
      return session.user;
  }

    loadSession(){
      let session:Session = JSON.parse( localStorage.getItem('session'));
      if(session){
        this.router.navigate([this.loguedRoute]);
        this.isLoguedIn.next(true)
      }else{
        this.router.navigate([this.unloguedRoute]);
        this.isLoguedIn.next(false)
      }

    }

    logoutSession():void{
      localStorage.removeItem('session');
      this.router.navigate([this.unloguedRoute]);
      this.isLoguedIn.next(false)
    }

    obsLoguedIn():Observable<boolean>{
      return this.isLoguedIn.asObservable()
    }
}   