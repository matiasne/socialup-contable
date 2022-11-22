import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../../../shared/services/global';
import { BaseCRUDService } from '../../../shared/services/base-crud.service';
import { HelperService } from '../../../shared/services/helpers.service';
import { Client } from '../models/client';
import { SessionService } from 'src/app/auth/services/session.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClientService extends BaseCRUDService {
  public url: string;

  constructor(
    public _http: HttpClient,
    public sessionService: SessionService,
    public helperService: HelperService
  ) {
    super(_http, sessionService);
    this.url = GLOBAL.url + '/client';
  }

  get(id): Observable<any> {
    return super.get(this.url + '/' + id).pipe(map((resp: any) => resp.client));
  }

  update(client: Client): Observable<any> {
    let formData = this.helperService.toFormData(client);
    return this.put(this.url + '/' + client._id, formData);
  }

  add(client: Client): Observable<any> {
    delete client._id;
    let formData = this.helperService.toFormData(client);
    console.log(formData);
    console.log(this.url);
    return this.post(this.url, formData);
  }

  _delete(id): Observable<any> {
    return this.delete(this.url + '/' + id);
  }
}
