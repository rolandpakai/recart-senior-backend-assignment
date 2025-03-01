import { Schema, model } from "mongoose";
import { Subscriber } from "../../types/Subscriber";

const SubscriberSchema = new Schema<Subscriber>({
  name: { type: String, required: true },
  topic: { type: String, required: true },
  url: { type: String, required: true },
  active: { type: Boolean, required: false, default: true },
});

export const SubscriberModel = model('Subscriber', SubscriberSchema);