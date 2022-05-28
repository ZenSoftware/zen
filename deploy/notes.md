## Generate ES256 keys 
Options for JWT configuration: [auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

[Creating Elliptic Curve Keys using OpenSSL](https://www.scottbrady91.com/openssl/creating-elliptical-curve-keys-using-openssl)

```bash
# generate a private key for ES256 
openssl ecparam -name prime256v1 -genkey -noout -out private-key.pem

# generate corresponding public key
openssl ec -in private-key.pem -pubout -out public-key.pem

# base64 encode for k8s secrets JWT_PRIVATE_KEY & JWT_PUBLIC_KEY
cat private-key.pem | base64 -w 0
cat public-key.pem | base64 -w 0
```

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

## Setup Azure kubectl credentials
```bash
az login

# List clusters
az aks list -o table

az aks get-credentials -n <yourClusterName> -g <yourResourceGroupName>

kubectl config get-contexts

kubectl config use-context <yourClusterName>
```

## Generate docs
```bash
# Build docs
npm run docs

# Push docs gh-pages
git subtree push --prefix documentation origin gh-pages

# Push docs Git/user.github.io
git subtree push --prefix documentation docs master
```

## Encrypt files with GPG
```bash
# Decrypt
gpg --output deploy/secrets.zip --decrypt deploy/secrets.zip.gpg

# Encrypt
gpg --output deploy/secrets.zip.gpg -c deploy/secrets.zip
```

## Azure ACR
```bash
# Attach Kubernetes cluster to Azure Container Registry
az aks update -n zen -g zen --attach-acr zenacr

# Login to ACR to enable pushing images to registry
az acr login --name zenacr
```

## azcopy
[Assign "Storage Blob Data Owner" role to account](https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-rbac-portal)

```bash
azcopy login --tenant-id=<tenantId>
```