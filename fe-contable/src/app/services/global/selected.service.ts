import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionService } from "src/app/auth/services/session.service";
import { Business } from "src/app/features/business/models/business";
import { Client } from "src/app/features/clients/models/client";

@Injectable({ providedIn: 'root' })
export class SelectedService{ 
    
    public SelectedBusiness:BehaviorSubject<Business> = new BehaviorSubject(new Business('','','','','','','',''))
    
    constructor (private sessionService:SessionService){      
        
    }

    public setSelectedBusiness(business:Business){
        
        this.sessionService.updateBusiness(business);
        this.SelectedBusiness.next(business)
    }

    public obsSelectedBusiness():Observable<any>{
        return this.SelectedBusiness.asObservable()
    }

}