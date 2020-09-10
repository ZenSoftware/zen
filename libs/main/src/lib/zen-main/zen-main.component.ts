import { Component } from '@angular/core';
import { FindManyUserGQL, QueryMode, UserRolesGQL } from '@zen/graphql';
import { userRolesVar } from '@zen/graphql/client';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'zen-main',
  templateUrl: 'zen-main.component.html',
})
export class ZenMainComponent {
  constructor(private findManyUserGQL: FindManyUserGQL, private userRolesGQL: UserRolesGQL) {}

  userRoles$ = this.userRolesGQL.watch().valueChanges.pipe(
    map(r => r.data?.userRoles),
    shareReplay(1)
  );

  users$ = this.findManyUserGQL
    .watch({
      where: {
        email: {
          mode: QueryMode.Insensitive,
          equals: 'Peter@ZenSoftware.ca',
        },
      },
    })
    .valueChanges.pipe(
      map(r => r.data?.findManyUser),
      shareReplay(1)
    );

  example() {
    userRolesVar([...userRolesVar(), 'another']);
  }
}
