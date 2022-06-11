import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { BaseCRUDService } from "./base-crud.service";
import { StorageSessionService } from "./storage-session.service";
import { HelperService } from "./helpers.service";
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
        this.url = GLOBAL.url;
    }
    
    getBusinessProducts(idBusiness){
      return super.get(this.url+'/business/'+ idBusiness +'/product/')
    }

    get(id){       
        return super.get(this.url+'/product/'+id)
    }

    update(product:Product){           
      let formData =  this.helperService.toFormData(product)
      this.put(this.url+'/product/'+product,formData).subscribe(
          {
            next:(data)=>{       
              
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


     add(product:Product):Observable<any>{
        delete product._id;
        let formData = this.helperService.toFormData(product)

        return this.post(this.url+'/product',formData)
    }

    _delete(id):Observable<any>{
        console.log(this.url)
        return this.delete(this.url+'/product/'+id)
    }

    
}