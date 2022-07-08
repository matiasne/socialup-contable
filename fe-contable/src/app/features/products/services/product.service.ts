import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "../../../services/global";
import { BaseCRUDService } from "../../../services/base-crud.service";
import { StorageSessionService } from "../../../services/storage-session.service";
import { HelperService } from "../../../services/helpers.service";
import { Product } from "../models/product";

@Injectable()
export class ProductService extends BaseCRUDService{
    public url: string;

    constructor (
        public _http: HttpClient,
        public storageSessionService: StorageSessionService,
        public helperService: HelperService    
    ){
        super(_http,storageSessionService)
        this.url = GLOBAL.url+'/product';
    }
   
    get(id):Observable<any>{       
        return super.get(this.url+'/'+id)
    }

    update(product:Product):Observable<any>{           
        let formData =  this.helperService.toFormData(product)
        return this.put(this.url+'/'+product._id,formData)
    }


     add(product:Product):Observable<any>{
        delete product._id;
        let formData = this.helperService.toFormData(product)
        return this.post(this.url,formData)
    }

    _delete(id):Observable<any>{
        return this.delete(this.url+'/'+id)
    }

    
}