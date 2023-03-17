import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { LoginPage } from '../../pages/login/login.page';
import { User } from '../../models/user';
import { SessionService } from '../../auth/services/session.service';
@Injectable()
export class BaseCRUDService {
  constructor(
    public _http: HttpClient,
    public storageSessionService: SessionService
  ) {}

  get(url): Observable<any> {
    return this._http.get(url);
  }

  post(url, body = {}): Observable<any> {
    return this._http.post(url, body);
  }

  put(url, body = {}): Observable<any> {
    return this._http.put(url, body);
  }

  delete(url): Observable<any> {
    return this._http.delete(url);
  }
}
