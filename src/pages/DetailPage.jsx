import { useParams, useNavigate } from 'react-router-dom';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import { Heart, ArrowLeft, Clock, ChefHat, Star } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function DetailPage() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Find the recipe based on type and id
  const data = type === 'makanan' ? ResepMakanan.resep : ResepMinuman.resep;
  const recipe = Object.values(data).find(r => r.id === parseInt(id));

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Resep tidak ditemukan</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Kembali</span>
        </button>

        {/* Recipe Image and Basic Info */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 md:h-96">
            <img
              src={recipe.image_url}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Favorite Button */}
            <button
              onClick={handleFavoriteClick}
              className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <Heart
                size={24}
                className={`${
                  isFavorite(recipe.id)
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400'
                } transition-colors`}
              />
            </button>

            {/* Recipe Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  type === 'makanan'
                    ? 'text-blue-700 bg-blue-100/90'
                    : 'text-green-700 bg-green-100/90'
                }`}>
                  {type === 'makanan' ? 'Makanan' : 'Minuman'}
                </span>
                <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-700">
                    {type === 'makanan' ? '4.8' : '4.7'}
                  </span>
                </div>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                {recipe.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Recipe Details */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Clock className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-800">Bahan-bahan</h2>
              <span className="text-sm text-gray-500">({recipe.ingredients.length} bahan)</span>
            </div>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <ChefHat className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-800">Langkah-langkah</h2>
              <span className="text-sm text-gray-500">({recipe.steps.length} langkah)</span>
            </div>
            <ol className="space-y-4">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
