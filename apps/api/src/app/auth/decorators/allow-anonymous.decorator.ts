import { SetMetadata } from '@nestjs/common';

export const ALLOW_ANONYMOUS_KEY = 'AllowAnonymous';

/**
 * Imitates [ASP.NET Core AllowAnonymous](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/simple?view=aspnetcore-6.0)
 */
export const AllowAnonymous = () => SetMetadata(ALLOW_ANONYMOUS_KEY, true);
