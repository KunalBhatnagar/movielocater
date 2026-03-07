import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import MovieList from './component/MovieList';
import MovieDetail from './component/MovieDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    <Router>
      <div className="App container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Movie Finder</h1>
                <form onSubmit={searchMovies} className="form-inline justify-content-center mb-4 d-flex ">
                  <input
                    type="text"
                    className="form-control mr-2"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie or series"
                  />
                  <button type="submit" className="btn btn-primary ms-4  rounded  ">Search</button>
                </form>
                <MovieList movies={movies} />
              </>
            }
          />
          <Route path="/movie/:id" element={<MovieDetail />} /> {/* New route for movie details */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
