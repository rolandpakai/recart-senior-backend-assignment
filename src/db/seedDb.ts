/* eslint-disable no-console */
import { Subscriber } from "../types/Subscriber";
import { createSubscriber } from "./dao/subscriber-dao";

const seedDb = async () => {
  try {
    const subscriber = {
      name: 'Awesome Reviews',
      topic: 'orders',
      url: 'https://www.awesome-reviews.com/api/v1/orders',
    } as Subscriber;

    const subscriberDoc = await createSubscriber(subscriber);
    console.log('Subscriber created:', subscriberDoc);
  } catch (err) {
    console.error('Error creating shop:', err);
  }
}

export default seedDb;