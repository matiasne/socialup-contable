import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Business } from "../models/business";
import { Session } from "../models/session";
import { User } from "../models/user";

@Injectable()
export class StorageSessionService{

  public loguedRoute = '/list-business'
  public unloguedRoute = '/login'
   
    private loguedRouteBusiness = '/products'
    private unloguedRouteBusiness = '/list-business'
    public isLoguedIn:BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor (private router:Router){
        
    }

    setSession(session:Session):void{
        this.isLoguedIn.next(true)
        localStorage.setItem('session',JSON.stringify(session));
        this.router.navigate([this.loguedRoute]);        
    }

    getSession():Session{
       return JSON.parse( localStorage.getItem('session'));
    }

    

    updateUser(user:any){
      let storagedSession = this.getSession();
      let newSession = new Session(storagedSession.token, user,storagedSession.business)
      this.setSession(newSession)
    }

    getUser():User{
      let sessionData = JSON.parse( localStorage.getItem('session'));  
      let user=new User('','','','','','','','','');   
      if(sessionData){
        user = User.adapt(sessionData.user);             
      }
      return user;      
    }

    updateBusiness(business:Business){
      let storagedSession = this.getSession();
      let newSession = new Session(storagedSession.token, storagedSession.user, business)
      this.setSession(newSession)
    }

    getBusiness(){
      let sessionData = JSON.parse( localStorage.getItem('session'));  
      let business=new Business('','','','','','','','');   
      if(sessionData){
        business = Business.adapt(sessionData.business);             
      }
      return business;
    }

    
    

    logoutSession():void{
      localStorage.removeItem('session');
      
      this.isLoguedIn.next(false)
    }

    obsLoguedIn():Observable<boolean>{
      return this.isLoguedIn.asObservable()
    }
}   