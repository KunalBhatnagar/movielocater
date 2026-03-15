/**
 * Format vote average to percentage
 */
export const formatRating = (rating) => {
  if (!rating) return 'N/A';
  return `${(rating * 10).toFixed(0)}%`;
};

/**
 * Format date to readable string
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Generate image URL with fallback
 */
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder-image.svg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, length = 100) => {
  if (!text || text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

/**
 * Get genre colors for badges
 */
export const getGenreColor = (genreId) => {
  const colors = {
    28: 'bg-red-500',
    12: 'bg-blue-500',
    16: 'bg-purple-500',
    35: 'bg-yellow-500',
    80: 'bg-gray-700',
    99: 'bg-green-500',
    18: 'bg-indigo-500',
    10751: 'bg-pink-500',
    14: 'bg-cyan-500',
    36: 'bg-amber-600',
    27: 'bg-red-700',
    10402: 'bg-blue-600',
    9648: 'bg-violet-500',
    10749: 'bg-rose-500',
    878: 'bg-sky-500',
    10770: 'bg-lime-500',
    53: 'bg-slate-700',
    10752: 'bg-orange-700',
    37: 'bg-yellow-700',
  };
  return colors[genreId] || 'bg-slate-600';
};
