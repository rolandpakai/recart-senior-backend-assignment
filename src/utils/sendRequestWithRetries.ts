/* eslint-disable no-console */
import waitFor from "./waitFor";
import { requestLatency, requestErrors } from "../monitoring";

type RequestWithRetriesParams = {
  url: string;
  data: unknown;
  triesLeft?: number;
};

const sendRequestWithRetries = async ({ url, data, triesLeft = 3}: RequestWithRetriesParams) => {
  const startTime = process.hrtime();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

      await waitFor(5000);
      await sendRequestWithRetries({ url, data, triesLeft: triesLeft - 1 });
    }
  } catch (error: unknown) {
    requestErrors.labels(url, 'network_error').inc();
    console.log(`Failed to send request, tries left: ${triesLeft}`, error);
    if (triesLeft === 0) throw error;

    await waitFor(5000);
    await sendRequestWithRetries({ url, data, triesLeft: triesLeft - 1 });
  }
}

export default sendRequestWithRetries;