import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Business } from "src/app/features/business/models/business";
import { Client } from "src/app/features/clients/models/client";

@Injectable({ providedIn: 'root' })
export class SelectedService{ 
    
    public SelectedBusiness:BehaviorSubject<any> = new BehaviorSubject("")
    
    constructor (){      
        
    }

    public setSelectedBusiness(business:Business){
        this.SelectedBusiness.next(business)
    }

    public obsSelectedBusiness():Observable<any>{
        return this.SelectedBusiness.asObservable()
    }

}