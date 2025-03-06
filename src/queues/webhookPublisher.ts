import { webhookQueue } from './webhookQueue';
import { WebhookQueueData } from '../types/WebhookQueueData';

export const webhookPublisher = async ({topic, url, data}: WebhookQueueData) => {
  await webhookQueue.add('webhook-event', { topic, url, data });
};
