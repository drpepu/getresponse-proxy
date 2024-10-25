import axios from 'axios';

const API_KEY = process.env.API_KEY;

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, listId } = req.body;

  try {
    const response = await axios.post(
      'https://api.getresponse.com/v3/contacts',
      {
        email: email,
        campaign: { campaignId: listId },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': `api-key ${API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error adding subscriber:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to add subscriber', details: error.message });
  }
};
