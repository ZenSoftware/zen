export abstract class Environment {
  abstract readonly production: boolean;
  abstract readonly publicRegistration: boolean;
  abstract readonly auth: {
    /**
     * `app-load` will exchange the auth token every time the app loads
     * `efficient` will exchange the auth token only when intervals are exceeded
     */
    readonly exchangeStrategy: 'app-load' | 'efficient';

    /**
     * The rate in milliseconds at which the client will exchange the JWT.
     * This should be less than the JWT expiration time.
     * @see `apps/api/src/environments/environment.ts` for `Environment.jwtOptions.signOptions.expiresIn`
     * @example 30 * 60 * 1000 is 30 minutes
     */
    readonly jwtExchangeInterval: number;

    /**
     * The threshold in milliseconds at which the client will exchange the JWT when the user's session time is less than this value.
     * If the user's session has `rememberMe = true` and the user's session time remaining is less than 45 days, the client will exchange the JWT.
     * @example 45 * 24 * 60 * 60 * 1000 is 45 days.
     */
    readonly rememberMeExchangeThreshold: number;

    /**
     * The delay in milliseconds at which the client will retry on a failed JWT exchange.
     * For example if the client is disconnected and has their auth session expiring soon, it will retry at the provided interval.
     * @example 5000 is 5 seconds.
     */
    readonly retryExchangeTokenDelay?: number;
  };

  /**
   * Whether or not to enable Google OAuth for the client application.
   * Will hide the `Sign in with Google` button if false.
   */
  abstract readonly enableGoogleOAuth: boolean;

  /**
   * The URLs for the application.
   */
  abstract readonly url: {
    readonly loginRedirect: string;
    readonly api: string;
    readonly portal: string;
    readonly graphql: string;
    readonly graphqlSubscriptions?: string;
    readonly socketio?: string;
  };

  abstract readonly defaultLanguage: string;
}

export class EnvironmentDev implements Environment {
  production = false;
  publicRegistration = true;
  auth = {
    exchangeStrategy: 'app-load',
    jwtExchangeInterval: 30 * 60 * 1000, // 30 minutes
    rememberMeExchangeThreshold: 45 * 24 * 60 * 60 * 1000, // 45 days
    retryExchangeTokenDelay: 5000, // 5 seconds
  } as const;
  enableGoogleOAuth = true;
  url = {
    loginRedirect: '/',
    api: 'http://localhost:7080',
    portal: 'http://localhost:4200/#',
    graphql: 'http://localhost:7080/graphql',
    graphqlSubscriptions: 'ws://localhost:7080/graphql',
    socketio: 'http://localhost:7081',
  } as const;
  defaultLanguage = 'en' as const;
}

export class EnvironmentProd implements Environment {
  production = true;
  publicRegistration = true;
  auth = {
    exchangeStrategy: 'app-load',
    jwtExchangeInterval: 30 * 60 * 1000, // 30 minutes
    rememberMeExchangeThreshold: 45 * 24 * 60 * 60 * 1000, // 45 days
    retryExchangeTokenDelay: 5000, // 5 seconds
  } as const;
  enableGoogleOAuth = true;
  url = {
    loginRedirect: '/',
    api: 'https://api.site.com',
    portal: 'https://portal.site.com/#',
    graphql: 'https://api.site.com/graphql',
    graphqlSubscriptions: 'wss://api.site.com/graphql',
    socketio: 'https://api.site.com:81',
  } as const;
  defaultLanguage = 'en' as const;
}
