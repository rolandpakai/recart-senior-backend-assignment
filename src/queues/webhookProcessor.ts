import { Worker } from 'bullmq';
import { redisConfig } from '../redisConfig';
import { sendRequestWithRetries } from '../utils';

const worker = new Worker(
  'webhookQueue',
  async (job) => {
    await sendRequestWithRetries({ ...job.data });
  },
  {
    connection: redisConfig,
  }
);

worker.on('failed', (job, err) => {
  console.error(`Job ${job!.id} failed:`, err);
});
