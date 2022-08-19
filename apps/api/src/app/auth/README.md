# Zen Authentication & Authorization
Exported from *auth*, the following table lists the guards and directives for their respective ABAC & RBAC schemes.

|                       | ABAC            | RBAC        | Common           |
|-----------------------|-----------------|-------------|------------------|
| **GraphQL Resolvers** | `GqlCaslGuard`  | `GqlGuard`  | `GqlUser`        |
| **Http Controllers**  | `HttpCaslGuard` | `HttpGuard` | `HttpUser`       |
| **Common**            | `CaslSubject`   | `Roles`     | `AllowAnonymous` |

These are a complete set of Nest guards & directives that can be applied to either classes or functions to declaritively apply permissions.
`GqlCaslGuard` and `GqlGuard` extract the user from the JWT token and makes the `RequestUser` accessible via an injectable paramater `GqlUser`.  This is symmetric to how the Nest Http Controllers guards `HttpCaslGuard` & `HttpGuard` work to extract the `RequestUser` via `HttpUser`.  The definition for `RequestUser` is quite simple:

```ts
export class RequestUser {
  id: number;
  roles: string[];
}
```

This is simply extracted from a valid JWT payload without hitting the database to maintain performance.  The full user can then be retrieved via Prisma utilizing their `id` if needed.  For usage of the guards, you may reference the following code:

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
createAbility(user: RequestUser) {
  const { can, cannot, build } = new AbilityBuilder(APP_ABILITY);

  if (user.roles.includes('Super')) {
    can(Action.manage, 'all'); // read-write access to everything
  } else {
    // Customize user permissions here
    can(Action.read, 'Sample' as any);
  }

  return build();
}
```

### GraphQL RBAC (Role-based access control)

Simplest usage of GraphQL RBAC guards and directives

*app/graphql/resolvers/Sample.ts*
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