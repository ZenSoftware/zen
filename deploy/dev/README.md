# Kubernetes Local Dev Environment
- Install [Rancher Desktop](https://rancherdesktop.io/)

- Review [simplest k8s deployment example](https://github.com/jwsy/simplest-k8s/tree/mount-local)

- Build the API docker image via `npm run prod:api`.  It will utilize the production environment variables in `apps/api/src/environments/environment.prod.ts` and produce a Docker image tagged `zen-api:latest`

- Fill out the `k8s-secrets.yaml` in this directory.

```bash
# Apply the manifests in the following order
kubectl apply -f deploy/dev/k8s-secrets.yaml
kubectl apply -f deploy/dev/k8s-postgres.yaml
kubectl apply -f deploy/dev/k8s-setup.yaml
```

```bash
# Expose PostgreSQL pod via port forward
kubectl port-forward <POSTGRES_POD> 5446:5432

# Set the port for the DATABASE_URL in the .env file to point to k8s
# Run the prisma migration
npx prisma deploy

# Connect to the DB via psql to verify succesful DB deployment
psql -h localhost -U zenadmin -p 5446
```

Modify `libs/common/src/lib/environment.ts` to point to the local k8s deployment.
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

- Run `npm start` to start the Angular app to test the API running in k8s.

- To build the build the static HTML/CSS assets for production, utilize the npm script `npm run prod:apps`