import { subscribersFindByTopic } from "../db/dao/subscriber-dao";
import { webhookPublisher } from "../queues/webhookPublisher";
import { Webhook } from "../types/Webhook";

export const ordersHandler = async (topic: string, webhookData: Webhook): Promise<void> => {
  const subscribers = await subscribersFindByTopic(topic);

  if (!subscribers || subscribers.length === 0) {
    throw new Error(`No subscribers found for topic: ${topic}`);
  }

  for (const subscriber of subscribers) {
    await webhookPublisher({topic, url: subscriber.url, data: webhookData});
  }
}