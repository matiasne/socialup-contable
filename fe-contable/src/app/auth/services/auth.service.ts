import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';
import { GLOBAL } from '../../services/global';
import { User } from 'src/app/models/user';
import { Session } from '../model/session';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public url: string = GLOBAL.url;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {}

  authenticate(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let params = {
        email: email,
        password: password,
      };
      return this.http.post(this.url + '/login', params).subscribe({
        next: (data: any) => {
          let user: User = new User(
            data.user._id,
            data.user.name,
            data.user.surname,
            data.user.email,
            data.user.role,
            data.user.image,
            data.user.gender,
            data.user.address,
            data.user.phone
          );

          let s = new Session(data.token, user);
          let session = this.sessionService.setSession(s);
          resolve(session);
        },
        error: (err: any) => {
          console.log(err);
          reject(err);
        },
      });
    });
  }

  register(
    name: string,
    surname: string,
    email: string,
    password: string
  ): Observable<any> {
    let params = {
      email: email,
      password: password,
      surname: surname,
      name: name,
    };
    return this.http.post(this.url + '/register', params);
  }

  logout() {
    this.sessionService.removeSession();
  }

  resetPassword(email: string): Observable<any> {
    let params = {
      email: email,
    };
    return this.http.post(this.url + '/forgot-password', params);
  }
}
