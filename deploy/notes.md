## Postgres

```sql
-- Drop
SELECT pg_terminate_backend (pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'prisma';
```

```sql
DROP DATABASE prisma;
```

## Setup kubectl credentials
```bash
az login

# List clusters
az aks list -o table

az aks get-credentials -n <yourClusterName> -g <yourResourceGroupName>

kubectl config get-contexts

kubectl config use-context <yourClusterName>
```

## Documentation
```bash
# Build docs
npm run docs

# Push docs gh-pages
git subtree push --prefix documentation origin gh-pages

# Push docs Git/user.github.io
git subtree push --prefix documentation docs master
```

## GPG

```bash
# Decrypt
gpg --output deploy/secrets.zip --decrypt deploy/secrets.zip.gpg

# Encrypt
gpg --output deploy/secrets.zip.gpg -c deploy/secrets.zip
```

## ACR

```bash
# Attach Kubernetes cluster to Azure Container Registry
az aks update -n zen -g zen --attach-acr zenacr

# Login to ACR to enable pushing images to registry
az acr login --name zenacr
```

## Azcopy

[Assign "Storage Blob Data Owner" role to account](https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-rbac-portal)

```bash
azcopy login --tenant-id=<tenantId>
```