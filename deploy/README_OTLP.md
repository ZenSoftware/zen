# OTLP dev setup notes

[Start Jaeger](https://www.jaegertracing.io/docs/1.45/getting-started/) with docker with the command:

```bash
docker run -d --name jaeger -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 -e COLLECTOR_OTLP_ENABLED=true -p 6831:6831/udp -p 6832:6832/udp -p 5778:5778 -p 16686:16686 -p 4317:4317 -p 4318:4318 -p 14250:14250 -p 14268:14268 -p 14269:14269 -p 9411:9411 jaegertracing/all-in-one:latest
```

Set `openTelemetry.traceExporter.url` in then environment variables at `apps/api/src/environments/environment.ts`

```ts
export const environment: EnvironmentBase = {
  // ...
  openTelemetry: {
    serviceName: 'zen-api',
    exporters: { enableConsole: true, enableOtlp: true },
    traceExporter: {
      url: 'http://localhost:4318/v1/traces',
    },
  },
};
```
Start the `api` Nx app.

Navigate to http://localhost:16686