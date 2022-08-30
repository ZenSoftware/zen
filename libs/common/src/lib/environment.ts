export abstract class Environment {
  abstract readonly production: boolean;
  abstract readonly publicRegistration: boolean;
  abstract readonly auth: {
    /**
     * @value 'app-load' | 'on-push'
     * 'app-load' will exchange the auth token every time the app loads
     * 'on-push' will exchange the auth token only when intervals are exceeded
     */
    readonly exchangeStrategy: 'app-load' | 'on-push' | string;
    readonly jwtExchangeInterval: number;
    readonly rememberMeExchangeThreshold: number;
  };

  abstract readonly enableGoogleOAuth: boolean;
  abstract readonly url: {
    readonly loginRedirect: string;
    readonly api: string;
    readonly portal: string;
    readonly graphql: string;
    readonly graphqlSubscriptions: string;
    readonly socketio: string;
  };
}

export class EnvironmentDev implements Environment {
  production = false;
  publicRegistration = true;
  auth = {
    exchangeStrategy: 'app-load',
    jwtExchangeInterval: 30 * 60 * 1000, // 30 minutes
    rememberMeExchangeThreshold: 45 * 24 * 60 * 60 * 1000, // 45 days
  };
  enableGoogleOAuth = true;
  url = {
    loginRedirect: '/',
    api: 'http://localhost:7080',
    portal: 'http://localhost:4200/#',
    graphql: 'http://localhost:7080/graphql',
    graphqlSubscriptions: 'ws://localhost:7080/graphql',
    socketio: 'http://localhost:7081',
  };
}

export class EnvironmentProd implements Environment {
  production = true;
  publicRegistration = true;
  auth = {
    exchangeStrategy: 'app-load',
    jwtExchangeInterval: 30 * 60 * 1000, // 30 minutes
    rememberMeExchangeThreshold: 45 * 24 * 60 * 60 * 1000, // 45 days
  };
  enableGoogleOAuth = true;
  url = {
    loginRedirect: '/',
    api: 'https://api.site.com',
    portal: 'https://portal.site.com/#',
    graphql: 'https://api.site.com/graphql',
    graphqlSubscriptions: 'wss://api.site.com/graphql',
    socketio: 'https://api.site.com:81',
  };
}
