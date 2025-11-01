// index.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow frontend to call your proxy
app.use(express.json());

// Proxy endpoint for /join
app.post('/join', async (req, res) => {
  const { pin, amount } = req.body;

  try {
    const response = await fetch('https://killhoot.xyz/api/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin, amount })
    });

    const data = await response.json();
    res.json(data); // Send KillHoot response back to frontend
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// Optional: Proxy /status endpoint
app.get('/status', async (req, res) => {
  try {
    const response = await fetch('https://killhoot.xyz/api/status');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
