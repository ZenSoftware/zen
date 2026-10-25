# OTLP dev setup notes

- [Jaeger Docs](https://www.jaegertracing.io/docs/2.22/getting-started/) with docker with the command:

```bash
docker run --rm --name jaeger -p 16686:16686 -p 4317:4317 -p 4318:4318 -p 5778:5778 -p 9411:9411 cr.jaegertracing.io/jaegertracing/jaeger:2.22.0
```

- Configure your environment variables at `apps/api/src/environments/environment.ts`

```ts
export const environment: EnvironmentBase = {
  // ...
  openTelemetry: {
    serviceName: 'zen-api',
    exporters: {
      trace: { 
        url: 'http://localhost:4318/v1/traces'
      },
      meter: { 
        url: 'http://localhost:4318/v1/metrics'
      },
    },
  },
};
```
- Start the Nx app `api`.
- Navigate to http://localhost:16686