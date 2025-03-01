import z from "zod";

export const CustomerSchema = z.object({
  id: z.number(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
});

export const LineItemsSchema = z.array(
  z.object({
    id: z.number(),
    product_id: z.string(),
    sku: z.string(),
    title: z.string(),
    quantity: z.number(),
    price: z.number(),
  })
);

export const WebhookSchema = z.object({
  id: z.string(),
  contact_email: z.string(),
  email: z.string(),
  order_number: z.number(),
  customer: CustomerSchema,
  line_items: LineItemsSchema,
});
