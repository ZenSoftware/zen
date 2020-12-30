# Create an ingress controller with a static public IP address in Azure Kubernetes Service (AKS)
# https://docs.microsoft.com/en-us/azure/aks/ingress-static-ip

az aks show --resource-group zen --name zen --query nodeResourceGroup -o tsv
> MC_oss_oss_centralus

az network public-ip create --resource-group MC_oss_oss_centralus --name myAKSPublicIP --sku Standard --allocation-method static --query publicIp.ipAddress -o tsv
> 52.154.153.45

kubectl create namespace ingress-zen

helm install nginx-ingress ingress-nginx/ingress-nginx --namespace ingress-zen --set controller.replicaCount=2 --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux --set controller.service.loadBalancerIP="52.154.153.45" --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-dns-label-name"="ossdns"

# View assigned ingress static IP
kubectl --namespace ingress-zen get services -o wide -w nginx-ingress-ingress-nginx-controller

# Verify that the DNS name label has been applied by querying the FQDN on the public IP 
az network public-ip list --resource-group MC_oss_oss_centralus --query "[?name=='myAKSPublicIP'].[dnsSettings.fqdn]" -o tsv
> ossdns.centralus.cloudapp.azure.com




# Label the cert-manager namespace to disable resource validation
kubectl label namespace ingress-zen cert-manager.io/disable-validation=true

# Add the Jetstack Helm repository
helm repo add jetstack https://charts.jetstack.io

# Update your local Helm chart repository cache
helm repo update

# Install the cert-manager Helm chart
helm install cert-manager --namespace ingress-zen --version v1.0.3 --set installCRDs=true --set nodeSelector."beta\.kubernetes\.io/os"=linux jetstack/cert-manager

# Create a cluster issuer
kubectl apply -f deploy/ingress/issuer-staging.yaml --namespace ingress-zen
kubectl apply -f deploy/ingress/issuer-prod.yaml --namespace ingress-zen


# After deploying first ingress, check to see if certificate was issued successfuly
kubectl describe certificate tls-secret

# Display an ingress controller nginx.conf
kubectl exec -n ingress-zen nginx-ingress-ingress-nginx-controller-76cd47bb89-5g6dt -- cat /etc/nginx/nginx.conf