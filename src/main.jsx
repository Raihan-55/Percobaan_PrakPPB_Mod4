// src/main.jsx
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import MakananPage from './pages/MakananPage';
import MinumanPage from './pages/MinumanPage';
import ProfilePage from './pages/ProfilePage';
import DetailPage from './pages/DetailPage';
import FavoritePage from './pages/FavoritePage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import { FavoritesProvider } from './context/FavoritesContext';
import './index.css'
import PWABadge from './PWABadge';

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <FavoritesProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Desktop Navbar */}
          <DesktopNavbar />

          {/* Main Content */}
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/makanan" element={<MakananPage />} />
              <Route path="/minuman" element={<MinumanPage />} />
              <Route path="/favorites" element={<FavoritePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/detail/:type/:id" element={<DetailPage />} />
            </Routes>
          </main>

          {/* Mobile Navbar */}
          <MobileNavbar />

          <PWABadge />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)
