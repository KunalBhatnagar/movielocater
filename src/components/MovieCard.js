import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { formatRating, getImageUrl, truncateText } from '../utils/helpers';

const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450'%3E%3Crect fill='%231e293b' width='300' height='450'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%2394a3b8' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E`;

const MovieCard = ({ movie, isFavorite, onFavoriteToggle }) => {
  const rating = movie.vote_average || 0;
  const title = movie.title || movie.name;
  const imageUrl = getImageUrl(movie.poster_path, 'w500');

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="glass rounded-lg overflow-hidden group cursor-pointer h-full transition-all hover:shadow-glow">
        {/* Image Container */}
        <div className="relative w-full h-64 overflow-hidden bg-slate-800">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
            onError={(e) => {
              e.target.src = PLACEHOLDER_SVG;
            }}
          />
          
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <div className="w-full text-white">
              <p className="text-xs font-medium mb-1">{formatDate(movie.release_date)}</p>
              <p className="text-xs text-slate-300">{truncateText(movie.overview, 60)}</p>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 glass-sm flex items-center gap-1 px-2 py-1">
            <Star size={14} className="text-yellow-400" fill="currentColor" />
            <span className="text-xs font-bold text-white">{formatRating(rating)}</span>
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              onFavoriteToggle?.(movie);
            }}
            className="absolute top-2 left-2 glass-sm p-2 rounded-lg hover:bg-opacity-20 transition-all"
          >
            <Heart
              size={18}
              className={isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm text-white line-clamp-2 group-hover:text-indigo-400 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-slate-400">
            {movie.media_type === 'tv' ? '📺 TV Series' : '🎬 Movie'}
          </p>
        </div>
      </div>
    </Link>
  );
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).getFullYear();
};

export default MovieCard;
