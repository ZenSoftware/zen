import { AfterContentInit, Component, Inject, Input, ViewChild, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ZenConfirmOptions } from '../zen-confirm-options';

@Component({
  selector: 'zen-confirm',
  templateUrl: 'zen-confirm.component.html',
  standalone: true,
  imports: [MatButtonModule, TranslateModule],
})
export class ZenConfirmComponent implements AfterContentInit {
  @ViewChild('confirmBtn') confirmBtn!: MatButton;
  @Input() titleTranslationKey;
  @Input() confirmTranslationKey;
  @Input() cancelTranslationKey;

  translate = inject(TranslateService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ZenConfirmOptions | undefined,
    public dialogRef: MatDialogRef<ZenConfirmComponent>
  ) {
    this.titleTranslationKey = 'ARE_YOU_SURE';
    this.confirmTranslationKey = 'YES';
    this.cancelTranslationKey = 'NO';

    if (data?.titleTranslationKey) this.titleTranslationKey = data.titleTranslationKey;
    if (data?.confirmTranslationKey) this.confirmTranslationKey = data.confirmTranslationKey;
    if (data?.cancelTranslationKey) this.cancelTranslationKey = data.cancelTranslationKey;
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.confirmBtn.focus();
    });
  }
}
