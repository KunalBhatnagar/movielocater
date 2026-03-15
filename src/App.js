import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieList from './component/MovieList';
import MovieDetail from './component/MovieDetail';
import MovieCategory from './components/MovieCategory';
import LoadingSkeleton from './components/LoadingSkeleton';
import FavoritesView from './components/FavoritesView';
import ErrorBoundary from './components/ErrorBoundary';
import { movieAPI } from './utils/api';
import { useFavorites } from './hooks/useCustom';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setMovies([]);
      setSearchQuery('');
      return;
    }

    try {
      setIsLoading(true);
      setSearchQuery(query);
      const response = await movieAPI.search(query);
      setMovies(response.data.results || []);
    } catch (error) {
      console.error('Error searching movies:', error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    setMovies([]);
    setSearchQuery('');
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen">
          <Header onFavoritesClick={() => setShowFavorites(true)} />

          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <div>
                  {/* Hero Section */}
                  <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden px-4 py-12">
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 -z-10">
                      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500 opacity-20 blur-3xl animate-pulse"></div>
                      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 opacity-20 blur-3xl animate-pulse"></div>
                    </div>

                    <div className="max-w-7xl w-full">
                      {/* Title */}
                      <div className="text-center mb-12">
                        <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-4 animate-fade-in">
                          CineLocate
                        </h1>
                        <p className="text-xl text-slate-400 mb-8 animate-slide-in">
                          Discover where to watch your favorite movies and shows
                        </p>
                      </div>

                      {/* Search Bar */}
                      <div className="max-w-2xl mx-auto mb-12 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                        <SearchBar
                          onSearch={handleSearch}
                          onClear={handleClear}
                          isLoading={isLoading}
                        />
                      </div>

                      {/* Search Results */}
                      {searchQuery && (
                        <div className="mb-12">
                          <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-2">
                              Results for "<span className="text-gradient">{searchQuery}</span>"
                            </h2>
                            <p className="text-slate-400">
                              {isLoading ? 'Searching...' : `Found ${movies.length} results`}
                            </p>
                          </div>
                          {isLoading ? (
                            <LoadingSkeleton />
                          ) : (
                            <MovieList
                              movies={movies}
                              isFavorite={isFavorite}
                              onFavoriteToggle={toggleFavorite}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Categories - Only show when not searching */}
                  {!searchQuery && (
                    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
                      <MovieCategory
                        title="Trending Now"
                        icon="🔥"
                        apiCall={() => movieAPI.trending('week')}
                      />
                      <MovieCategory
                        title="Popular"
                        icon="⭐"
                        apiCall={() => movieAPI.popular()}
                      />
                      <MovieCategory
                        title="Top Rated"
                        icon="🏆"
                        apiCall={() => movieAPI.topRated()}
                      />
                    </div>
                  )}
                </div>
              }
            />

            {/* Trending Page */}
            <Route
              path="/trending"
              element={
                <div className="max-w-7xl mx-auto px-4 py-16">
                  <MovieCategory
                    title="Trending This Week"
                    icon="🔥"
                    apiCall={() => movieAPI.trending('week')}
                  />
                </div>
              }
            />

            {/* Popular Page */}
            <Route
              path="/popular"
              element={
                <div className="max-w-7xl mx-auto px-4 py-16">
                  <MovieCategory
                    title="Popular Movies"
                    icon="⭐"
                    apiCall={() => movieAPI.popular()}
                  />
                </div>
              }
            />

            {/* Movie Detail Page */}
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>

          {/* Favorites Modal */}
          {showFavorites && (
            <FavoritesView onBack={() => setShowFavorites(false)} />
          )}
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
