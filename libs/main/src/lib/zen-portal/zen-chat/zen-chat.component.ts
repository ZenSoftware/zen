import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { ZenSocketService } from './zen-socket.service';

@Component({
  standalone: true,
  imports: [MatButtonModule],
  selector: 'zen-chat',
  templateUrl: 'zen-chat.component.html',
})
export class ZenChatComponent implements OnInit, OnDestroy {
  constructor(private socket: ZenSocketService) {}

  ngOnInit(): void {
    this.socket.on('msgToClient', this.msgToClient);
  }

  msgToClient = (args: any) => {
    console.log('msgToClient:', args);
  };

  msgToServer() {
    this.socket.emit('msgToServer', { test: 'hello world' });
  }

  ngOnDestroy(): void {
    this.socket.removeListener('msgToClient', this.msgToClient);
  }
}
