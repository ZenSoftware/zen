import { Injectable } from '@angular/core';
import { tokenVar } from '@zen/auth';
import { Environment } from '@zen/common';
import { Socket } from 'ngx-socket-io';

@Injectable({ providedIn: 'root' })
export class ZenSocketService extends Socket {
  constructor(env: Environment) {
    super({
      url: env.url.socketio as string,
      options: {
        extraHeaders: {
          Authorization: 'Bearer ' + tokenVar(),
        },
      },
    });
  }
}
