import React from 'react';
import { useApp } from '../context/AppContext';
import { Filter, RotateCcw, ArrowUpDown, Flame, Dumbbell, Clock } from 'lucide-react';

export const FilterBar: React.FC = () => {
  const { filters, setFilters, resetFilters, filteredProducts, searchQuery } = useApp();

  return (
    <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left Side: Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mr-1">
            <Filter className="w-3.5 h-3.5 text-emerald-700" />
            <span>Filters:</span>
          </div>

          {/* Veg Only Toggle */}
          <button
            onClick={() => setFilters((prev) => ({ ...prev, vegOnly: !prev.vegOnly }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              filters.vegOnly
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full border border-current flex items-center justify-center p-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            </span>
            <span>100% Pure Veg</span>
          </button>

          {/* High Protein Toggle */}
          <button
            onClick={() => setFilters((prev) => ({ ...prev, highProteinOnly: !prev.highProteinOnly }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              filters.highProteinOnly
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>High Protein (&gt;12g)</span>
          </button>

          {/* Low Calorie Filter */}
          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                maxCalories: prev.maxCalories === 350 ? 1000 : 350,
              }))
            }
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              filters.maxCalories === 350
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Under 350 kcal</span>
          </button>

          {/* Quick Prep Time (< 15 mins) */}
          <button
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                maxPrepTime: prev.maxPrepTime === 15 ? 0 : 15,
              }))
            }
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              filters.maxPrepTime === 15
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Ready in &lt;15 mins</span>
          </button>

          {/* Reset Filters button if any active */}
          {(filters.vegOnly || filters.highProteinOnly || filters.maxCalories < 1000 || filters.maxPrepTime > 0 || searchQuery) && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right Side: Sort dropdown & Product count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200/80">
          <span className="text-xs font-semibold text-slate-500">
            Showing <strong className="text-slate-800 tabular-nums">{filteredProducts.length}</strong> items
          </span>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <label htmlFor="sort-select" className="text-xs text-slate-500 font-medium">Sort:</label>
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as any,
                }))
              }
              className="text-xs font-bold text-slate-800 bg-transparent outline-none cursor-pointer"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated ⭐</option>
              <option value="price_asc">Price: Low to High (₹)</option>
              <option value="price_desc">Price: High to Low (₹)</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};
