import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ls from 'localstorage-slim';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const bearerJwt = ls.get('token');
    if (bearerJwt) req.headers.set('bearer', bearerJwt as string);

    return next.handle(req);
  }
}
