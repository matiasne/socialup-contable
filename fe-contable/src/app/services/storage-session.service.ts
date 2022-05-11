import { Injectable } from "@angular/core";
import { Session } from "../models/session";

@Injectable()
export class StorageSessionService{

    constructor (){
        
    }

    setSession(session:Session):void{
        localStorage.setItem('session',JSON.stringify(session));
    }

    getSession():Session{
        let session:Session = JSON.parse( localStorage.getItem('session'));
        return session;
    }

    loadSession(){

    }

    logoutSession():void{
        localStorage.removeItem('session');
    }
}   