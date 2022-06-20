import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AfipStorageService {

    private key:string = 'afipToken';

    constructor(){

    }

    public setAfipToken(token:string):void{
        localStorage.setItem(this.key,JSON.stringify(token));
    }
  
    public getAfipToken():string{
        return JSON.parse( localStorage.getItem(this.key) || "");
    }
}