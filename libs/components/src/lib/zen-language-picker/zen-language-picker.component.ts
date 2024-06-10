import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { languages } from '@zen/common';

import { ZenLanguagePickerModalComponent } from './zen-language-picker-modal/zen-language-picker-modal.component';

@Component({
  selector: 'zen-language-picker',
  templateUrl: 'zen-language-picker.component.html',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatDialogModule, ZenLanguagePickerModalComponent],
})
export class ZenLanguagePickerComponent {
  dialog = inject(MatDialog);
  translate = inject(TranslateService);
  languages = languages;

  get languageDisplayText() {
    return languages.find(option => option.value === this.translate.currentLang)?.nativeSpelling;
  }

  openModal() {
    this.dialog.open(ZenLanguagePickerModalComponent);
  }
}
