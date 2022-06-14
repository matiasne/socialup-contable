import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { LoginPage } from "../pages/login/login.page";
import { Business } from "../models/business";
import { BaseCRUDService } from "./base-crud.service";

import { StorageSessionService } from "./storage-session.service";
import { Session } from "../models/session";
import { HelperService } from "./helpers.service";

@Injectable()
export class BusinessService extends BaseCRUDService{
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
        return super.get(this.url+'/business/'+id)
    }

    update(business:Business){         
        let formData =  this.helperService.toFormData(business)
        return this.put(this.url+'/business/'+business._id,formData)
    }

    getUserBusiness(idUser){
      return super.get(this.url+'/user/'+ idUser +'/businesses/')
    }


     register(business:Business):Observable<any>{
        
        delete business._id;
        let formData = this.helperService.toFormData(business)

        return this.post(this.url+'/business',formData)
    }

    _delete(id):Observable<any>{
        return this.delete(this.url+'/business/'+id)
    }

    
}