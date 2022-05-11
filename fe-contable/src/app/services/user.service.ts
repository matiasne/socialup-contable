import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { LoginPage } from "../pages/login/login.page";
@Injectable()
export class UserService{
    public url: string;

    constructor (private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    singnup(email:string,password:string){
        
        let params = {
            email:email,
            password:password
        }

        let headers = new HttpHeaders()
           
            headers.set('Contenent-Type', 'application/json')
            headers.set('Access-Control-Allow-Origin','*')
         
            
        
        
        return this._http.post(this.url+'login',params, {headers : headers})
        
    }

    register(name:string,  surname: string, email: string,password: string){
        let params = {
            email:email,
            password:password,
            surname: surname,
            name: name,
            
        }

        let headers = new HttpHeaders()
           
            headers.set('Contenent-Type', 'application/json')
            headers.set('Access-Control-Allow-Origin','*')

            return this._http.post(this.url+'register',params, {headers : headers})
    }
}