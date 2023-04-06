/**
 * Common test dependencies
 */
import { CommonModule } from '@angular/common';
import { Provider } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Ability } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';
import { Environment, EnvironmentDev } from '@zen/common';
import { ZenComponentsModule } from '@zen/components';
import { AuthExchangeTokenGQL, AuthLoginGQL, GetAccountInfoGQL } from '@zen/graphql';
import { ApolloTestingModule } from 'apollo-angular/testing';

import { AuthService } from './auth.service';
import {
  IfLoggedInDirective,
  IfPublicRegistrationDirective,
  NotRolesDirective,
  RolesDirective,
} from './directives';

export const AUTH_IMPORTS = [
  CommonModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  RouterTestingModule,
  ApolloTestingModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatProgressBarModule,
  ZenComponentsModule,
];

export const AUTH_DECLARATIONS = [
  IfLoggedInDirective,
  IfPublicRegistrationDirective,
  NotRolesDirective,
  RolesDirective,
];

export const AUTH_PROVIDERS: Provider[] = [
  { provide: Environment, useValue: EnvironmentDev },
  {
    provide: Ability,
    useValue: createPrismaAbility(undefined, {
      detectSubjectType: object => object['__typename'],
    }),
  },
  AuthService,
  AuthLoginGQL,
  AuthExchangeTokenGQL,
  GetAccountInfoGQL,
];
