/* eslint-disable no-console */
import { createPartner } from "./dao/partner-dao";

const seedDb = async () => {
  try {
    const partner = {
      name: 'Awesome Reviews',
      topic: 'orders',
      url: 'https://www.awesome-reviews.com/api/v1/orders',
    }

    const partnerDoc = await createPartner(partner);
    console.log('Partner created:', partnerDoc);
  } catch (err) {
    console.error('Error creating shop:', err);
  }
}

export default seedDb;