export abstract class Environment {
  abstract readonly production: boolean;
  abstract readonly publicRegistration: boolean;
  abstract readonly jwtExchangeInterval: number;
  abstract readonly rememberMeExchangeThreshold: number;
  abstract readonly url: {
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
    api: 'http://localhost:7080',
    portal: 'http://localhost:4200/#/',
    graphql: 'http://localhost:7080/graphql',
    graphqlSubscriptions: 'ws://localhost:7080/graphql',
  };
}

export class EnvironmentProd implements Environment {
  production = true;
  publicRegistration = false;
  jwtExchangeInterval = 30 * 60 * 1000; // 30 minutes;
  rememberMeExchangeThreshold = 14 * 24 * 60 * 60 * 1000; // 14 days
  url = {
    api: 'https://api.site.com',
    portal: 'https://portal.site.com/#/',
    graphql: 'https://api.site.com/graphql',
    graphqlSubscriptions: 'wss://api.site.com/graphql',
  };
}
