import express from 'express';
import promMiddleware from 'express-prometheus-middleware';
import api from './routers/api';
import { metricsEndpoint } from './monitoring';
import { Registry } from 'prom-client';

const app = express();

const options = {
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  promClient: {
    register: new Registry(),
  },
};

app.use(promMiddleware(options));

app.use(express.json());
app.use('/api', api);
app.get('/metrics', metricsEndpoint); 
app.use('/*', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});


export default app;