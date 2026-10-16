import { AfterContentInit, Component, Input, ViewChild, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { ZenConfirmOptions } from '../zen-confirm-options';

@Component({
  selector: 'zen-confirm',
  templateUrl: 'zen-confirm.component.html',
  standalone: true,
  imports: [MatButtonModule, TranslatePipe],
})
export class ZenConfirmComponent implements AfterContentInit {
  @ViewChild('confirmBtn') confirmBtn!: MatButton;
  @Input() titleTranslationKey;
  @Input() confirmTranslationKey;
  @Input() cancelTranslationKey;

  translate = inject(TranslateService);

  data: ZenConfirmOptions | undefined = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ZenConfirmComponent>);

  constructor() {
    this.titleTranslationKey = 'ARE_YOU_SURE';
    this.confirmTranslationKey = 'YES';
    this.cancelTranslationKey = 'NO';

    if (this.data?.titleTranslationKey) this.titleTranslationKey = this.data.titleTranslationKey;
    if (this.data?.confirmTranslationKey)
      this.confirmTranslationKey = this.data.confirmTranslationKey;
    if (this.data?.cancelTranslationKey) this.cancelTranslationKey = this.data.cancelTranslationKey;
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.confirmBtn.focus();
    });
  }
}
