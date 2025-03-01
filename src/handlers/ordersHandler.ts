import { Webhook } from "../types/Webhook";


export const ordersHandler = async (webhookData: Webhook): Promise<string> => {
  return 'ok';
}