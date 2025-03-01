import { Request, Response } from 'express';
import { collectDefaultMetrics, Counter, Histogram, Registry } from 'prom-client';

const register = new Registry();
collectDefaultMetrics({ register });

export const requestLatency = new Histogram({
  name: 'webhook_request_latency_seconds',
  help: 'Duration of webhook requests in seconds',
  labelNames: ['subscriber'],
  buckets: [0.1, 0.5, 1, 2, 5, 10],
});

export const requestErrors = new Counter({
  name: 'webhook_request_errors_total',
  help: 'Total number of failed webhook requests',
  labelNames: ['subscriber', 'status_code'],
});

register.registerMetric(requestLatency);
register.registerMetric(requestErrors);

export const metricsEndpoint = async (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
};

export { register };
