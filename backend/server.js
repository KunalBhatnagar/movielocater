import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

/* ---------------- SEARCH (movies + TV) ---------------- */
app.get('/api/search', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/search/multi`,
      {
        params: {
          api_key: API_KEY,
          query: q
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ error: 'Failed to search movies' });
  }
});

/* ---------------- MOVIE DETAILS ---------------- */
app.get('/api/movie/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}`,
      {
        params: { api_key: API_KEY }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Movie details error:', error.message);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

/* ---------------- SIMILAR MOVIES ---------------- */
app.get('/api/movie/:id/similar', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}/similar`,
      {
        params: { api_key: API_KEY }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Similar movies error:', error.message);
    res.status(500).json({ error: 'Failed to fetch similar movies' });
  }
});

/* ---------------- STREAMING PROVIDERS ---------------- */
app.get('/api/streaming/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}/watch/providers`,
      {
        params: { api_key: API_KEY }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Streaming error:', error.message);
    res.status(500).json({ error: 'Failed to fetch streaming data' });
  }
});

/* ---------------- SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
