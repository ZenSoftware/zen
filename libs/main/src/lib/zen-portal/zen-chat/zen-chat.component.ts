import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

import { ZenSocketService } from './zen-socket.service';

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: 'zen-chat',
  templateUrl: 'zen-chat.component.html',
})
export class ZenChatComponent implements OnDestroy {
  #subs: Subscription[] = [];

  constructor(private socket: ZenSocketService) {
    const sub = socket.fromEvent('msgToClient').subscribe(data => {
      console.log('fromEvent', data);
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
