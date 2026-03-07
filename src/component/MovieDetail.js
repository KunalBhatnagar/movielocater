import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StreamingAvailability from './StreamingAvailability';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:4000/api/movie/${id}`
        );

        setMovie(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to fetch movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  if (!movie) {
    return <div className="text-center mt-5">Movie not found</div>;
  }

  return (
    <div className="movie-detail container mt-4">
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="row">
        <div className="col-md-4">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
              className="img-fluid rounded"
            />
          ) : (
            <div className="text-muted">No image available</div>
          )}
        </div>

        <div className="col-md-8">
          <h1>{movie.title || movie.name}</h1>

          <p>
            <strong>Overview:</strong> {movie.overview || 'N/A'}
          </p>

          <p>
            <strong>Release Date:</strong>{' '}
            {movie.release_date || movie.first_air_date || 'N/A'}
          </p>

          <p>
            <strong>Rating:</strong>{' '}
            {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </p>

          <p>
            <strong>Genres:</strong>{' '}
            {movie.genres?.length
              ? movie.genres.map((g) => g.name).join(', ')
              : 'N/A'}
          </p>

          {/* Streaming platforms */}
          <StreamingAvailability movieId={id} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
