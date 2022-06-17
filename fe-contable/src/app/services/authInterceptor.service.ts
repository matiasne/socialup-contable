import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {catchError} from "rxjs/operators"
import { StorageSessionService } from "./storage-session.service";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private storagesessionservice: StorageSessionService) {} 
    
   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
  
      const session = this.storagesessionservice.getSession();
      if(session){
    

         if (session.token) {
            // If we have a token, we set it to the header
            request = request.clone({
               setHeaders: {
                  Authorization: session.token,
                 /* "Access-Control-Allow-Headers":
                  "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method",
                  "Access-Control-Allow-Methods":"*",
               "Access-Control-Allow-Origin":"*"*/}
            });
         }
      }
  
    return next.handle(request).pipe(
        
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
              // redirect user to the logout page
           }
        }
        return throwError(err);
      })
     )
    }

  }


