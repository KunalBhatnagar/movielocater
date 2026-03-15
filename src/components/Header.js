import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = ({ onFavoritesClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass-lg sticky top-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-indigo-500 to-pink-500 p-2 rounded-lg group-hover:shadow-glow transition-all">
            <Film size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold text-gradient hidden sm:inline">CineLocate</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/trending">Trending</NavLink>
          <NavLink href="/popular">Popular</NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onFavoritesClick}
            className="glass-sm hover:shadow-glow-pink p-3 rounded-lg transition-all group"
            title="Favorites"
          >
            <Heart size={20} className="group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
          </button>

          {/* Mobile Menu */}
          <button
            className="md:hidden glass-sm p-3 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-lg p-4 mt-2 mx-4 rounded-xl space-y-2 animate-slide-in">
          <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
          <MobileNavLink href="/trending" onClick={() => setIsMenuOpen(false)}>Trending</MobileNavLink>
          <MobileNavLink href="/popular" onClick={() => setIsMenuOpen(false)}>Popular</MobileNavLink>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ href, children }) => (
  <Link
    to={href}
    className="text-slate-300 hover:text-white transition-colors relative group"
  >
    {children}
    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 group-hover:w-full transition-all duration-300"></div>
  </Link>
);

const MobileNavLink = ({ href, onClick, children }) => (
  <Link
    to={href}
    onClick={onClick}
    className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
  >
    {children}
  </Link>
);

export default Header;
