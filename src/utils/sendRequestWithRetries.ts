/* eslint-disable no-console */
import waitFor from "./waitFor";
import { requestLatency, requestErrors } from "../monitoring";
import { WebhookQueueData } from "../types/WebhookQueueData";
import { HEADER_SHOPIFY_TOPIC } from "../defaults";

type RequestWithRetriesParams = WebhookQueueData & {
  triesLeft?: number;
};

const sendRequestWithRetries = async ({ topic, url, data, triesLeft = 3}: RequestWithRetriesParams) => {
  const startTime = process.hrtime();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [HEADER_SHOPIFY_TOPIC]: topic,
      },
      body: JSON.stringify(data),
    });

    const duration = process.hrtime(startTime);
    const elapsedTime = duration[0] + duration[1] / 1e9;
    requestLatency.labels(url).observe(elapsedTime);
  
    if (!response.ok) {
      requestErrors.labels(url, response.status.toString()).inc();
      console.log(`Failed to send request, tries left: ${triesLeft}`);
      if (triesLeft === 0) {
        throw new Error(`Failed to send request: ${response.json()}`);
      }

      await waitFor(1000);
      await sendRequestWithRetries({ topic, url, data, triesLeft: triesLeft - 1 });
    }
  } catch (error: unknown) {
    requestErrors.labels(url, 'network_error').inc();
    console.log(`Failed to send request, tries left: ${triesLeft}`, error);
    if (triesLeft === 0) throw error;

    await waitFor(1000);
    await sendRequestWithRetries({ topic, url, data, triesLeft: triesLeft - 1 });
  }
}

export default sendRequestWithRetries;