import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../services/config.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(public config: ConfigService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).catch((errorResponse: HttpErrorResponse) => {
      if (errorResponse.status === 404) {
        // TODO: Gérer l'erreur
      }
      return Observable.throw(errorResponse);
    });
  }
}
