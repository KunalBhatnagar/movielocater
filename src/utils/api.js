import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000, // Increased from 10s to 30s
});

// Add error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// Movie endpoints
export const movieAPI = {
  search: (query, page = 1) =>
    api.get('/search', { params: { q: query, page } }),
  
  trending: (timeWindow = 'week') =>
    api.get('/trending', { params: { timeWindow } }),
  
  popular: (page = 1) =>
    api.get('/popular', { params: { page } }),
  
  topRated: (page = 1) =>
    api.get('/top-rated', { params: { page } }),
  
  getDetails: (movieId) =>
    api.get(`/movie/${movieId}`),
  
  getCredits: (movieId) =>
    api.get(`/movie/${movieId}/credits`),
  
  getSimilar: (movieId) =>
    api.get(`/movie/${movieId}/similar`),
  
  getStreamingProviders: (movieId) =>
    api.get(`/streaming/${movieId}`),
  
  getReviews: (movieId) =>
    api.get(`/movie/${movieId}/reviews`),
  
  health: () =>
    api.get('/health'),
};

export default api;
