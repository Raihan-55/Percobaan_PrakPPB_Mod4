// src/pages/MinumanPage.jsx
import { useState, useEffect } from 'react';
import { ResepMinuman } from '../data/minuman';
import RecipeGrid from '../components/minuman/RecipeGrid';
import { Search } from 'lucide-react';

export default function MinumanPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 3;

  const allMinuman = Object.values(ResepMinuman.resep);

  useEffect(() => {
    const filter = () => {
      if (searchQuery.trim() === '') {
        setFilteredRecipes(allMinuman);
      } else {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = allMinuman.filter(recipe =>
          recipe.name.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredRecipes(filtered);
      }
      setCurrentPage(1); // Reset to first page when search changes
    };

    filter();
  }, [searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const endIndex = startIndex + recipesPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-cyan-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari resep minuman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        <RecipeGrid recipes={currentRecipes} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-600">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
