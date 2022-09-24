# Zen Authentication & Authorization
Exported from *auth*, the following table lists the guards and directives for their respective ABAC & RBAC schemes.

|                       | ABAC            | RBAC        | Common           |
|-----------------------|-----------------|-------------|------------------|
| **GraphQL Resolvers** | `GqlCaslGuard`  | `GqlGuard`  | `GqlUser`        |
| **Http Controllers**  | `HttpCaslGuard` | `HttpGuard` | `HttpUser`       |
| **Common**            | `CaslSubject`   | `Roles`     | `AllowAnonymous` |

These are a complete set of Nest guards & directives that can be applied to either classes or functions to declaritively apply permissions.
`GqlCaslGuard` and `GqlGuard` extract the user from the JWT token and makes the `RequestUser` accessible via an injectable paramater `GqlUser`.  This is symmetric to how the Nest HTTP controller guards `HttpCaslGuard` & `HttpGuard` work to extract the `RequestUser` via `HttpUser`.  The definition for `RequestUser` is quite simple:

```ts
import { User } from '@prisma/client';

export class RequestUser {
  id: User['id'];
  roles: string[];
}
```

This is extracted from a valid JWT payload without hitting the database.  The full user can then be retrieved via Prisma utilizing the user's `id` if needed.  For usage of the guards, you may reference the following code:

### GraphQL RBAC (Role-based access control)

Simplest usage of GraphQL RBAC guards and directives

*graphql/resolvers/Sample.ts*
```ts
import { Logger, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import gql from 'graphql-tag';

import { GqlGuard, GqlUser, RequestUser, Roles } from '../../auth';

export const typeDefs = gql`
  extend type Query {
    sampleQuery: Boolean!
  }
`;

@Resolver()
@UseGuards(GqlGuard)
@Roles('Super')
export class SampleResolver {
  @Query()
  async sampleQuery(@GqlUser() user: RequestUser) {
    Logger.log('sampleQuery hit by user', user.id);
    return true;
  }
}
```

### GraphQL ABAC (Attribute-based access control)
Simplest usage of GraphQL ABAC guards and directives

*graphql/resolvers/Sample.ts*
```ts
import { Logger, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import gql from 'graphql-tag';

import { CaslSubject, GqlCaslGuard, GqlUser, RequestUser } from '../../auth';

export const typeDefs = gql`
  extend type Query {
    sampleQuery: Boolean!
  }
`;

@Resolver()
@CaslSubject('Sample')
export class SampleResolver {
  @Query()
  @UseGuards(GqlCaslGuard('read'))
  async sampleQuery(@GqlUser() user: RequestUser) {
    Logger.log('sampleQuery hit by user', user.id);
    return true;
  }
}
```

*auth/casl/casl-ability.factory.ts*
```ts
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Action } from '@zen/api-interfaces';

import { RequestUser } from '../models/request-user';
import { PrismaSubjects } from './generated';

/** @description A union of subjects to extend the ability beyond just Prisma models */
export type ExtendedSubjects = 'all' | 'Sample';

@Injectable()
export class CaslAbilityFactory {
  async createAbility(user: RequestUser) {
    const prismaRules = this.#prismaRules(user);
    const extendedRules = this.#extendedRules(user);
    return createMongoAbility(prismaRules.concat(extendedRules as any));
  }

  #prismaRules(user: RequestUser) {
    const { can, cannot, rules } = new AbilityBuilder(createPrismaAbility);

    // Customize user permissions over Prisma models here

    return rules;
  }

  #extendedRules(user: RequestUser) {
    const { can, cannot, rules } = new AbilityBuilder(
      createMongoAbility<[Action, ExtendedSubjects | PrismaSubjects]>
    );

    if (user.roles.includes('Super')) {
      can('manage', 'all');
    }

    // Customize extended user permissions here
    can('read', 'Sample');

    return rules;
  }
}
```

ABAC over the Prisma schema is implemented utilizing [@casl/prisma](https://casl.js.org/v6/en/package/casl-prisma), which is utilizing the Prisma WhereInput as the Casl subject. Therefore `GqlCaslGuard` extracts the `where` paramater from the GraphQL request args if it finds it, and utilizes it in conjuction with the `@CaslSubject` directive to describe the subject.