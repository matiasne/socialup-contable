import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { LoginPage } from "../pages/login/login.page";
import { User } from "../models/user";
import { BaseCRUDService } from "./base-crud.service";
import { StorageSessionService } from "./storage-session.service";
import { Session } from "../models/session";

@Injectable()
export class UserService extends BaseCRUDService{
    public url: string;

    constructor (
        public _http: HttpClient,
        public storageSessionService: StorageSessionService){
            
        super(_http,storageSessionService)
        this.url = GLOBAL.url;
    }

    singnup(email:string,password:string):Observable<any>{ 
              
        let params = {
            email:email,
            password:password
        }  
        
        return this.post(this.url+'login',params)
        
    }

    update(user:User){        
        this.put(this.url+'/user/'+user._id,user).subscribe(
            {
              next:(data)=>{
                this.storageSessionService.updateUser(user)
                console.log(data)
              },
              error:(err)=>{
                console.log(err);
              },
              complete:()=>{
              
              }
            }
          )
    }


    register(name:string,  surname: string, email: string,password: string):Observable<any>{
        let params = {
            email:email,
            password:password,
            surname: surname,
            name: name,            
        }
        return this.post(this.url+'register',params)
    }

    _delete(id):Observable<any>{
        console.log(this.url)
        return this.delete(this.url+'/user/'+id)
    }

}