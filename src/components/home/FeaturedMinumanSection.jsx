// src/components/home/FeaturedMinumanSection.jsx
import { Clock, Star, Coffee, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';

export default function FeaturedMinumanSection({ featuredMinuman }) {
  const [visibleMinuman, setVisibleMinuman] = useState(new Set());
  const minumanRefs = useRef([]);
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const observerMinuman = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setTimeout(() => {
            setVisibleMinuman(prev => new Set(prev).add(index));
          }, index * 250);
        }
      });
    }, { threshold: 0.1 });

    minumanRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observerMinuman.observe(ref);
      }
    });

    return () => {
      observerMinuman.disconnect();
    };
  }, []);

  return (
<section>
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold text-slate-800">Resep Minuman</h2>
        <button className="text-slate-500 hover:text-slate-600 font-medium text-xs md:text-sm transition-colors duration-200 hover:underline">
          Lihat Semua
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {featuredMinuman.map((recipe, index) => (
          <div
            key={recipe.id}
            ref={el => minumanRefs.current[index] = el}
            className={`group transform transition-all duration-700 ${
              visibleMinuman.has(index)
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            <div
              onClick={() => navigate(`/detail/minuman/${recipe.id}`)}
              className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl shadow-indigo-500/5 hover:shadow-indigo-500/15 transition-all duration-500 cursor-pointer group-hover:scale-105 group-hover:bg-white/20"
            >

              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(recipe);
                }}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <Heart
                  size={20}
                  className={`${
                    isFavorite(recipe.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-400'
                  } transition-colors`}
                />
              </button>

              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Recipe Image */}
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
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-100/90 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                    Minuman
                  </span>
                  <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                    <span className="text-xs md:text-sm font-semibold text-slate-700">4.7</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-800 mb-3 md:mb-4 text-base md:text-xl group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
                  {recipe.name}
                </h3>

                <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
                  <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-medium">{recipe.ingredients.length} bahan</span>
                  </div>
                  <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                    <Coffee className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="font-medium">{recipe.steps.length} langkah</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}