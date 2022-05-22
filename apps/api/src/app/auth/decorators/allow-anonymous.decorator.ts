import { SetMetadata } from '@nestjs/common';

export const ALLOW_ANONYMOUS_KEY = 'AllowAnonymous';
export const AllowAnonymous = () => SetMetadata(ALLOW_ANONYMOUS_KEY, true);
