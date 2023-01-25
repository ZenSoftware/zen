import { Injectable } from '@nestjs/common';

import { RequestUser } from './models/request-user';

/**
 * Abstract class for creating an ability for a user.  It is used by the `CaslGuard` decorator to create an ability.
 * Register the factory with the `NestAuthModule` by passing it to the `register` method.
 * ```ts
 * ＠Module({ imports: [NestAuthModule.register(AppCaslFactory)] })
 * export class ZenAuthModule {}
 * ```
 * Where `AppCaslFactory` is a class that extends `CaslFactory` and implements the `createAbility` method.
 */
@Injectable()
export abstract class CaslFactory {
  abstract createAbility(user: RequestUser): Promise<any>;
}
