import React, { useState, useEffect } from 'react';
import { movieAPI } from '../utils/api';
import MovieCard from '../components/MovieCard';
import { useFavorites } from '../hooks/useCustom';

const SimilarMovies = ({ movieId }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        setLoading(true);
        const response = await movieAPI.getSimilar(movieId);
        setMovies(response.data.results?.slice(0, 8) || []);
      } catch (error) {
        console.error('Error fetching similar movies:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchSimilar();
  }, [movieId]);

  if (loading || movies.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gradient">Similar Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite(movie.id)}
            onFavoriteToggle={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
