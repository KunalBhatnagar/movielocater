import React from 'react';

const MovieList = ({ movies }) => {
  return (
    <div className="row">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div className="col-md-4 mb-4" key={movie.id}>
            <div className="card h-100">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title || movie.name}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title || movie.name}</h5>
                <p className="card-text">Media Type: {movie.media_type}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No movies found</p>
      )}
    </div>
  );
};

export default MovieList;
