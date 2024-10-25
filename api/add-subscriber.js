const axios = require('axios');

export default async (req, res) => {
  if (req.method === 'POST') {
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
            'X-Auth-Token': `api-key ${process.env.API_KEY}`,
          },
        }
      );

      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add subscriber', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
