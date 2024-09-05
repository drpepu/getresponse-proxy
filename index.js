// index.js
require('dotenv').config(); 

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;
const API_KEY = process.env.API_KEY; 
const BASE_URL = 'https://api.getresponse.com/v3/contacts';

app.use(cors());
app.use(express.json());

// Route to add a subscriber
app.post('/add-subscriber', async (req, res) => {
  const { email, listId } = req.body;

  console.log('Received request to add subscriber:', { email, listId }); 

  try {
    const response = await axios.post(
      BASE_URL,
      {
        email: email,
        campaign: { campaignId: listId },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': `api-key ${API_KEY}` 
        },
      }
    );

    console.log('Response from GetResponse:', response.data); 
    res.json(response.data);
  } catch (error) {
    console.error('Error adding subscriber:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to add subscriber', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
