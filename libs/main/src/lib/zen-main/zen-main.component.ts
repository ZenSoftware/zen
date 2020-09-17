import { Component } from '@angular/core';
import {
  CreateOneUserGQL,
  FindManyUserGQL,
  QueryMode,
  UpdateOneUserGQL,
  UserRolesGQL,
  selectOne,
} from '@zen/graphql';
import { userRolesVar } from '@zen/graphql/client';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'zen-main',
  templateUrl: 'zen-main.component.html',
})
export class ZenMainComponent {
  constructor(
    private findManyUserGQL: FindManyUserGQL,
    private userRolesGQL: UserRolesGQL,
    private createOneUserGQL: CreateOneUserGQL,
    private updateOneUserGQL: UpdateOneUserGQL
  ) {}

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

  createUser() {
    this.createOneUserGQL
      .mutate({
        data: {
          email: 'peter@zensoftware.ca',
          firstName: 'Peter',
          password: '1234',
        },
      })
      .subscribe();
  }

  example() {
    this.updateOneUserGQL
      .mutate({
        where: selectOne('peter@zensoftware.ca', 'email'),
        data: {
          test: { increment: 1 },
        },
      })
      .subscribe();

    userRolesVar([...userRolesVar(), 'another']);
  }
}
