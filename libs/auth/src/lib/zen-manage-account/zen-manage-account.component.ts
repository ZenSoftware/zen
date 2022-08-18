import { Component } from '@angular/core';
import { GetAccountInfoGQL } from '@zen/graphql';
import { map, share } from 'rxjs';

@Component({
  selector: 'zen-manage-account',
  templateUrl: 'zen-manage-account.component.html',
})
export class ZenManageAccountComponent {
  accountInfo$;

  constructor(getAccountInfoGQL: GetAccountInfoGQL) {
    this.accountInfo$ = getAccountInfoGQL.watch().valueChanges.pipe(
      map(({ data }) => data.accountInfo),
      share()
    );
  }
}
