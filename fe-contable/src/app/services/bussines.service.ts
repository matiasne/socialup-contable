import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { LoginPage } from "../pages/login/login.page";
import { Bussines } from "../models/bussines";
import { BaseCRUDService } from "./base-crud.service";
import { StorageSessionService } from "./storage-session.service";
import { Session } from "../models/session";
import { HelperService } from "./helpers.service";

@Injectable()
export class BussinesService extends BaseCRUDService{
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
        console.log(id)
        return super.get(this.url+'/bussines/'+id)
    }

    async update(bussines:Bussines){   
        
        let formData = await this.helperService.toFormData(bussines)
        
        this.put(this.url+'/bussines/'+bussines._id,formData).subscribe(
            {
              next:(data)=>{       
               // this.storageSessionService.updateUser(data.bussines)
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


     register(bussines:Bussines):Observable<any>{
        
        let formData = this.helperService.toFormData(bussines)

        return this.post(this.url+'/bussines/',bussines)
    }

    _delete(id):Observable<any>{
        console.log(this.url)
        return this.delete(this.url+'/bussines/'+id)
    }

    
}