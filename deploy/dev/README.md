# Kubernetes Local Dev Environment
Install Rancher Desktop: https://rancherdesktop.io/

Review simplest k8s deployment example utilizing Rancher Desktop: [jwsy/simplest-k8s](https://github.com/jwsy/simplest-k8s/tree/mount-local)

```bash
# Expose PostgreSQL pod via port forward
kubectl port-forward <POSTGRES_POD> 5446:5432

# Run prisma migration with modified .env file
# DATABASE_URL=postgresql://ZenAdmin:temp@localhost:5446/zen 
npm run prisma:migrate

# Connect to DB with psql to verify
psql -h localhost -U ZenAdmin -p 5446
```

Modify `libs/common/src/lib/environment.ts` to point to local k8s
```ts
export class EnvironmentDev implements Environment {
  //...
  url = {
    loginRedirect: '/',
    api: 'http://zen.rancher.localhost',
    portal: 'http://localhost:4200/#/',
    graphql: 'http://zen.rancher.localhost/graphql',
    graphqlSubscriptions: 'ws://zen.rancher.localhost/graphql',
  };
}
```

Run `npm start` to start Angular app