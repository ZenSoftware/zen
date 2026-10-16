import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { languages } from '@zen/common';

import { ZenLanguagePickerModalComponent } from './zen-language-picker-modal/zen-language-picker-modal.component';

@Component({
  selector: 'zen-language-picker',
  templateUrl: 'zen-language-picker.component.html',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ZenLanguagePickerComponent {
  dialog = inject(MatDialog);
  translate = inject(TranslateService);
  languages = languages;

  get languageDisplayText() {
    return languages.find(option => option.value === this.translate.getCurrentLang())
      ?.nativeSpelling;
  }

  openModal() {
    this.dialog.open(ZenLanguagePickerModalComponent);
  }
}
