/* eslint-disable no-console */
import waitFor from "./waitFor";

type RequestWithRetriesParams = {
  url: string;
  data: unknown;
  triesLeft?: number;
};

const sendRequestWithRetries = async ({ url, data, triesLeft = 3}: RequestWithRetriesParams) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      console.log(`Failed to send request, tries left: ${triesLeft}`);
      if (triesLeft === 0) {
        throw new Error(`Failed to send request: ${response.json()}`);
      }

      await waitFor(5000);
      await sendRequestWithRetries({ url, data, triesLeft: triesLeft - 1 });
    }
  } catch (error: unknown) {
    console.log(`Failed to send request, tries left: ${triesLeft}`, error);
    if (triesLeft === 0) throw error;

    await waitFor(5000);
    await sendRequestWithRetries({ url, data, triesLeft: triesLeft - 1 });
  }
}

export default sendRequestWithRetries;