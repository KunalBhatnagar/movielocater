const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${query}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
