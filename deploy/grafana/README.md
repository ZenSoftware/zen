# Grafana Notes

[Run Grafana Docker image](https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/)

```bash
# First create a volume
docker volume create grafana-storage

# Run the image on the host network utilizing the above volume
docker run -d --network host --volume grafana-storage:/var/lib/grafana --name grafana grafana/grafana-enterprise:11.0.0
```

Grafana will be running at http://localhost:3000