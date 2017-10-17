import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../services/config.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(public config: ConfigService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (
      // inclure dans cette condition les routes qui ne sont pas sensées envoyer un token en entête de requette HTTP
      req.url.includes(`${this.config.API_BASE}${this.config.API_ROUTES.LOGIN}`) ||
      req.url.includes(`${this.config.API_BASE}${this.config.API_ROUTES.PROFILS}`) ||
      req.url.includes(`${this.config.API_BASE}${this.config.API_ROUTES.UTILISATEURS}`)
    ) {
      return next.handle(req.clone({ setHeaders: {'Content-Type': 'application/json'}}));
    } else {
      return next.handle(req.clone({ setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('token') ? window.localStorage.getItem('token') : '',
      }}));
    }
  }
}
