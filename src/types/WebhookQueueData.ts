import { Webhook } from "./Webhook";

export type WebhookQueueData = {
  topic: string;
  url: string;
  data: Webhook;
}
