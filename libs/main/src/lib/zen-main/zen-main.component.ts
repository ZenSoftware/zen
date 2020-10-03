import { Component } from '@angular/core';
import {
  AuthRegisterGQL,
  FindManyUserGQL,
  QueryMode,
  UserDistinctFieldEnum,
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
    private authRegisterGQL: AuthRegisterGQL,
    private findManyUserGQL: FindManyUserGQL,
    private userRolesGQL: UserRolesGQL
  ) {}

  userRoles$ = this.userRolesGQL.watch().valueChanges.pipe(
    map(r => r.data.userRoles),
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
      distinct: UserDistinctFieldEnum.FirstName,
    })
    .valueChanges.pipe(
      map(r => r.data.findManyUser),
      shareReplay(1)
    );

  createUser() {
    this.authRegisterGQL
      .mutate({
        data: {
          email: 'peter@zensoftware.ca',
          password: 'TempTemp',
          firstName: 'Peter',
        },
      })
      .subscribe(({ data }) => console.log('Created', data?.authRegister));
  }

  example() {
    userRolesVar([...userRolesVar(), 'another']);
  }
}
