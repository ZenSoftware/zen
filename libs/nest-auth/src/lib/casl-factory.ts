import { RequestUser } from './models/request-user';

/**
 * Abstract class for creating an ability for a user.  It is used by the `CaslGuard` to create an ability.
 * Register the factory with the `NestAuthModule` by passing it to the `register` method.
 * ```ts
 * ＠Module({ imports: [NestAuthModule.register(AppCaslFactory)] })
 * export class ZenAuthModule {}
 * ```
 * Where `AppCaslFactory` is a class that extends `CaslFactory` and implements the `createAbility` method.
 */
export abstract class CaslFactory {
  abstract createAbility(user: RequestUser): Promise<any>;
}
