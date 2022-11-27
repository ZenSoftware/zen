import { Component } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'zen-confirm',
  templateUrl: 'zen-confirm.component.html',
})
export class ZenConfirmComponent {
  constructor(public dialogRef: MatDialogRef<ZenConfirmComponent>) {}
}
