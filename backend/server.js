const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

// Cache helper
const cache = new Map();
const getCacheKey = (endpoint, params) => `${endpoint}-${JSON.stringify(params)}`;

/* ============ ERROR HANDLER MIDDLEWARE ============ */
const handleError = (error, res) => {
  console.error('API Error:', error.message);
  const status = error.response?.status || 500;
  const message = error.response?.data?.status_message || 'Internal server error';
  res.status(status).json({ error: message || 'Failed to fetch data' });
};

/* ============ SEARCH (movies + TV) ============ */
app.get('/api/search', async (req, res) => {
  const { q, page = 1 } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
      params: {
        api_key: API_KEY,
        query: q,
        page: page,
        include_adult: false,
      }
    });
    res.json(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

/* ============ TRENDING MOVIES ============ */
app.get('/api/trending', async (req, res) => {
  const { timeWindow = 'week' } = req.query;
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/trending/movie/${timeWindow}`,
      { params: { api_key: API_KEY } }
    );
    res.json(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

/* ============ POPULAR MOVIES ============ */
app.get('/api/popular', async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/popular`,
      { params: { api_key: API_KEY, page: page } }
    );
    res.json(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

/* ============ TOP RATED MOVIES ============ */
app.get('/api/top-rated', async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/top_rated`,
      { params: { api_key: API_KEY, page: page } }
    );
    res.json(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

/* ============ MOVIE DETAILS ============ */
app.get('/api/movie/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}`,
      { params: { api_key: API_KEY } }
    );
    res.json(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

/* ============ MOVIE CREDITS ============ */
app.get('/api/movie/:id/credits', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}/credits`,
      { params: { api_key: API_KEY } }
    );
    res.json(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

/* ============ SIMILAR MOVIES ============ */
app.get('/api/movie/:id/similar', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}/similar`,
      { params: { api_key: API_KEY } }
    );
    res.json(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

/* ============ STREAMING PROVIDERS ============ */
app.get('/api/streaming/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}/watch/providers`,
      { params: { api_key: API_KEY } }
    );
    res.json(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

/* ============ REVIEWS ============ */
app.get('/api/movie/:id/reviews', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}/reviews`,
      { params: { api_key: API_KEY } }
    );
    res.json(response.data);
  } catch (error) {
    handleError(error, res);
  }
});

/* ============ HEALTH CHECK ============ */
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

/* ============ ERROR HANDLING ============ */
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

/* ============ SERVER ============ */
/* ============ SERVER ============ */
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
//   console.log(`📺 TMDB API Key: ${API_KEY ? '✓ Connected' : '✗ Not set'}`);
// });

module.exports = app;
