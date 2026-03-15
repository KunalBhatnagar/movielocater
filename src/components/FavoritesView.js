import React from 'react';
import { Heart, ArrowLeft } from 'lucide-react';
import MovieCard from './MovieCard';
import { useFavorites } from '../hooks/useCustom';
import { Link } from 'react-router-dom';

const FavoritesView = ({ onBack }) => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="fixed inset-0 glass-lg z-50 flex items-center justify-center">
        <div className="max-w-md text-center animate-scale-up">
          <button
            onClick={onBack}
            className="absolute top-6 left-6 glass-sm p-3 hover:shadow-glow transition-all"
          >
            <ArrowLeft size={24} />
          </button>

          <Heart size={64} className="mx-auto mb-4 text-slate-600" />
          <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
          <p className="text-slate-400 mb-6">
            Start adding movies to your favorites to see them here!
          </p>
          <button
            onClick={onBack}
            className="glass hover:shadow-glow px-6 py-3 rounded-lg font-medium transition-all"
          >
            Browse Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 glass-lg z-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 sticky top-0 glass-lg -mx-4 px-4 py-4 z-10">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onBack}
              className="glass-sm p-3 hover:shadow-glow transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-gradient">Your Favorites</h1>
              <p className="text-slate-400 text-sm mt-1">
                {favorites.length} movie{favorites.length !== 1 ? 's' : ''} saved
              </p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-8">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={isFavorite(movie.id)}
              onFavoriteToggle={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesView;
