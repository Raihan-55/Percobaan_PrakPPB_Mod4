import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('recipeFavorites');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (recipe) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === recipe.id)) return prev;
      return [...prev, recipe];
    });
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  const isFavorite = (recipeId) => {
    return favorites.some(recipe => recipe.id === recipeId);
  };

  const toggleFavorite = (recipe) => {
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
