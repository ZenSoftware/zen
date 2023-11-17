import { Component, Input } from '@angular/core';
import { AccountInfo } from '@zen/graphql';

@Component({
  selector: 'zen-account-info',
  templateUrl: 'zen-account-info.component.html',
  standalone: true,
})
export class ZenAccountInfoComponent {
  @Input({ required: true }) accountInfo!: AccountInfo;
}
