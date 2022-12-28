import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Ability } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';
import { Environment, EnvironmentDev } from '@zen/common';
import { AuthExchangeTokenGQL, AuthLoginGQL, GetAccountInfoGQL } from '@zen/graphql';
import { loggedInVar, userRolesVar } from '@zen/graphql/client';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ApolloTestingModule],
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

    userRolesVar([]);
    service = TestBed.inject(AuthService);
  }));

  it('evaluates rolesEqual correctly', () => {
    expect(service.rolesEqual('Editor', 'Editor')).toEqual(true);
    expect(service.rolesEqual('Editor', ['Editor'])).toEqual(true);
    expect(service.rolesEqual(['Editor'], 'Editor')).toEqual(true);
    expect(service.rolesEqual(['Admin', 'Editor'], ['Editor', 'Admin'])).toEqual(true);
    expect(service.rolesEqual([], [])).toEqual(true);
    expect(service.rolesEqual(null, [])).toEqual(true);
    expect(service.rolesEqual(undefined, [])).toEqual(true);

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
});
