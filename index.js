const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;
const API_KEY = 'api-key iqa3sg5vbgr9oq3s55pxslstmbugvov4';
const BASE_URL = 'https://api.getresponse.com/v3/contacts';

app.use(cors());
app.use(express.json());

// Route to add a subscriber
app.post('/add-subscriber', async (req, res) => {
  const { email, name, listId } = req.body;

  console.log('Received request to add subscriber:', { email, name, listId }); // Debugging line

  try {
    const response = await axios.post(
      BASE_URL,
      {
        email: email,
        campaign: { campaignId: listId },
        name: name,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': 'api-key iqa3sg5vbgr9oq3s55pxslstmbugvov4'
        },
      }
    );

    console.log('Response from GetResponse:', response.data); // Debugging line
    res.json(response.data);
  } catch (error) {
    console.error('Error adding subscriber:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to add subscriber', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
