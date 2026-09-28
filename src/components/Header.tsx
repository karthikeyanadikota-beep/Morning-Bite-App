import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  X, 
  Clock, 
  Sparkles, 
  Menu as MenuIcon,
  ChevronDown
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    cartTotalCount, 
    setIsCartOpen, 
    favorites, 
    user, 
    setIsAuthOpen, 
    setIsProfileOpen, 
    searchQuery, 
    setSearchQuery,
    setSelectedCategory,
    scrollToSection,
    setFilters
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNavClick = (sectionId: string, category?: string) => {
    setMobileMenuOpen(false);
    if (category) {
      setSelectedCategory(category);
    }
    scrollToSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100/70 shadow-xs transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-emerald-800 text-emerald-50 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Delivering Fresh Morning Breakfasts Across City • Order Before 8:00 AM for Instant Slot</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-emerald-200">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 6:30 AM – 2:30 PM Delivery
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-100 font-semibold">100% Fresh & Hygienic</span>
          </div>
        </div>
      </div>

      {/* Main Navigation - 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single text element Brand wordmark with icon */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="MorningBite Home"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">🥗</span>
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-display flex items-center gap-1">
                Morning<span className="text-emerald-600">Bite</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 block -mt-1">
                Fresh • Healthy • Home Delivery
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
          <button 
            onClick={() => handleNavClick('hero')}
            className="hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('menu-section', 'breakfast')}
            className="hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            Breakfast
          </button>
          <button 
            onClick={() => handleNavClick('menu-section', 'lunch')}
            className="hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            Lunch
          </button>
          <button 
            onClick={() => handleNavClick('menu-section', 'healthy_meals')}
            className="hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            Healthy Meals
          </button>
          <button 
            onClick={() => handleNavClick('menu-section', 'combos')}
            className="hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            Combos
          </button>
          <button 
            onClick={() => handleNavClick('office-plans')}
            className="hover:text-emerald-600 transition-colors whitespace-nowrap flex items-center gap-1 font-semibold text-emerald-700"
          >
            <span>Office Plans</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">5-Day</span>
          </button>
          <button 
            onClick={() => handleNavClick('offers-section')}
            className="hover:text-emerald-600 transition-colors whitespace-nowrap text-amber-700 font-semibold"
          >
            Offers 🎉
          </button>
          <button 
            onClick={() => handleNavClick('why-us')}
            className="hover:text-emerald-600 transition-colors whitespace-nowrap"
          >
            About Us
          </button>
        </nav>

        {/* Zone 3: Search, Favorites, Cart & User Action */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Integrated search bar (desktop) */}
          <div className="hidden md:flex items-center relative w-64 xl:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search idli, dosa, lunch..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile search toggle */}
          <button 
            onClick={() => setShowSearchInput(!showSearchInput)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/70 transition-colors"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Favorites Button */}
          <button 
            onClick={() => {
              setFilters((prev) => ({ ...prev, sortBy: 'popularity' }));
              handleNavClick('menu-section');
            }}
            className="relative p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50/60 transition-colors"
            title="My Favorites"
            aria-label={`Favorites with ${favorites.length} items`}
          >
            <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100 transition-colors group"
            aria-label={`Shopping cart with ${cartTotalCount} items`}
          >
            <ShoppingBag className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-xs font-bold text-emerald-900">Cart</span>
            {cartTotalCount > 0 ? (
              <span className="bg-emerald-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full shadow-xs">
                {cartTotalCount}
              </span>
            ) : (
              <span className="text-slate-400 text-xs hidden sm:inline">0</span>
            )}
          </button>

          {/* User Auth / Profile */}
          {user ? (
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/70 transition-colors text-slate-800"
              title="My Account"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-xs">
                {user.name.charAt(0)}
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-slate-800 truncate max-w-[90px]">
                {user.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
            </button>
          ) : (
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors whitespace-nowrap"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Hamburger toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Expansion */}
      {showSearchInput && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search idli, dosa, meal bowl, juice..."
              className="w-full pl-9 pr-8 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
              autoFocus
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white px-4 py-4 space-y-2 shadow-lg">
          <button 
            onClick={() => handleNavClick('hero')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-slate-700 font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('menu-section', 'breakfast')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-slate-700 font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
          >
            🍳 Breakfast
          </button>
          <button 
            onClick={() => handleNavClick('menu-section', 'lunch')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-slate-700 font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
          >
            🍱 Lunch
          </button>
          <button 
            onClick={() => handleNavClick('menu-section', 'healthy_meals')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-slate-700 font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
          >
            🥗 Healthy Meals
          </button>
          <button 
            onClick={() => handleNavClick('menu-section', 'combos')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-slate-700 font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
          >
            🔥 Combo Meals
          </button>
          <button 
            onClick={() => handleNavClick('office-plans')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-emerald-800 font-bold bg-emerald-50"
          >
            💼 Weekly Office Meal Plans
          </button>
          <button 
            onClick={() => handleNavClick('offers-section')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-amber-700 font-medium hover:bg-amber-50"
          >
            🎉 Offers & Deals
          </button>
          <button 
            onClick={() => handleNavClick('why-us')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
          >
            Why Choose MorningBite?
          </button>
        </div>
      )}
    </header>
  );
};
