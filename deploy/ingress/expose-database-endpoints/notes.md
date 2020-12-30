## Modify deployment

Export yaml for ingress controller deployment
```bash
kubectl get deployments nginx-ingress-ingress-nginx-controller -o yaml --namespace=ingress-zen
```

Under **spec.container.args**
```yaml
- '--tcp-services-configmap=default/nginx-tcp-services'
```

Also include the following under **spec.container.ports**
```yaml
- containerPort: 5432
  name: postgres
  protocol: TCP
```

## Modify service

Export yaml for ingress controller service
```
kubectl get services nginx-ingress-ingress-nginx-controller -o yaml --namespace=ingress-zen
```

Under **spec.ports: []**
```yaml
- name: postgres
  port: 5432
  protocol: TCP
  targetPort: 5432
```

