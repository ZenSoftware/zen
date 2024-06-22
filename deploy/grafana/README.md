# Grafana Notes

[Run Grafana Docker image](https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/)

```bash
# First create a volume
docker volume create grafana-storage

# Run the image on the host network utilizing the above volume
docker run -d --network host --volume grafana-storage:/var/lib/grafana --name grafana grafana/grafana-enterprise:11.0.0
```

Grafana will be running at http://localhost:3000

[OpenTelemetry: Install the Collector](https://opentelemetry.io/docs/collector/installation/)

[OpenTelemetry: Quick Start](https://opentelemetry.io/docs/collector/quick-start/)

```bash
# Run otel collector
docker run -d -p 8888:8888 -p 8889:8889 -p 13133:13133 -p 4318:4318 -p 55679:55679 otel/opentelemetry-collector:0.103.0
```

```bash
# With config on host
docker run -d -v <FULL_PATH>/config.yaml:/etc/otelcol-contrib/config.yaml --network host otel/opentelemetry-collector-contrib:0.103.0
``` 