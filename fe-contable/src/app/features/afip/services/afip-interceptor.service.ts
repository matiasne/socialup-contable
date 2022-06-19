import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {catchError} from "rxjs/operators";
import { AfipStorageService } from "./afip-storage.service";

@Injectable()
export class AfipInterceptorService implements HttpInterceptor {

   constructor(private sfipStorageservice: AfipStorageService) {} 
    
   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
  
      const token = this.sfipStorageservice.getAfipToken();
      if(token){
         if (token) {
            request = request.clone({
               setHeaders: {
                  'Afip-Auth': token,
               }
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