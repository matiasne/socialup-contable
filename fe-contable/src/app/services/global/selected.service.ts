import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Business } from "src/app/models/business";

@Injectable()
export class SelectedService{ 
    
    private SelectedBusiness:BehaviorSubject<any> = new BehaviorSubject("")

    constructor (){      
        
    }

    public setSelectedBusiness(business:Business){
        this.SelectedBusiness.next(business)
    }

    public obsSelectedBusiness():Observable<any>{
        return this.SelectedBusiness.asObservable()
    }
}