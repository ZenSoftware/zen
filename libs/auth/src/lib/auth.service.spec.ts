import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Ability } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';
import { Environment, EnvironmentDev } from '@zen/common';
import {
  AuthExchangeTokenGQL,
  AuthLogin,
  AuthLoginDocument,
  AuthLoginGQL,
  GetAccountInfoGQL,
} from '@zen/graphql';
import { loggedInVar, userRolesVar } from '@zen/graphql/client';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import ls from 'localstorage-slim';

import { AuthService, LocalStorageKey } from './auth.service';
import { tokenVar } from './token-var';
import { ZenLoginPageComponent } from './zen-login-page/zen-login-page.component';

describe('AuthService', () => {
  let service: AuthService;
  let controller: ApolloTestingController;
  let ability: Ability;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'login', component: ZenLoginPageComponent }]),
        ApolloTestingModule,
      ],
      declarations: [],
      providers: [
        AuthService,
        AuthLoginGQL,
        AuthExchangeTokenGQL,
        GetAccountInfoGQL,
        { provide: Environment, useValue: EnvironmentDev },
        {
          provide: Ability,
          useValue: createPrismaAbility(undefined, {
            detectSubjectType: object => object['__typename'],
          }),
        },
      ],
    });

    service = TestBed.inject(AuthService);
    controller = TestBed.inject(ApolloTestingController);
    ability = TestBed.inject(Ability);

    service.clearSession();
  }));

  it('evaluates rolesEqual correctly', () => {
    expect(service.rolesEqual('Editor', 'Editor')).toEqual(true);
    // expect(service.rolesEqual('Editor', ['Editor'])).toEqual(true);
    // expect(service.rolesEqual(['Editor'], 'Editor')).toEqual(true);
    expect(service.rolesEqual(['Admin', 'Editor'], ['Editor', 'Admin'])).toEqual(true);
    expect(service.rolesEqual([], [])).toEqual(true);

    expect(service.rolesEqual(null, [])).toEqual(false);
    expect(service.rolesEqual(undefined, [])).toEqual(false);
    expect(service.rolesEqual('Editor', [])).toEqual(false);
    expect(service.rolesEqual('Editor', 'Admin')).toEqual(false);
    expect(service.rolesEqual('Editor', ['Admin'])).toEqual(false);
    expect(service.rolesEqual(['Editor'], ['Admin'])).toEqual(false);
  });

  it('evaluates userHasRole correctly', () => {
    userRolesVar(['Editor']);

    expect(service.userHasRole('Editor')).toEqual(true);
    expect(service.userHasRole(['Editor'])).toEqual(true);
    expect(service.userHasRole(['Admin', 'Editor'])).toEqual(true);

    expect(service.userHasRole([])).toEqual(false);
    expect(service.userHasRole('Admin')).toEqual(false);
    expect(service.userHasRole(['Admin'])).toEqual(false);
  });

  it('evaluates userNotInRole correctly', () => {
    userRolesVar(['Editor']);

    expect(service.userNotInRole('Editor')).toEqual(false);
    expect(service.userNotInRole(['Editor'])).toEqual(false);
    expect(service.userNotInRole(['Admin', 'Editor'])).toEqual(false);

    expect(service.userNotInRole([])).toEqual(true);
    expect(service.userNotInRole('Admin')).toEqual(true);
    expect(service.userNotInRole(['Admin'])).toEqual(true);
  });

  it('login correctly', done => {
    const data: AuthLogin = {
      authLogin: {
        __typename: 'AuthSession',
        id: 'abc123',
        expiresIn: 1000,
        rememberMe: true,
        roles: ['Super'],
        token: '1234',
        rules: [{ action: 'manage', subject: 'all' }],
      },
    };

    service
      .login({
        username: 'zen',
        password: 'temp',
        rememberMe: true,
      })
      .subscribe(authLogin => {
        expect(authLogin.data).toEqual(data);

        expect(ls.get(LocalStorageKey.userId, { decrypt: true })).toEqual(data.authLogin.id);
        expect(ls.get(LocalStorageKey.token, { decrypt: true })).toEqual(data.authLogin.token);
        expect(typeof ls.get(LocalStorageKey.sessionExpiresOn)).toEqual('number');
        expect(ls.get(LocalStorageKey.rememberMe)).toEqual(data.authLogin.rememberMe);
        expect(ls.get(LocalStorageKey.roles, { decrypt: true })).toEqual(data.authLogin.roles);
        expect(ls.get(LocalStorageKey.rules, { decrypt: true })).toEqual(data.authLogin.rules);

        expect(ability.rules).toEqual(data.authLogin.rules);

        expect(tokenVar()).toEqual(data.authLogin.token);
        expect(userRolesVar()).toEqual(data.authLogin.roles);
        expect(loggedInVar()).toEqual(true);

        done();
      });

    const op = controller.expectOne(AuthLoginDocument);
    op.flush({ data });
    controller.verify();
  });
});
