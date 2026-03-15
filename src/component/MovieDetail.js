import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Star, Clock, Dumbbell, Heart } from 'lucide-react';
import { movieAPI } from '../utils/api';
import StreamingAvailability from './StreamingAvailability';
import SimilarMovies from './SimilarMovies';
import { formatDate, formatRating, getImageUrl } from '../utils/helpers';
import { useFavorites } from '../hooks/useCustom';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);

        // Fetch movie details
        const movieResponse = await movieAPI.getDetails(id);
        setMovie(movieResponse.data);

        // Fetch credits
        try {
          const creditsResponse = await movieAPI.getCredits(id);
          setCredits(creditsResponse.data);
        } catch {
          console.log('Credits not available');
        }

        setError('');
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to fetch movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin mb-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-pink-500 rounded-full"></div>
          </div>
          <p className="text-slate-400">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-lg rounded-xl p-8 max-w-md text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="glass hover:shadow-glow px-4 py-2 rounded-lg transition-all text-sm font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-slate-400">Movie not found</div>
      </div>
    );
  }

  const director = credits?.crew?.find((c) => c.job === 'Director');
  const cast = credits?.cast?.slice(0, 5) || [];
  const isFav = isFavorite(movie.id);

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Background */}
      <div
        className="relative h-96 md:h-[500px] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'w1280')})`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 glass-lg p-3 hover:shadow-glow transition-all z-10"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(movie)}
          className="absolute top-6 right-6 glass-lg p-3 hover:shadow-glow-pink transition-all z-10"
        >
          <Heart
            size={24}
            className={isFav ? 'fill-red-500 text-red-500' : 'text-white'}
          />
        </button>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="flex justify-center md:justify-start">
            <img
              src={getImageUrl(movie.poster_path, 'w342')}
              alt={movie.title}
              className="w-48 h-72 glass rounded-xl object-cover shadow-2xl"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22450%22%3E%3Crect fill=%221e293b%22 width=%22300%22 height=%22450%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2216%22 fill=%2294a3b8%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3ENo Image%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>

          {/* Movie Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-3">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="glass-sm px-4 py-2 rounded-lg flex items-center gap-2">
                  <Star size={18} className="text-yellow-400" fill="currentColor" />
                  <span className="font-bold">{formatRating(movie.vote_average)}</span>
                </div>
                <div className="text-slate-400 text-sm">
                  {movie.vote_count.toLocaleString()} votes
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="glass-sm rounded-lg p-3 text-center">
                <Calendar size={18} className="mx-auto mb-2 text-indigo-400" />
                <p className="text-xs text-slate-400 mb-1">Release</p>
                <p className="text-sm font-semibold">{formatDate(movie.release_date)}</p>
              </div>
              <div className="glass-sm rounded-lg p-3 text-center">
                <Clock size={18} className="mx-auto mb-2 text-pink-400" />
                <p className="text-xs text-slate-400 mb-1">Duration</p>
                <p className="text-sm font-semibold">{movie.runtime} min</p>
              </div>
              <div className="glass-sm rounded-lg p-3 text-center">
                <Dumbbell size={18} className="mx-auto mb-2 text-green-400" />
                <p className="text-xs text-slate-400 mb-1">Budget</p>
                <p className="text-sm font-semibold">
                  {movie.budget ? `$${(movie.budget / 1000000).toFixed(0)}M` : 'N/A'}
                </p>
              </div>
              <div className="glass-sm rounded-lg p-3 text-center">
                <Dumbbell size={18} className="mx-auto mb-2 text-cyan-400" />
                <p className="text-xs text-slate-400 mb-1">Revenue</p>
                <p className="text-sm font-semibold">
                  {movie.revenue ? `$${(movie.revenue / 1000000).toFixed(0)}M` : 'N/A'}
                </p>
              </div>
            </div>

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <div>
                <p className="text-slate-400 text-sm mb-2">Genre</p>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="glass-sm px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Overview</h3>
              <p className="text-slate-300 leading-relaxed">
                {movie.overview || 'No overview available'}
              </p>
            </div>

            {/* Director */}
            {director && (
              <div>
                <p className="text-slate-400 text-sm mb-2">Director</p>
                <p className="text-lg font-semibold">{director.name}</p>
              </div>
            )}

            {/* Cast */}
            {cast.length > 0 && (
              <div>
                <p className="text-slate-400 text-sm mb-3">Top Cast</p>
                <div className="flex flex-wrap gap-2">
                  {cast.map((actor) => (
                    <span key={actor.id} className="glass-sm px-3 py-1 rounded-lg text-sm">
                      {actor.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Streaming Availability */}
        <div className="mt-12 glass-lg rounded-xl p-6">
          <StreamingAvailability movieId={id} />
        </div>

        {/* Similar Movies */}
        <div className="mt-12">
          <SimilarMovies movieId={id} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
