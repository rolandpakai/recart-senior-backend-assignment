import { Router, Request, Response } from 'express';
import { SubscriptionSchema } from '../schemas/SubscriptionSchema';
import { createSubscriber } from '../db/dao/subscriber-dao';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const validatedBody = SubscriptionSchema.safeParse(req.body);

  if (validatedBody.success) {
    const { name, topic, url } = validatedBody.data;

    await createSubscriber({ name, topic, url });
    res.status(201).json({ message: `Subscription was successfully for topic: ${topic}` });
  } else {
    const errors = validatedBody.error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    
    res.status(400).json({ error: errors });
  }
});

export default router;