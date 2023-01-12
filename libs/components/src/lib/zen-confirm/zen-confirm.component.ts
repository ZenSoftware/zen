import { AfterContentInit, Component, Inject, Input, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ZenConfirmOptions } from './zen-confirm-options';

@Component({
  selector: 'zen-confirm',
  templateUrl: 'zen-confirm.component.html',
})
export class ZenConfirmComponent implements AfterContentInit {
  @ViewChild('confirmBtn') confirmBtn!: MatButton;
  @Input() title = 'Are you sure?';
  @Input() confirmText = 'Yes';
  @Input() cancelText = 'No';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ZenConfirmOptions | undefined,
    public dialogRef: MatDialogRef<ZenConfirmComponent>
  ) {
    if (data?.title) this.title = data.title;
    if (data?.confirmText) this.confirmText = data.confirmText;
    if (data?.cancelText) this.cancelText = data.cancelText;
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.confirmBtn.focus();
    });
  }
}
