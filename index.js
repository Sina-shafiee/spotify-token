const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.get('/getToken', async function (req, res) {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(501).send('Error Message');
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
