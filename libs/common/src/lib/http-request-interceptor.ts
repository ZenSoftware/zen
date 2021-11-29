import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ls from 'localstorage-slim';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = ls.get('token') as string | undefined;
    if (jwt) req.headers.set('Authorization', 'Bearer ' + jwt);

    return next.handle(req);
  }
}
