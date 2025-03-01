import { Subscriber } from "../../types/Subscriber";
import { SubscriberModel } from "../models/Subscriber";
import { transformMongoId } from "../../utils";

export const createSubscriber = async (Subscriber: Subscriber): Promise<Subscriber> => {
  const created = await SubscriberModel.create(Subscriber);
  return created.toObject({ transform: transformMongoId });
}

export const subscriberFindById =  async (id: string): Promise<Subscriber | null> => {
  const subscriber = await SubscriberModel.findById(id);
  return subscriber ? subscriber.toObject({ transform: transformMongoId }) : null;
}

export const subscriberFindByName = async (name: string): Promise<Subscriber | null> => {
  const subscriber = await SubscriberModel.findOne({ name });
  return subscriber ? subscriber.toObject({ transform: transformMongoId }) : null;
};

export const subscriberFindByNameAndTopic = async ({name, topic}: {name: string, topic: string}): Promise<Subscriber | null> => {
  const subscriber = await SubscriberModel.findOne({ name, topic });
  return subscriber ? subscriber.toObject({ transform: transformMongoId }) : null;
};

export const subscribersFindByTopic = async (topic: string): Promise<Subscriber[] | null> => {
  return await SubscriberModel.find({ topic });
};

export const getAllSubscriber = async (): Promise<Subscriber[]> => {
  return await SubscriberModel.find().lean();
};