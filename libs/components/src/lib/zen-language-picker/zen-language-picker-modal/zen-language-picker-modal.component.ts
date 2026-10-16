import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { languages } from '@zen/common';
import ls from 'localstorage-slim';

export const CURRENT_LANG_LS_KEY = 'currentLang';

@Component({
  selector: 'zen-language-picker-modal',
  templateUrl: 'zen-language-picker-modal.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslatePipe,
  ],
})
export class ZenLanguagePickerModalComponent {
  translate = inject(TranslateService);
  dialogRef = inject(MatDialogRef<ZenLanguagePickerModalComponent>);
  languages = languages;

  constructor() {
    this.#selected = this.translate.getCurrentLang()!;
  }

  #selected: string;
  get selected() {
    return this.#selected;
  }

  set selected(value: string) {
    this.translate.use(value);
    this.#selected = value;
    ls.set(CURRENT_LANG_LS_KEY, value);
    this.dialogRef.close(value);
  }
}
