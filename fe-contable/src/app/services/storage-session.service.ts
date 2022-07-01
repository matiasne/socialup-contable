import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Business } from "../features/business/models/business";
import { Session } from "../models/session";
import { User } from "../models/user";

@Injectable({ providedIn: 'root' })
export class StorageSessionService{

  public loguedRoute = '/select-user-business'
  public unloguedRoute = '/login'
   
    private loguedRouteBusiness = '/products' // guardas!!!
    private unloguedRouteBusiness = '/list-business' //guardas!!
    public isLoguedIn:BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor (private router:Router){
        
    }

    setSession(session:Session):void{
        console.log(this.isLoguedIn.getValue())
        this.isLoguedIn.next(true)
        console.log(this.isLoguedIn.getValue())
        localStorage.setItem('session',JSON.stringify(session));
        this.router.navigate([this.loguedRoute]);        
    }

    getSession():Session{
        let session:Session = JSON.parse( localStorage.getItem('session'));
        return session;
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