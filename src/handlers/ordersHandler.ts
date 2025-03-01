import { subscribersFindByTopic } from "../db/dao/subscriber-dao";
import { Webhook } from "../types/Webhook";
import { sendRequestWithRetries } from "../utils";

export const ordersHandler = async (topic: string, webhookData: Webhook): Promise<string> => {
  const subscribers = await subscribersFindByTopic(topic);
  
  if (!subscribers || subscribers.length === 0) {
    throw new Error(`No subscribers found`);
  }

  for (const subscriber of subscribers) {
    await sendRequestWithRetries({
      url: subscriber.url,
      data: webhookData,
    });
  }
  
  return 'ok';
}