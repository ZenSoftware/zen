import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RouterTestingModule } from '@angular/router/testing';
import { Ability } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';
import { Preview, moduleMetadata } from '@storybook/angular';
import { Environment, EnvironmentDev } from '@zen/common';
import { AuthExchangeTokenGQL, AuthLoginGQL, GetAccountInfoGQL } from '@zen/graphql';
import { ApolloTestingModule } from 'apollo-angular/testing';

import { AuthService } from '../src/lib/auth.service';

const preview: Preview = {
  decorators: [
    moduleMetadata({
      imports: [ApolloTestingModule, RouterTestingModule],
      providers: [
        { provide: Environment, useValue: EnvironmentDev },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },

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
      ],
    }),
  ],
};

export default preview;
