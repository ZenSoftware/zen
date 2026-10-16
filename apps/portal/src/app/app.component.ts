import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService, IfLoggedInDirective, RolesDirective, ZenLoginLinkComponent } from '@zen/auth';
import { Environment } from '@zen/common';
import {
  CURRENT_LANG_LS_KEY,
  ZenLanguagePickerComponent,
  ZenLayoutComponent,
} from '@zen/components';
import ls from 'localstorage-slim';

@Component({
  selector: 'zen-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    IfLoggedInDirective,
    MatListModule,
    RolesDirective,
    RouterModule,
    TranslatePipe,
    ZenLanguagePickerComponent,
    ZenLayoutComponent,
    ZenLoginLinkComponent,
  ],
})
export class AppComponent {
  auth = inject(AuthService);
  private translate = inject(TranslateService);
  private env = inject(Environment);

  constructor() {
    const currentLang = ls.get<string>(CURRENT_LANG_LS_KEY);
    this.translate.use(currentLang ?? this.env.defaultLanguage);
  }
}
