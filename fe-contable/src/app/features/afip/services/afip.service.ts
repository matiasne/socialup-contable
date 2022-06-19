import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCRUDService } from 'src/app/services/base-crud.service';
import { GLOBAL } from 'src/app/services/global';

@Injectable({
  providedIn: 'root'
})
export class AfipService extends BaseCRUDService{

  public url: string;

  constructor(
    public _http: HttpClient,
  ) {
    super(_http)
    this.url = GLOBAL.url+'/afip';
  }

  connect(email:string,password:string){
    let params = {
      email:email,
      password:password
    }
    return this.post(this.url+'/connect',params)
  }
}
