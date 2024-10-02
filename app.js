const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.json());

app.use(cors());

// Endpoint to fetch cryptocurrency market data
app.get('/coins', async (req, res) => {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false';
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-pro-api-key': process.env.COIN_GECKO_API_KEY
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

//ChatBot

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message.toLowerCase();

  try {
    
      const response = await fetch(
          'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3',
          {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer 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`,  // Replace with your Hugging Face API Key
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ inputs: `Human: ${userMessage}\nAI:` }),
          }
      );
      const data = await response.json();
      let botReply = "Sorry, I don't have an answer for that.";
      if (data && data[0] && data[0].generated_text) {
          botReply = data[0].generated_text;
      }
      res.json({ reply: botReply });

  } catch (error) {
      console.error('Error processing the request:', error);
      res.status(500).json({ reply: 'Sorry, something went wrong!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
