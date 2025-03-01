import express from 'express';
import webhooksRouter from './webhooksRouter';
import subscriptionsRouter from './subscriptionsRouter';

const api = express.Router();

api.use('/webhooks', webhooksRouter);
api.use('/subscriptions', subscriptionsRouter);

export default api;