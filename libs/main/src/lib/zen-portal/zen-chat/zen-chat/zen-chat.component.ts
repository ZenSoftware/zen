import { Component, OnInit } from '@angular/core';

import { ZenSocketService } from '../zen-socket.service';

@Component({
  selector: 'zen-chat',
  templateUrl: 'zen-chat.component.html',
})
export class ZenChatComponent implements OnInit {
  constructor(private socket: ZenSocketService) {}

  ngOnInit(): void {
    this.socket.on('msgToClient', (args: any) => {
      console.log('msgToClient:', args);
    });
  }

  sendMessage() {
    this.socket.emit('msgToServer', { test: 'hello world' });
  }
}
