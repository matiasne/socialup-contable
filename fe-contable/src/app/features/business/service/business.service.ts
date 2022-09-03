import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { GLOBAL } from "../../../services/global";
import { Business } from "../models/business";
import { BaseCRUDService } from "../../../services/base-crud.service";
import { HelperService } from "../../../services/helpers.service";
import { SessionService } from "src/app/auth/services/session.service";

@Injectable({
    providedIn: 'root'
})
export class BusinessService extends BaseCRUDService {
    public url: string;

    public SelectedBusiness: BehaviorSubject<Business> = new BehaviorSubject(new Business('', '', '', '', '', '', '', ''))


    constructor(
        public _http: HttpClient,
        public sessionService: SessionService,
        public helperService: HelperService
    ) {
        super(_http, sessionService)
        this.url = GLOBAL.url + '/business';
        console.log("AAAA")
    }

    public setSelectedBusiness(business: Business) {

        this.sessionService.updateBusiness(business);
        this.SelectedBusiness.next(business)
    }

    public loadSelectedBusiness(business: Business) {

        this.SelectedBusiness.next(business)

    }

    public getBusinessId() {

        return this.SelectedBusiness.value._id
    }

    public obsSelectedBusiness(): Observable<any> {
        return this.SelectedBusiness.asObservable()
    }

    get(id): Observable<any> {
        return super.get(this.url + '/' + id)
    }

    update(business: Business): Observable<any> {
        let formData = this.helperService.toFormData(business)
        return this.put(this.url + business._id, formData)
    }

    getBusinessProduct(pageCount = 1, perPage = 10, searchWord = ""): Observable<any> {
        let idBusiness = this.SelectedBusiness.value._id
        
        return super.get(this.url + '/' + idBusiness + '/products?pageCount=' + pageCount + '&perPage=' + perPage + '&searchWord=' + searchWord)
    }
    getBusinessSales(pageCount = 1, perPage = 10, searchWord = ""): Observable<any> {
        let idBusiness = this.SelectedBusiness.value._id
        return super.get(this.url + '/' + idBusiness + '/sales?pageCount=' + pageCount + '&perPage=' + perPage + '&searchWord=' + searchWord)
    }

    getBusinessClient(pageCount = 1, perPage = 10, searchWord = ""): Observable<any> {
        let idBusiness = this.SelectedBusiness.value._id
        console.log(this.SelectedBusiness.value)
        return super.get(this.url + '/' + idBusiness + '/clients?pageCount=' + pageCount + '&perPage=' + perPage + '&searchWord=' + searchWord)
    }

    register(business: Business): Observable<any> {
        delete business._id;
        let formData = this.helperService.toFormData(business);
        return this.post(this.url, formData)
    }

    _delete(id): Observable<any> {
        return this.delete(this.url + '/' + id)
    }


}