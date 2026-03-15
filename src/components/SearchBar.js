import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../hooks/useCustom';

const SearchBar = ({ onSearch, onClear, isLoading }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const inputRef = useRef(null);

  React.useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleClear = () => {
    setQuery('');
    onClear();
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="glass rounded-xl p-1 flex items-center gap-2">
          <Search size={20} className="text-indigo-400 ml-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, TV shows..."
            className="flex-1 bg-transparent outline-none text-white text-lg placeholder-slate-500 px-2 py-3"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="text-slate-400 hover:text-white transition-colors mr-3"
            >
              <X size={20} />
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="glass-sm hover:shadow-glow px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 mr-1"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
