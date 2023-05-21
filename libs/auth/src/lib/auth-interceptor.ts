import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Environment } from '@zen/common';

import { token } from './token.signal';

export const authInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const env = inject(Environment);
  const reqHost = new URL(req.url).host;
  const apiHost = new URL(env.url.api).host;
  const gqlHost = new URL(env.url.graphql).host;

  if (token() && (reqHost === apiHost || reqHost === gqlHost)) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token(),
      },
    });

    return next(modifiedReq);
  } else {
    return next(req);
  }
};
