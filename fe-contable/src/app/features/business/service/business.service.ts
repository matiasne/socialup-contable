import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "../../../services/global";
import { LoginPage } from "../../../pages/login/login.page";
import { Business } from "../models/business";
import { BaseCRUDService } from "../../../services/base-crud.service";

import { StorageSessionService } from "../../../services/storage-session.service";
import { Session } from "../../../models/session";
import { HelperService } from "../../../services/helpers.service";

@Injectable()
export class BusinessService extends BaseCRUDService{
    public url: string;

    constructor (
        public _http: HttpClient,
        public storageSessionService: StorageSessionService,
        public helperService: HelperService    
    ){
        super(_http,storageSessionService)
        this.url = GLOBAL.url+'/business';
    }

    get(id):Observable<any>{       
        return super.get(this.url+'/'+id)
    }

    update(business:Business):Observable<any>{         
        let formData =  this.helperService.toFormData(business)
        return this.put(this.url+business._id,formData)
    }   

    getBusinessProduct(idBusiness,pageCount=1,perPage=10, searchWord=""):Observable<any>{

        return super.get(this.url+'/'+ idBusiness +'/products?pageCount='+ pageCount + '&perPage='+perPage +'&searchWord='+searchWord)
    }

    getBusinessClient(idBusiness,pageCount=1,perPage=10, searchWord=""):Observable<any>{
        return super.get(this.url+'/'+ idBusiness +'/clients?pageCount='+ pageCount + '&perPage='+perPage +'&searchWord='+searchWord)      
    }


    register(business:Business):Observable<any>{        
        delete business._id;
        let formData = this.helperService.toFormData(business);
        return this.post(this.url,formData)
    }

    _delete(id):Observable<any>{
        return this.delete(this.url+'/'+id)
    }

    
}