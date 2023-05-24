import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

import { ZenSampleSocketService } from './zen-sample-socket.service';

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: 'zen-sample-socket',
  templateUrl: 'zen-sample-socket.component.html',
})
export class ZenSampleSocketComponent implements OnDestroy {
  #subs: Subscription[] = [];

  constructor(private socket: ZenSampleSocketService) {
    const sub = socket.fromEvent('msgToClient').subscribe(data => {
      console.log('msgToClient', data);
    });

    this.#subs.push(sub);
  }

  msgToServer() {
    this.socket.emit('msgToServer', { test: 'hello world' });
  }

  ngOnDestroy(): void {
    this.#subs.forEach(sub => sub.unsubscribe());
  }
}
