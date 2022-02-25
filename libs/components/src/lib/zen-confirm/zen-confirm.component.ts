import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'zen-confirm',
  templateUrl: 'zen-confirm.component.html',
})
export class ZenConfirmComponent {
  constructor(public dialogRef: MatDialogRef<ZenConfirmComponent>) {}
}
