import { Profile } from 'passport-google-oauth20';

export interface AccountInfo {
  username?: string | null;
  hasPassword: boolean;
  googleProfile: Partial<Profile['_json']>;
}
