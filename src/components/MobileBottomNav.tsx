import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Utensils, Heart, ShoppingBag, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { 
    cartTotalCount, 
    setIsCartOpen, 
    favorites, 
    user, 
    setIsAuthOpen, 
    setIsProfileOpen, 
    scrollToSection,
    setSelectedCategory
  } = useApp();

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-2 py-1.5 flex items-center justify-around h-14"
    >
      <button
        onClick={() => scrollToSection('hero')}
        className="flex flex-col items-center justify-center p-1 text-slate-600 hover:text-emerald-700 active:scale-95 transition-all w-14"
      >
        <Home className="w-4 h-4" />
        <span className="text-[10px] font-bold mt-0.5">Home</span>
      </button>

      <button
        onClick={() => {
          setSelectedCategory('all');
          scrollToSection('menu-section');
        }}
        className="flex flex-col items-center justify-center p-1 text-slate-600 hover:text-emerald-700 active:scale-95 transition-all w-14"
      >
        <Utensils className="w-4 h-4" />
        <span className="text-[10px] font-bold mt-0.5">Menu</span>
      </button>

      <button
        onClick={() => {
          scrollToSection('menu-section');
        }}
        className="relative flex flex-col items-center justify-center p-1 text-slate-600 hover:text-rose-600 active:scale-95 transition-all w-14"
      >
        <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
        <span className="text-[10px] font-bold mt-0.5">Favorites</span>
        {favorites.length > 0 && (
          <span className="absolute top-0.5 right-3 bg-rose-500 text-white text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            {favorites.length}
          </span>
        )}
      </button>

      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center justify-center p-1 text-slate-600 hover:text-emerald-700 active:scale-95 transition-all w-14"
      >
        <ShoppingBag className="w-4 h-4" />
        <span className="text-[10px] font-bold mt-0.5">Cart</span>
        {cartTotalCount > 0 && (
          <span className="absolute top-0.5 right-3 bg-emerald-600 text-white text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            {cartTotalCount}
          </span>
        )}
      </button>

      <button
        onClick={() => {
          if (user) {
            setIsProfileOpen(true);
          } else {
            setIsAuthOpen(true);
          }
        }}
        className="flex flex-col items-center justify-center p-1 text-slate-600 hover:text-emerald-700 active:scale-95 transition-all w-14"
      >
        <User className="w-4 h-4" />
        <span className="text-[10px] font-bold mt-0.5">{user ? 'Profile' : 'Login'}</span>
      </button>
    </nav>
  );
};
