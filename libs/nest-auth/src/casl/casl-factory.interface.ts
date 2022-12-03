import { RequestUser } from '../models/request-user';

export interface ICaslFactory {
  createAbility(user: RequestUser): Promise<any>;
}
