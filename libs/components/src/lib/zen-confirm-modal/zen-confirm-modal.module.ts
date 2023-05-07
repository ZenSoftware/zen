import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { ZenConfirmModal } from './zen-confirm-modal.service';
import { ZenConfirmComponent } from './zen-confirm/zen-confirm.component';

@NgModule({
  imports: [MatDialogModule, ZenConfirmComponent],
  providers: [ZenConfirmModal],
})
export class ZenConfirmModalModule {}
