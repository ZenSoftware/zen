import { RequestUser } from '../models/request-user';

export interface ICaslAbilityFactory {
  createAbility(user: RequestUser): Promise<any>;
}
