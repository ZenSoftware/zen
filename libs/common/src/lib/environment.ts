export abstract class Environment {
  abstract readonly production: boolean;
  abstract readonly url: {
    readonly api: string;
    readonly portal: string;
    readonly graphql: string;
    readonly graphqlSubscriptions: string;
  };
}

export class EnvironmentCommonDev implements Environment {
  production = false;
  url = {
    api: 'http://localhost:7080',
    portal: 'http://localhost:4200/#/',
    graphql: 'http://localhost:7080/graphql',
    graphqlSubscriptions: 'ws://localhost:7080/graphql',
  };
}

export class EnvironmentCommonProd implements Environment {
  production = true;
  assetRoot = './assets';
  url = {
    api: 'https://api.zensoftware.ca',
    portal: 'https://zensoftware.ca/#/',
    graphql: 'https://api.zensoftware.ca/graphql',
    graphqlSubscriptions: 'wss://api.zensoftware.ca/graphql',
  };
}
