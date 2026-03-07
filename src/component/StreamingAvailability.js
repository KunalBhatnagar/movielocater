import React, { useState, useEffect } from "react";
import axios from "axios";

const StreamingAvailability = ({ movieId }) => {
  const [platforms, setPlatforms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStreamingPlatforms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/streaming/${movieId}`
        );
        const results = response.data.results;

        // Assume we are interested in streaming availability in the US
        const usPlatforms = results.US?.flatrate || [];
        setPlatforms(usPlatforms);
      } catch (error) {
        console.error("Error fetching streaming platforms:", error);
        setError(
          "Failed to fetch streaming platforms. Please try again later."
        );
      }
    };

    fetchStreamingPlatforms();
  }, [movieId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!platforms.length) {
    return <div>Loading streaming platforms...</div>;
  }

  return (
    <div className="streaming-platforms ">
      <h4>Available on:</h4>
      <ul className="platform-list">
        {platforms.map((platform) => (
          <li key={platform.provider_id} className="platform-item ">
            <a
              href={
                platform.link ||
                `https://www.themoviedb.org/movie/${movieId}/watch`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="platform-link"
            >
              <img
                src={`https://image.tmdb.org/t/p/w45${platform.logo_path}`}
                alt={platform.provider_name}
                className="platform-logo rounded-3 mx-auto mb-0 "
              />
              
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamingAvailability;
