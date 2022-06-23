import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { ZenChatComponent } from './zen-chat/zen-chat.component';

@NgModule({
  imports: [MatButtonModule],
  declarations: [ZenChatComponent],
})
export class ZenChatModule {}
