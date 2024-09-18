const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config(); // To load environment variables from a .env file

const app = express();
const PORT = 3000; // Set the port to 3000

// Endpoint to fetch cryptocurrency market data
app.get('/coins', async (req, res) => {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-pro-api-key': process.env.COIN_GECKO_API_KEY  // Ensure your API key is set in your environment
    }
  };

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data); // Send the data as JSON response to the client
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from CoinGecko API' });
  }
});

// Start the server and listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
