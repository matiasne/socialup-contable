import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private sessionservice: SessionService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const session = this.sessionservice.getSession();
    if (session) {
      if (session.token) {
        request = request.clone({
          setHeaders: {
            Authorization: session.token,
          },
        });
      }
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
          }
        }
        return throwError(err);
      })
    );
  }
}
