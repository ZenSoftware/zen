import { Logger } from '@nestjs/common';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { Resource } from '@opentelemetry/resources';
import {
  ConsoleMetricExporter,
  MeterProvider,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { PrismaInstrumentation } from '@prisma/instrumentation';

import { environment } from './environments/environment';

const logger = new Logger('OTLP');

if (environment.openTelemetry) {
  const resource = Resource.default().merge(
    new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: environment.openTelemetry.serviceName,
    })
  );

  const useTracer =
    environment.openTelemetry.exporters?.traceConsole || environment.openTelemetry.exporters?.trace;
  const tracerProvider = useTracer ? new NodeTracerProvider({ resource }) : undefined;

  if (environment.openTelemetry.exporters?.traceConsole) {
    tracerProvider?.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
    logger.log('exporting traces to console');
  }

  if (environment.openTelemetry.exporters?.trace) {
    tracerProvider?.addSpanProcessor(
      new BatchSpanProcessor(new OTLPTraceExporter(environment.openTelemetry.exporters.trace))
    );
    logger.log(
      `exporting traces to ${
        environment.openTelemetry.exporters.trace.url ?? 'http://localhost:4318/v1/traces'
      }`
    );
  }

  /**
   * Metrics
   */
  const useMeter =
    environment.openTelemetry.exporters?.meterConsole || environment.openTelemetry.exporters?.meter;
  const meterProvider = useMeter ? new MeterProvider({ resource }) : undefined;

  if (environment.openTelemetry.exporters?.meterConsole) {
    meterProvider?.addMetricReader(
      new PeriodicExportingMetricReader({
        exporter: new ConsoleMetricExporter(),
        // exportIntervalMillis: 3000,
      })
    );
    logger.log('exporting metrics to console');
  }

  if (environment.openTelemetry.exporters?.meter) {
    meterProvider?.addMetricReader(
      new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter(environment.openTelemetry.exporters.meter),
        // exportIntervalMillis: 3000,
      })
    );
    logger.log(
      `exporting metrics to ${
        environment.openTelemetry.exporters.meter.url ?? 'http://localhost:4318/v1/metrics'
      }`
    );
  }

  registerInstrumentations({
    tracerProvider,
    meterProvider,
    instrumentations: [
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
      new GraphQLInstrumentation(),
      new PrismaInstrumentation(),
    ],
  });
}
