import { Injectable, inject } from '@angular/core';
import { token } from '@zen/auth';
import { Environment } from '@zen/common';
import { Socket } from 'ngx-socket-io';

@Injectable({ providedIn: 'root' })
export class ZenSampleSocketService extends Socket {
  constructor() {
    super({
      url: inject(Environment).url.socketio as string,
      options: {
        extraHeaders: {
          Authorization: 'Bearer ' + token(),
        },
      },
    });

    this.ioSocket.nsp = '/sample';
  }
}
