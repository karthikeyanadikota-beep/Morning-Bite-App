import React from 'react';
import { useApp } from '../context/AppContext';
import { FOOD_CATEGORIES } from '../data/foodData';

export const CategoryBar: React.FC = () => {
  const { selectedCategory, setSelectedCategory, products, scrollToSection } = useApp();

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return products.length;
    if (catId === 'breakfast') {
      return products.filter(p => p.isBreakfastSpecial || p.category === 'breakfast' || p.category === 'south_indian').length;
    }
    return products.filter(p => p.category === catId).length;
  };

  const handleSelect = (catId: string) => {
    setSelectedCategory(catId);
    scrollToSection('menu-section');
  };

  return (
    <section className="py-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700">
              Browse by Cravings &amp; Time
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-0.5">
              Explore Fresh Categories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 md:mt-0">
            Nutritious homestyle meals freshly prepared to power your day
          </p>
        </div>

        {/* Scrollable / Grid Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-3">
          {FOOD_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = getCategoryCount(cat.id);

            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl transition-all text-center cursor-pointer border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-700/20 scale-[1.02]'
                    : 'bg-slate-50 hover:bg-emerald-50/60 text-slate-800 border-slate-200/70 hover:border-emerald-300'
                }`}
              >
                <span className="text-2xl sm:text-3xl mb-1.5 transform transition-transform group-hover:scale-110">
                  {cat.icon}
                </span>
                <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {cat.name}
                </span>
                <span
                  className={`text-[10px] mt-1 font-medium ${
                    isSelected ? 'text-emerald-100' : 'text-slate-500'
                  }`}
                >
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
