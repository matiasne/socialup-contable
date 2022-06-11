import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { LoginPage } from "../pages/login/login.page";
import { User } from "../models/user";
import { BaseCRUDService } from "./base-crud.service";
import { StorageSessionService } from "./storage-session.service";
import { Session } from "../models/session";
import { HelperService } from "./helpers.service";

@Injectable()
export class UserService extends BaseCRUDService{
    public url: string;

    constructor (
        public _http: HttpClient,
        public storageSessionService: StorageSessionService,
        public helperService: HelperService    
    ){
            
        super(_http,storageSessionService)
        this.url = GLOBAL.url;
    }

    get(id){
        return super.get(this.url+'/user/'+id)
    }

    singnup(email:string,password:string):Observable<any>{ 
              
        let params = {
            email:email,
            password:password
        }  
        
        return this.post(this.url+'/login',params)
        
    }

     update(user:User){   
        
        let formData =  this.helperService.toFormData(user)
        
       return this.put(this.url+'/user/'+user._id,formData)
    }


    register(name:string,  surname: string, email: string,password: string):Observable<any>{
        let params = {
            email:email,
            password:password,
            surname: surname,
            name: name,            
        }
        return this.post(this.url+'/register',params)
    }

    _delete(id):Observable<any>{
        return this.delete(this.url+'/user/'+id)
    }

    resetPassword(email:string):Observable<any>{
        let params = {
            email : email,
        }
        return this.post(this.url+'/forgot-password'+params)        
    }

    
}