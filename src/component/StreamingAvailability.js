import React, { useState, useEffect } from "react";
import { movieAPI } from "../utils/api";
import { Loader } from "lucide-react";

const StreamingAvailability = ({ movieId }) => {
  const [platforms, setPlatforms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreamingPlatforms = async () => {
      try {
        setLoading(true);
        const response = await movieAPI.getStreamingProviders(movieId);
        const results = response.data.results;

        // Get US platforms or fall back to first available country
        const usPlatforms = results.US?.flatrate || Object.values(results)[0]?.flatrate || [];
        setPlatforms(usPlatforms);
        setError(null);
      } catch (error) {
        console.error("Error fetching streaming platforms:", error);
        setError("Unable to fetch streaming platforms");
        setPlatforms([]);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchStreamingPlatforms();
  }, [movieId]);

  if (loading) {
    return (
      <div className="glass-sm rounded-lg p-4 flex items-center gap-2">
        <Loader size={16} className="animate-spin" />
        <span className="text-sm text-slate-300">Loading streaming info...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-sm rounded-lg p-4 text-red-400 text-sm">
        {error}
      </div>
    );
  }

  if (platforms.length === 0) {
    return (
      <div className="glass-sm rounded-lg p-4 text-slate-400 text-sm">
        Streaming info not available in your region
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-slate-200">📺 Available On:</h4>
      <div className="flex flex-wrap gap-3">
        {platforms.map((platform) => (
          <a
            key={platform.provider_id}
            href={`https://www.themoviedb.org/movie/${movieId}/watch`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            title={platform.provider_name}
          >
            <div className="glass-sm rounded-lg p-2 hover:shadow-glow-pink transition-all">
              <img
                src={`https://image.tmdb.org/t/p/w45${platform.logo_path}`}
                alt={platform.provider_name}
                className="h-10 w-10 rounded object-cover transition-transform group-hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-8 left-0 glass-sm px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {platform.provider_name}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default StreamingAvailability;
