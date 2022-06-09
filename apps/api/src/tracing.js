const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { GraphQLInstrumentation } = require('@opentelemetry/instrumentation-graphql');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { Resource } = require('@opentelemetry/resources');
const {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} = require('@opentelemetry/sdk-trace-base');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { environment } = require('./environments/environment');

if (environment.openTelemetry) {
  const provider = new NodeTracerProvider({
    resource: Resource.default().merge(
      new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: environment.openTelemetry.serviceName,
      })
    ),
  });

  if (environment.openTelemetry.exporters?.enableConsole) {
    provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  }

  if (environment.openTelemetry.exporters?.enableJaeger) {
    provider.addSpanProcessor(new BatchSpanProcessor(new JaegerExporter()));
  }

  if (environment.openTelemetry.exporters?.enableOtlp) {
    provider.addSpanProcessor(
      new BatchSpanProcessor(new OTLPTraceExporter(environment.openTelemetry.collectorOptions))
    );
  }

  provider.register();

  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
      new GraphQLInstrumentation(),
    ],
  });
}
