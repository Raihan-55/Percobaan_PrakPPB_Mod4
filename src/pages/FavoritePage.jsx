import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { Clock, Star, ChefHat, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function FavoritePage() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);
console.log('Favorites:', favorites);
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, favorites.length);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setTimeout(() => {
            setVisibleCards(prev => new Set(prev).add(index));
          }, (index % 3) * 150);
        }
      });
    }, { threshold: 0.1 });

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [favorites]);

  const handleCardClick = (recipe) => {
    // Determine type based on recipe structure or add type to favorites
    const type = recipe.ingredients && recipe.steps ? 'makanan' : 'minuman';
    navigate(`/detail/${type}/${recipe.id}`);
  };

  const handleFavoriteClick = (e, recipe) => {
    e.stopPropagation();
    toggleFavorite(recipe);
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 pb-20 md:pb-8">
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
              Resep Favorit
            </h1>
            <p className="text-slate-500 text-lg mb-8">
              Belum ada resep favorit. Tambahkan resep ke favorit dengan menekan ikon hati!
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
            >
              Jelajahi Resep
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">
          Resep Favorit
        </h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
          Koleksi resep favorit Anda. Klik pada resep untuk melihat detail lengkapnya.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {favorites.map((recipe, index) => (
            <div
              key={`${recipe.id}-${index}`}
              ref={el => cardRefs.current[index] = el}
              onClick={() => handleCardClick(recipe)}
              className={`group transform transition-all duration-700 cursor-pointer ${
                visibleCards.has(index)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl shadow-pink-500/5 hover:shadow-pink-500/15 transition-all duration-500 group-hover:scale-105 group-hover:bg-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Favorite Button */}
                <button
                  onClick={(e) => handleFavoriteClick(e, recipe)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <Heart
                    size={20}
                    className="fill-red-500 text-red-500"
                  />
                </button>

                <div className="relative h-32 md:h-56 overflow-hidden">
                  <img
                    src={recipe.image_url}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 p-4 md:p-8">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="text-xs font-semibold text-pink-700 bg-pink-100/90 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                      Favorit
                    </span>
                    <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                      <span className="text-xs md:text-sm font-semibold text-slate-700">
                        {recipe.ingredients ? '4.8' : '4.7'}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-800 mb-3 md:mb-4 text-base md:text-xl group-hover:text-pink-600 transition-colors duration-200 line-clamp-2">
                    {recipe.name}
                  </h3>

                  <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
                    <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="font-medium">{recipe.ingredients?.length || recipe.steps?.length || 0} bahan</span>
                    </div>
                    <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                      <ChefHat className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="font-medium">{recipe.steps?.length || recipe.ingredients?.length || 0} langkah</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
