# 🎬 CineLocate - Modern Movie Discovery Platform

A sleek, modern movie discovery platform with Apple-style glass morphism UI. Search and discover movies, view streaming availability, and save your favorite films.

## ✨ Features

- 🔍 **Advanced Search** - Search movies and TV shows with debounced input
- 🔥 **Trending Movies** - Discover what's trending this week
- ⭐ **Top Rated** - Browse the highest-rated movies
- 💫 **Popular** - Find popular movies and shows
- ❤️ **Favorites** - Save and manage your favorite movies (localStorage)
- 📺 **Streaming Availability** - See where you can watch each movie
- 🎨 **Apple Glass Morphism UI** - Modern frosted glass design
- 🌙 **Smooth Animations** - Elegant transitions and interactions
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast & Optimized** - Built with React & Tailwind CSS

## 🛠 Tech Stack

- **Frontend**: React 18, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend**: Express.js, Axios
- **API**: TMDB (The Movie Database)
- **Styling**: Glass Morphism, Gradient UI

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API Key (get it from [themoviedb.org](https://www.themoviedb.org/settings/api))

## 🚀 Quick Start

### 1. Clone and Install Dependencies

```bash
cd movielocater
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
TMDB_API_KEY=your_tmdb_api_key_here
PORT=4000
```

Or copy from the example:

```bash
cp .env.example .env
```

### 3. Start the Backend Server

In a new terminal:

```bash
npm run server
```

The server will run on `http://localhost:4000`

### 4. Start the Frontend (in another terminal)

```bash
npm start
```

The app will open at `http://localhost:3000`

## 📂 Project Structure

```
src/
├── components/           # Reusable components
│   ├── Header.js
│   ├── SearchBar.js
│   ├── MovieCard.js
│   ├── MovieCategory.js
│   ├── LoadingSkeleton.js
│   └── FavoritesView.js
├── component/            # Page components
│   ├── MovieList.js
│   ├── MovieDetail.js
│   └── StreamingAvailability.js
├── hooks/                # Custom React hooks
│   └── useCustom.js     # useDebounce, useFavorites, useDarkMode
├── utils/                # Utility functions
│   ├── api.js           # API client
│   └── helpers.js       # Helper functions
├── App.js               # Main app component
├── App.css              # App styles
└── index.css            # Global & Tailwind styles

backend/
└── server.js            # Express server with TMDB API routes
```

## 🎯 Key Features Explained

### Glass Morphism Design
The app uses modern glass morphism effects with:
- Frosted glass background with blur
- Semi-transparent borders
- Gradient overlays
- Smooth transitions

### Smart Search
- **Debounced input** - Reduces API calls
- **Real-time results** - Instant feedback
- **Clear button** - Easy query reset

### Favorites System
- Stores favorites in browser `localStorage`
- Persistent across sessions
- Quick add/remove toggle

### Movie Details
- **Rich information** - Rating, runtime, budget, revenue
- **Cast & Credits** - Director and cast details
- **Similar Movies** - Discover related content
- **Streaming Providers** - Where to watch

## 🎨 Design Highlights

### Color Palette
- **Primary**: Indigo (#6366f1) & Pink (#ec4899)
- **Background**: Navy Blue (#0f172a) to Slate (#1a1f3a)
- **Text**: Light Slate (#f1f5f9)
- **Glass**: Semi-transparent white overlays

### Animations
- Fade in on load
- Slide in from bottom
- Scale up on interaction
- Hover effects on cards
- Smooth transitions

## 🔌 API Endpoints

- `GET /api/search?q=query` - Search movies/TV
- `GET /api/trending?timeWindow=week` - Trending movies
- `GET /api/popular?page=1` - Popular movies
- `GET /api/top-rated?page=1` - Top rated movies
- `GET /api/movie/:id` - Movie details
- `GET /api/movie/:id/credits` - Cast and crew
- `GET /api/movie/:id/similar` - Similar movies
- `GET /api/streaming/:id` - Streaming providers
- `GET /api/movie/:id/reviews` - Movie reviews

## 🤝 Contributing

Feel free to fork, create a branch, and submit PRs!

## 📝 License

MIT License - feel free to use this project

## 🙏 Acknowledgments

- TMDB for the movie database API
- Tailwind CSS for the utility framework
- Lucide Icons for beautiful icons

## 📞 Support

For issues or suggestions, please create an issue in the repository.

---

**Built with ❤️ for movie lovers**
