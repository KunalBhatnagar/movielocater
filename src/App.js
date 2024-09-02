import React, { useState } from 'react';
import axios from 'axios';
import MovieList from './component/MovieList';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/api/search?q=${query}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div className="App container" >
      <h1 className="text-center my-4">Search any</h1>
      <form onSubmit={searchMovies} className="form-inline justify-content-center mb-4">
        <input
          type="text"
          className="form-control mr-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie or series"
        />
        <div className="d-grid gap-2 p-2 col-2 mx-auto" >
        <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
