import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Plus, Minus, Clock, Flame, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    cart, 
    addToCart, 
    updateQuantity, 
    toggleFavorite, 
    isFavorite, 
    openProductModal 
  } = useApp();

  const [imgError, setImgError] = useState(false);

  // Check if item is already in cart
  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const isFav = isFavorite(product.id);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => openProductModal(product)}>
        
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div 
            className="w-full h-full flex flex-col items-center justify-center p-4 text-center"
            style={{ backgroundColor: product.fallbackColor || '#ecfdf5' }}
          >
            <span className="text-4xl mb-1">🥗</span>
            <span className="text-xs font-bold text-slate-800">{product.name}</span>
            <span className="text-[10px] text-slate-500 mt-1">Fresh Morning Recipe</span>
          </div>
        )}

        {/* Gradient scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />

        {/* Veg / Non-Veg Indicator Icon (Top Left) */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-1.5 rounded-lg shadow-xs flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 border-2 border-emerald-600 flex items-center justify-center p-0.5 rounded-[3px]">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          </div>
          <span className="text-[10px] font-bold text-emerald-800 hidden sm:inline">100% Veg</span>
        </div>

        {/* Favorite Heart Button (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md shadow-xs transition-transform active:scale-90 ${
            isFav
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 text-slate-700 hover:text-rose-500 hover:bg-white'
          }`}
          title={isFav ? 'Remove from favorites' : 'Save to favorites'}
          aria-label="Toggle favorite"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>

        {/* Bestseller / Special Tag (Bottom Left Overlay) */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
          {product.isBestseller && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
              ★ BESTSELLER
            </span>
          )}
          {product.isHighProtein && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              {product.protein} PROTEIN
            </span>
          )}
        </div>

        {/* Preparation Time Overlay (Bottom Right) */}
        <div className="absolute bottom-2.5 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3 text-emerald-400" />
          <span>{product.prepTime}</span>
        </div>

      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Metadata: Category & Calories */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-emerald-700 uppercase text-[10px] tracking-wider">
              {product.categoryLabel}
            </span>
            <span className="flex items-center gap-1 text-slate-600 font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>{product.calories} kcal</span>
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => openProductModal(product)}
            className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Bottom Section: Rating, Price & CTA Controls */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          
          {/* Pricing & Rating */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-600">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Buttons: Details & Cart Controls */}
          <div className="flex items-center gap-1.5">
            
            {/* View Details Quick Button */}
            <button
              onClick={() => openProductModal(product)}
              className="p-2 rounded-xl text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
              title="View Complete Nutrition & Ingredients"
              aria-label="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Add to Cart OR Quantity Stepper */}
            {quantityInCart === 0 ? (
              <button
                onClick={() => addToCart(product)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-xs hover:shadow-emerald-600/20 transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>ADD</span>
              </button>
            ) : (
              <div className="flex items-center bg-emerald-700 text-white rounded-xl shadow-xs overflow-hidden">
                <button
                  onClick={() => updateQuantity(product.id, -1)}
                  className="px-2 py-1.5 hover:bg-emerald-800 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-2 text-xs font-bold tabular-nums min-w-[20px] text-center">
                  {quantityInCart}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, 1)}
                  className="px-2 py-1.5 hover:bg-emerald-800 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
