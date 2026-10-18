import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
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
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import ls from 'localstorage-slim';

import { AuthService, LocalStorageKey } from './auth.service';
import { token } from './token.signal';

describe('AuthService', () => {
  let service: AuthService;
  let apollo: ApolloTestingController;
  let ability: Ability;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
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
    apollo = TestBed.inject(ApolloTestingController);
    ability = TestBed.inject(Ability);
    router = TestBed.inject(Router);
  });

  it('evaluates rolesEqual correctly', () => {
    // Should evaluate to equal
    expect(service.rolesEqual('Editor', 'Editor')).toEqual(true);
    expect(service.rolesEqual('Editor', ['Editor'])).toEqual(true);
    expect(service.rolesEqual(['Editor'], 'Editor')).toEqual(true);
    expect(service.rolesEqual(['Admin', 'Editor'], ['Editor', 'Admin'])).toEqual(true);
    expect(service.rolesEqual([], [])).toEqual(true);
    expect(service.rolesEqual(undefined, undefined)).toEqual(true);
    expect(service.rolesEqual(null, null)).toEqual(true);
    expect(service.rolesEqual(undefined, null)).toEqual(true);
    expect(service.rolesEqual(null, undefined)).toEqual(true);
    expect(service.rolesEqual(null, [])).toEqual(true);
    expect(service.rolesEqual([], null)).toEqual(true);
    expect(service.rolesEqual(undefined, [])).toEqual(true);
    expect(service.rolesEqual([], undefined)).toEqual(true);

    // Should evaluate to not equal
    expect(service.rolesEqual('Editor', [])).toEqual(false);
    expect(service.rolesEqual('Editor', 'editor')).toEqual(false);
    expect(service.rolesEqual('Editor', ['Admin'])).toEqual(false);
    expect(service.rolesEqual(['Editor'], ['Editor', 'Admin'])).toEqual(false);
  });

  it('evaluates userHasRole correctly', done => {
    const data: AuthLogin = {
      authLogin: {
        __typename: 'AuthSession',
        userId: '',
        expiresIn: 0,
        rememberMe: true,
        roles: ['Editor'],
        token: '',
        rules: [],
      },
    };

    service
      .login({
        username: '',
        password: '',
        rememberMe: true,
      })
      .subscribe(() => {
        expect(service.userHasRole('Editor')).toEqual(true);
        expect(service.userHasRole(['Editor'])).toEqual(true);
        expect(service.userHasRole(['Admin', 'Editor'])).toEqual(true);

        expect(service.userHasRole([])).toEqual(false);
        expect(service.userHasRole('Admin')).toEqual(false);
        expect(service.userHasRole(['Admin'])).toEqual(false);

        done();
      });

    const op = apollo.expectOne(AuthLoginDocument);
    op.flush({ data });
    apollo.verify();
  });

  it('evaluates userNotInRole correctly', done => {
    const data: AuthLogin = {
      authLogin: {
        __typename: 'AuthSession',
        userId: '',
        expiresIn: 0,
        rememberMe: true,
        roles: ['Editor'],
        token: '',
        rules: [],
      },
    };

    service
      .login({
        username: '',
        password: '',
        rememberMe: true,
      })
      .subscribe(() => {
        expect(service.userNotInRole('Editor')).toEqual(false);
        expect(service.userNotInRole(['Editor'])).toEqual(false);
        expect(service.userNotInRole(['Admin', 'Editor'])).toEqual(false);

        expect(service.userNotInRole([])).toEqual(true);
        expect(service.userNotInRole('Admin')).toEqual(true);
        expect(service.userNotInRole(['Admin'])).toEqual(true);

        done();
      });

    const op = apollo.expectOne(AuthLoginDocument);
    op.flush({ data });
    apollo.verify();
  });

  it('login & logout correctly', done => {
    const data: AuthLogin = {
      authLogin: {
        __typename: 'AuthSession',
        userId: 'abc123',
        expiresIn: 1000,
        rememberMe: true,
        roles: ['Super'],
        token: 'abc.def.ghi',
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

        expect(ls.get(LocalStorageKey.userId, { decrypt: true })).toEqual(data.authLogin.userId);
        expect(ls.get(LocalStorageKey.token, { decrypt: true })).toEqual(data.authLogin.token);
        expect(typeof ls.get(LocalStorageKey.sessionExpiresOn)).toEqual('number');
        expect(ls.get(LocalStorageKey.rememberMe)).toEqual(data.authLogin.rememberMe);
        expect(ls.get(LocalStorageKey.roles, { decrypt: true })).toEqual(data.authLogin.roles);
        expect(ls.get(LocalStorageKey.rules, { decrypt: true })).toEqual(data.authLogin.rules);

        expect(ability.rules).toEqual(data.authLogin.rules);
        expect(service.userId).toEqual(data.authLogin.userId);
        expect(token()).toEqual(data.authLogin.token);
        expect(service.userRoles).toEqual(data.authLogin.roles);
        expect(service.loggedIn).toEqual(true);

        const routerSpy = jest.spyOn(router, 'navigateByUrl');

        service.logout();

        expect(ls.get(LocalStorageKey.userId, { decrypt: true })).toEqual(null);
        expect(ls.get(LocalStorageKey.token, { decrypt: true })).toEqual(null);
        expect(ls.get(LocalStorageKey.sessionExpiresOn)).toEqual(null);
        expect(ls.get(LocalStorageKey.rememberMe)).toEqual(null);
        expect(ls.get(LocalStorageKey.roles, { decrypt: true })).toEqual(null);
        expect(ls.get(LocalStorageKey.rules, { decrypt: true })).toEqual(null);

        expect(ability.rules).toEqual([]);
        expect(service.userId).toEqual(null);
        expect(token()).toEqual(null);
        expect(service.userRoles).toEqual([]);
        expect(service.loggedIn).toEqual(false);

        expect(routerSpy).toHaveBeenCalledWith('/login');

        done();
      });

    const op = apollo.expectOne(AuthLoginDocument);
    op.flush({ data });
    apollo.verify();
  });
});
