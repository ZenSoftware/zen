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
  MetricReader,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { PrismaInstrumentation } from '@prisma/instrumentation';

import { environment } from './environments/environment';

const logger = new Logger('OTLP');

if (environment.openTelemetry) {
  const resource = Resource.default().merge(
    new Resource({
      [SEMRESATTRS_SERVICE_NAME]: environment.openTelemetry.serviceName,
    })
  );

  const options = environment.openTelemetry.exporters;
  const useTracer = options?.traceConsole || options?.trace;
  const tracerProvider = useTracer ? new NodeTracerProvider({ resource }) : undefined;

  if (options?.traceConsole) {
    tracerProvider?.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
    logger.log('exporting traces to console');
  }

  if (options?.trace) {
    tracerProvider?.addSpanProcessor(new BatchSpanProcessor(new OTLPTraceExporter(options.trace)));
    logger.log(`exporting traces to ${options.trace.url ?? 'http://localhost:4318/v1/traces'}`);
  }
  tracerProvider?.register();

  /**
   * Metrics
   */
  const readers: MetricReader[] = [];

  if (options?.meterConsole) {
    readers.push(
      new PeriodicExportingMetricReader({
        exporter: new ConsoleMetricExporter(),
        // exportIntervalMillis: 3000,
      })
    );
    logger.log('exporting metrics to console');
  }

  if (options?.meter) {
    readers.push(
      new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter(options.meter),
        // exportIntervalMillis: 3000,
      })
    );
    logger.log(`exporting metrics to ${options.meter.url ?? 'http://localhost:4318/v1/metrics'}`);
  }

  const useMeter = options?.meterConsole || options?.meter;
  const meterProvider = useMeter ? new MeterProvider({ resource, readers }) : undefined;

  registerInstrumentations({
    meterProvider,
    instrumentations: [
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
      new GraphQLInstrumentation(),
      new PrismaInstrumentation(),
    ],
  });
}
