import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../../../shared/services/global';
import { BaseCRUDService } from '../../../shared/services/base-crud.service';
import { HelperService } from '../../../shared/services/helpers.service';
import { SessionService } from 'src/app/auth/services/session.service';
import { map } from 'rxjs/operators';
import { Box } from '../models/box';

@Injectable({ providedIn: 'root' })
export class BoxService extends BaseCRUDService {
  public url: string;

  constructor(
    public _http: HttpClient,
    public sessionService: SessionService,
    public helperService: HelperService
  ) {
    super(_http, sessionService);
    this.url = GLOBAL.url + '/box';
  }

  get(id): Observable<any> {

    return super
      .get(this.url + '/' + id)
      .pipe(map((item: any) => item.data));
  }

  update(box: Box): Observable<any> {
    let formData = this.helperService.toFormData(box);
    return this.put(this.url + '/' + box._id, formData);
  }

  add(box: Box): Observable<any> {
    delete box._id;
    let formData = this.helperService.toFormData(box);
    return this.post(this.url, formData);
  }

  _delete(id): Observable<any> {
    return this.delete(this.url + '/' + id);
  }

  setSelectedBox(boxId:string){
    localStorage.setItem("selectedBoxId",boxId)
  }

  getSelectedBox():string{
    return localStorage.getItem("selectedBoxId");
  }
}
