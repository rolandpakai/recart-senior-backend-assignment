import { Queue } from 'bullmq';
import { redisConfig } from '../redisConfig';

export const webhookQueue = new Queue('webhookQueue', {
  connection: redisConfig,
});
