import z from "zod";

export const SubscriptionSchema = z.object({
  name: z.string(),
  topic: z.string(),
  url: z.string(),
});
