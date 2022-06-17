import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { LoginPage } from "../pages/login/login.page";
import { User } from "../models/user";
import { StorageSessionService } from "./storage-session.service";
@Injectable()
export class BaseCRUDService{  
    
    constructor (
        public _http: HttpClient,
        public storageSessionService: StorageSessionService
        ){      
        
    }

    get(url):Observable<any>{
 
        let headers = new HttpHeaders()
     
        return this._http.get(url,{headers : headers})
    }

    post(url, body = {}):Observable<any>{

        let headers = new HttpHeaders()
        
        return this._http.post(url,body, {headers : headers})
    }

    put(url,body = {}):Observable<any>{
        let token=  this.storageSessionService.getSession().token
        return this._http.put(url,body)
    }

    delete(url):Observable<any>{
        let token=  this.storageSessionService.getSession().token


        let headers = new HttpHeaders()
        
        return this._http.delete(url, {headers : headers})
    }


}