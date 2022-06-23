import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'zen-chat',
  templateUrl: 'zen-chat.component.html',
})
export class ZenChatComponent implements OnInit {
  constructor(private socket: Socket) {}

  ngOnInit(): void {
    this.socket.on('msgToClient', (args: any) => {
      console.log('Recieved:', args);
    });
  }

  sendMessage() {
    this.socket.emit('msgToServer', { test: 'hello world' });
  }
}
