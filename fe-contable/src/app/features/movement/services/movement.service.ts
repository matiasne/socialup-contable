import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../../../shared/services/global';
import { BaseCRUDService } from '../../../shared/services/base-crud.service';
import { HelperService } from '../../../shared/services/helpers.service';
import { SessionService } from 'src/app/auth/services/session.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MovementService extends BaseCRUDService {
    public url: string;

    constructor(
        public _http: HttpClient,
        public sessionService: SessionService,
        public helperService: HelperService
    ) {
        super(_http, sessionService);
        this.url = GLOBAL.url + '/movement';
    }

    getMovement(idBox): Observable<any> {
        console.log(this.url + '/' + idBox)
        return super.get(this.url + '/' + idBox).pipe(map((resp: any) => resp));
    }
}