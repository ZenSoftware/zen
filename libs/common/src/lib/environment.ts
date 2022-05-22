export abstract class Environment {
  abstract readonly production: boolean;
  abstract readonly publicRegistration: boolean;
  abstract readonly jwtExchangeInterval: number;
  abstract readonly rememberMeExchangeThreshold: number;
  abstract readonly url: {
    readonly loginRedirect: string;
    readonly api: string;
    readonly portal: string;
    readonly graphql: string;
    readonly graphqlSubscriptions: string;
  };
}

export class EnvironmentDev implements Environment {
  production = false;
  publicRegistration = true;
  jwtExchangeInterval = 30 * 60 * 1000; // 30 minutes;
  rememberMeExchangeThreshold = 14 * 24 * 60 * 60 * 1000; // 14 days
  url = {
    loginRedirect: '/',
    api: 'http://zen.rancher.localhost',
    portal: 'http://localhost:4200/#/',
    graphql: 'http://zen.rancher.localhost/graphql',
    graphqlSubscriptions: 'ws://zen.rancher.localhost/graphql',
  };
}

export class EnvironmentProd implements Environment {
  production = true;
  publicRegistration = true;
  jwtExchangeInterval = 30 * 60 * 1000; // 30 minutes;
  rememberMeExchangeThreshold = 14 * 24 * 60 * 60 * 1000; // 14 days
  url = {
    loginRedirect: '/',
    api: 'https://api.site.com',
    portal: 'https://portal.site.com/#/',
    graphql: 'https://api.site.com/graphql',
    graphqlSubscriptions: 'wss://api.site.com/graphql',
  };
}
