# Kubernetes Local Dev Environment
- Install [Rancher Desktop](https://rancherdesktop.io/)
- Review [simplest k8s deployment example](https://github.com/jwsy/simplest-k8s/tree/mount-local)
- Review GitHub issue [Document an ingress traefix example](https://github.com/rancher-sandbox/rancher-desktop/issues/2460)
- Build the API docker image via `npm run prod:api`.  It will utilize the production environment variables at `apps/api/src/environments/environment.prod.ts` and produce a Docker image tagged `zen-api:latest`
- Fill out `JWT_PRIVATE_KEY` & `JWT_PUBLIC_KEY` under `deploy/dev/k8s-secrets.yaml`.  The other secrets can be left blank.  Refer to `deploy/NOTES.md` for instructions of how to generate keys using openssl.
- Setup a minimal DNS utilizing [nip.io](https://nip.io/)
  - Get your ingress IP via `kubectl get node/<MACHINE_NAME> -o json` under `status.addresses.address` with `"type": "InternalIP"`
  - Edit the `deploy/dev/k8s-setup.yaml` manifest and replace `<IP>` with the IP looked up from the previous step

```bash
# Apply the manifests
kubectl apply -f deploy/dev/k8s-secrets.yaml
kubectl apply -f deploy/dev/k8s-postgres.yaml
kubectl apply -f deploy/dev/k8s-setup.yaml
```

```bash
# Expose PostgreSQL pod via port forward
kubectl get pods
kubectl port-forward <POSTGRES_POD> 5446:5432

# Set the port for the DATABASE_URL in the .env file to 5446
# Run Prisma Migrate
npx prisma migrate deploy --schema apps/api/prisma/schema.prisma

# Connect to the DB via psql to verify succesful DB deployment
psql -h localhost -U zenadmin -p 5446
```

Modify `libs/common/src/lib/environment.ts` to point to the local k8s deployment.  Replace `<IP>` with your ingress IP
```ts
export class EnvironmentDev implements Environment {
  //...
  url = {
    loginRedirect: '/',
    api: 'http://zen.<IP>.nip.io',
    portal: 'http://localhost:4200/#',
    graphql: 'http://zen.<IP>.nip.io/graphql',
    graphqlSubscriptions: 'ws://zen.<IP>.nip.io/graphql',
  };
}
```

- Run `npm start` to start the Angular app to test the API running in k8s

- To build the static HTML/CSS assets for production, utilize the npm script `npm run prod:apps`