import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { SHOPIFY_WEBHOOK_SECRET } from '../defaults';

export const verifyShopifyWebhook = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const hmac = req.headers['x-shopify-hmac-sha256'] as string;
    if (!hmac) {
      res.status(401).json({ error: 'Missing HMAC signature' });
      return;
    }

    // Compute expected HMAC signature
    const body = JSON.stringify(req.body);
    const expectedHmac = crypto
      .createHmac('sha256', SHOPIFY_WEBHOOK_SECRET)
      .update(body, 'utf8')
      .digest('base64');

    if (crypto.timingSafeEqual(Buffer.from(hmac, 'utf8'), Buffer.from(expectedHmac, 'utf8'))) {
      next();
    } else {
      res.status(401).json({ error: 'Invalid HMAC signature' });
    }
  } catch (error) {
    console.error('Webhook verification failed:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};