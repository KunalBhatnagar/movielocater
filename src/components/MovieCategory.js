import React, { useState, useEffect, useCallback } from 'react';
import MovieCard from './MovieCard';
import LoadingSkeleton from './LoadingSkeleton';
import { useFavorites } from '../hooks/useCustom';

const MovieCategory = ({ title, apiCall, icon = '🎬' }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiCall();
      setMovies(response.data.results?.slice(0, 8) || []);
    } catch (error) {
      console.error(`Error fetching ${title}:`, error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [apiCall, title]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gradient">{icon} {title}</h2>
        <LoadingSkeleton />
      </div>
    );
  }

  if (movies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gradient">{icon} {title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-fade-in">
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

export default MovieCategory;
