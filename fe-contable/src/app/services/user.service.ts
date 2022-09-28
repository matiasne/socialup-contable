import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { LoginPage } from '../pages/login/login.page';
import { User } from '../models/user';
import { BaseCRUDService } from './base-crud.service';
import { SessionService } from '../auth/services/session.service';
import { Session } from '../auth/model/session';
import { HelperService } from './helpers.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseCRUDService {
  public url: string;

  constructor(
    public _http: HttpClient,
    public sessionService: SessionService,
    public helperService: HelperService
  ) {
    super(_http, sessionService);
    this.url = GLOBAL.url;
  }

  get(id) {
    return super.get(this.url + '/user/' + id);
  }

  update(user: User) {
    let formData = this.helperService.toFormData(user);
    return this.put(this.url + '/user/' + user._id, formData);
  }

  _delete(id): Observable<any> {
    return this.delete(this.url + '/user/' + id);
  }

  getUserBusiness(pageCount = 1, perPage = 10, searchWord = '') {
    let idUser = this.sessionService.getUserData()?._id;
    if (idUser) {
      return super.get(
        this.url +
          '/user/' +
          idUser +
          '/businesses?pageCount=' +
          pageCount +
          '&perPage=' +
          perPage +
          '&searchWord=' +
          searchWord
      );
    }
  }
}
