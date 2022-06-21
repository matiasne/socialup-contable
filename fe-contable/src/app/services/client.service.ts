import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { BaseCRUDService } from "./base-crud.service";
import { StorageSessionService } from "./storage-session.service";
import { HelperService } from "./helpers.service";
import { Client } from "../models/client";

@Injectable()
export class ClientService extends BaseCRUDService{
  getBusinessClient(_id: string) {
    throw new Error('Method not implemented.');
  }
    public url: string;

    constructor (
        public _http: HttpClient,
        public storageSessionService: StorageSessionService,
        public helperService: HelperService    
    ){
            
        super(_http,storageSessionService)
        this.url = GLOBAL.url+'/client';
    }
    
    get(id):Observable<any>{       
        return super.get(this.url+'/'+id)
    }

    update(client:Client):Observable<any>{           
        let formData =  this.helperService.toFormData(client)
        return this.put(this.url+'/'+client._id,formData)
    }


     add(client:Client):Observable<any>{
        delete client._id;
        let formData = this.helperService.toFormData(client)
        return this.post(this.url,formData)
    }

    _delete(id):Observable<any>{
        return this.delete(this.url+'/'+id)
    }

    
}