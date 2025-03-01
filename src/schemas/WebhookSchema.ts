import z from "zod";

export const WebhookSchema = z.object({
  id: z.string(),
  topic: z.string(),
});
