import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from '../../../shared/services/global';
import { BaseCRUDService } from '../../../shared/services/base-crud.service';
import { HelperService } from '../../../shared/services/helpers.service';
import { Product } from '../models/product';
import { SessionService } from 'src/app/auth/services/session.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseCRUDService {
  public url: string;

  constructor(
    public _http: HttpClient,
    public sessionService: SessionService,
    public helperService: HelperService
  ) {
    super(_http, sessionService);
    this.url = GLOBAL.url + '/product';
  }

  get(id): Observable<any> {
    return super
      .get(this.url + '/' + id)
      .pipe(map((item: any) => item.product));
  }

  update(product: Product): Observable<any> {
    let formData = this.helperService.toFormData(product);

    return this.put(this.url + '/' + product._id, formData);
  }

  add(product: Product): Observable<any> {
    delete product._id;
    let formData = this.helperService.toFormData(product);
    return this.post(this.url, formData);
  }

  _delete(id): Observable<any> {

    return this.delete(this.url + '/' + id);
  }
}
