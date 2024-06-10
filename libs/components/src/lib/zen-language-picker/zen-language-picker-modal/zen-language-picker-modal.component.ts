import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { languages } from '@zen/common';

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
    TranslateModule,
  ],
})
export class ZenLanguagePickerModalComponent {
  translate = inject(TranslateService);
  dialogRef = inject(MatDialogRef<ZenLanguagePickerModalComponent>);
  languages = languages;

  constructor() {
    this.#selected = this.translate.currentLang;
  }

  #selected: string;
  get selected() {
    return this.#selected;
  }

  set selected(value: string) {
    this.translate.use(value);
    this.#selected = value;
    this.dialogRef.close(this.selected);
  }
}
