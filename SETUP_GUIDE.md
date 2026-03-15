# Installation & Setup Guide

## Project: CineLocate - Modern Movie Discovery Platform

### 🎯 Overview
CineLocate is a fully modernized React application with a stunning Apple-style glass morphism UI. It features advanced search, trending movies, favorites management, and real-time streaming availability.

---

## 📦 Installation Steps

### Step 1: Install Dependencies
```bash
npm install
```

This will install:
- React 18 & React Router
- Tailwind CSS for styling
- Lucide React for icons
- Axios for API calls
- Express & CORS for backend

### Step 2: Get TMDB API Key
1. Visit https://www.themoviedb.org/settings/api
2. Sign up for a free account
3. Generate an API key
4. Save it somewhere safe

### Step 3: Configure Environment
Create a `.env` file in the root directory:

```env
TMDB_API_KEY=your_api_key_here
PORT=4000
```

Or copy from the example:
```bash
cp .env.example .env
```

Then edit `.env` and add your TMDB API key.

### Step 4: Install Tailwind CSS (if needed)
```bash
npm install -D tailwindcss postcss autoprefixer
```

The config files are already created:
- `tailwind.config.js`
- `postcss.config.js`

---

## 🚀 Running the Project

### Terminal 1: Start Backend Server
```bash
npm run server
```
- Runs on: `http://localhost:4000`
- Connects to TMDB API
- Provides movie data endpoints

### Terminal 2: Start Frontend
```bash
npm start
```
- Runs on: `http://localhost:3000`
- Auto-opens in browser
- Hot reload enabled

---

## 🎨 What's New

### Modern UI Components
- **Header** - Sticky navigation with mobile menu
- **SearchBar** - Debounced search with icons
- **MovieCard** - Glass morphism cards with hover effects
- **MovieList** - Responsive grid layout
- **MovieDetail** - Rich detail view with backdrop, cast, crew
- **MovieCategory** - Carousel-like sections
- **LoadingSkeleton** - Beautiful loading placeholders
- **FavoritesView** - Modal favorites manager
- **ErrorBoundary** - Error handling

### Glass Morphism Design
- Frosted glass background with blur effects
- Semi-transparent borders
- Gradient overlays
- Smooth animations
- Professional look

### Features
✅ Search with debouncing
✅ Trending movies
✅ Popular movies
✅ Top rated movies
✅ Favorites (localStorage)
✅ Streaming availability
✅ Similar movies
✅ Cast & Credits
✅ Responsive design
✅ Dark mode ready

---

## 📁 Project Structure

```
movielocater/
├── backend/
│   └── server.js              # Express server with TMDB routes
├── public/
│   └── index.html             # Clean HTML with meta tags
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Header.js
│   │   ├── SearchBar.js
│   │   ├── MovieCard.js
│   │   ├── MovieCategory.js
│   │   ├── LoadingSkeleton.js
│   │   ├── FavoritesView.js
│   │   └── ErrorBoundary.js
│   ├── component/             # Page components
│   │   ├── MovieList.js
│   │   ├── MovieDetail.js
│   │   └── StreamingAvailability.js
│   ├── hooks/
│   │   └── useCustom.js       # Custom hooks (debounce, favorites, etc)
│   ├── utils/
│   │   ├── api.js             # API client with endpoints
│   │   └── helpers.js         # Helper functions
│   ├── App.js                 # Main component
│   ├── App.css                # App-specific styles
│   └── index.css              # Global & Tailwind styles
├── .env.example               # Environment template
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── package.json               # Dependencies
└── README_UPDATED.md          # Full documentation
```

---

## 🔍 API Endpoints

All endpoints are proxies to TMDB:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/search?q=query` | GET | Search movies/TV |
| `/api/trending?timeWindow=week` | GET | Trending content |
| `/api/popular?page=1` | GET | Popular movies |
| `/api/top-rated?page=1` | GET | Highest rated movies |
| `/api/movie/:id` | GET | Movie details |
| `/api/movie/:id/credits` | GET | Cast & crew |
| `/api/movie/:id/similar` | GET | Related movies |
| `/api/streaming/:id` | GET | Streaming providers |
| `/api/movie/:id/reviews` | GET | User reviews |

---

## 🎨 Customization

### Colors
Edit `src/index.css` for custom color variables:
```css
:root {
  --primary: #6366f1;           /* Indigo */
  --secondary: #ec4899;         /* Pink */
  --dark-bg: #0f172a;           /* Dark blue */
  --light-text: #f1f5f9;        /* Light slate */
}
```

### Tailwind Classes
Modify `tailwind.config.js` for custom utilities and animations.

### API Base URL
Edit `src/utils/api.js` to change the backend URL:
```javascript
const API_BASE = 'http://localhost:4000/api';
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Or use different port in .env
PORT=5000
```

### Dependencies Missing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Styles Not Loading
1. Ensure `index.css` starts with `@tailwind` directives
2. Restart the dev server
3. Clear browser cache

### API Key Not Working
1. Verify it's in `.env` (not `.env.local`)
2. Restart the server after changing `.env`
3. Test with: `curl http://localhost:4000/api/health`

---

## 📝 NPM Scripts

```bash
npm start          # Start development server
npm run server     # Start Express backend
npm build          # Build for production
npm test           # Run tests
npm eject          # Eject from Create React App (irreversible!)
```

---

## 🌐 Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the `build/` folder
3. Set environment variables in deployment settings

### Backend (Heroku)
```bash
# Initialize Heroku
heroku login
heroku create your-app-name
git push heroku main
```

---

## 📚 Technologies Used

- **React 18** - UI framework
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon library
- **Axios** - HTTP client
- **Express.js** - Backend server
- **TMDB API** - Movie data

---

## 💡 Tips & Best Practices

1. **Optimize Images** - TMDB images are already optimized
2. **Error Handling** - App includes ErrorBoundary
3. **Responsive** - Mobile-first design approach
4. **Performance** - Debounced search, lazy loading
5. **Accessibility** - Semantic HTML, ARIA labels

---

## 🤝 Support

For issues:
1. Check browser console for errors
2. Verify API key is set correctly
3. Ensure servers are running
4. Clear cache and restart

---

## 📄 License

MIT - Free to use and modify

---

**Enjoy your new movie discovery app! 🎬✨**
