import { RequestUser } from './models/request-user';

export abstract class CaslFactory {
  abstract createAbility(user: RequestUser): Promise<any>;
}
