export const PORT = parseInt(process.env.PORT || '9000', 10);
export const TOPIC_CARTS_CREATE = 'orders';
export const HEADER_SHOPIFY_TOPIC = 'x-shopify-topic';
export const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET || 'x-shopify-secret';