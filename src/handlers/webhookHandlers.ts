import { Webhook } from "../types/Webhook";
import { ordersHandler } from "./ordersHandler";

export const webhookHandlers: Record<string, (data: Webhook) => Promise<string>> = {
  'orders': ordersHandler,
};