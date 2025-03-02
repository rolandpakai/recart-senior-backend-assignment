import { Webhook } from "../types/Webhook";
import { ordersHandler } from "./ordersHandler";

export const webhookHandlers: Record<string, (topic: string, data: Webhook) => Promise<void>> = {
  'orders': ordersHandler,
};