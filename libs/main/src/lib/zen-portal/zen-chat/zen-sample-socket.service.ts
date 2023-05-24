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

    // sets the namespace of the socket
    this.ioSocket.nsp = '/sample';
  }
}
