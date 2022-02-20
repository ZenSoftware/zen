import { Component } from '@angular/core';

@Component({
  selector: 'zen-password-reset-request-page',
  templateUrl: 'zen-password-reset-request-page.component.html',
})
export class ZenPasswordResetRequestPageComponent {
  onSent() {
    /**
     * You can further customize logic after a successful request that triggers
     * the password reset e-mail with a link to `zen-password-reset-confirmation-page`
     */
  }
}
