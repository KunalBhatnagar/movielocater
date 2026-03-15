import React from 'react';
import MovieCard from '../components/MovieCard';

const MovieList = ({ movies, isFavorite, onFavoriteToggle }) => {
  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center glass-lg rounded-xl p-8 max-w-md">
          <p className="text-slate-400 text-lg mb-2">🎬 No movies found</p>
          <p className="text-slate-500 text-sm">Try searching for your favorite movie or TV show</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-fade-in">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={isFavorite(movie.id)}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
};

export default MovieList;
