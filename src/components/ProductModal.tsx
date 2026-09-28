import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Star, 
  Clock, 
  Flame, 
  Scale, 
  Heart, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Check, 
  Sparkles,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { 
    activeModalProduct: product, 
    closeProductModal, 
    addToCart, 
    setIsCheckoutOpen,
    toggleFavorite,
    isFavorite
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  if (!product) return null;

  const isFav = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    closeProductModal();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    closeProductModal();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={closeProductModal} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col border border-slate-200">
        
        {/* Floating Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-md text-slate-700 hover:text-slate-900 hover:bg-white flex items-center justify-center transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Big Product Image */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-sm border border-slate-200/80">
                {!imgError ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={() => setImgError(true)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
                    style={{ backgroundColor: product.fallbackColor || '#ecfdf5' }}
                  >
                    <span className="text-6xl mb-2">🥗</span>
                    <span className="text-base font-bold text-slate-800">{product.name}</span>
                    <span className="text-xs text-slate-500 mt-1">Fresh Farm Quality</span>
                  </div>
                )}

                {/* Veg Indicator Tag */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg shadow-xs flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 border-2 border-emerald-600 flex items-center justify-center p-0.5 rounded-[3px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  </div>
                  <span className="text-xs font-bold text-emerald-800">100% Vegetarian</span>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md shadow-xs transition-transform active:scale-90 ${
                    isFav
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/90 text-slate-700 hover:text-rose-500 hover:bg-white'
                  }`}
                  title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Portion size & prep time micro specs */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Portion Size</span>
                  <span className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                    <Scale className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{product.portionSize}</span>
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Preparation Time</span>
                  <span className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{product.prepTime}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Name, Pricing, Nutrition, Description */}
            <div className="md:col-span-6 space-y-4">
              
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {product.categoryLabel}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-0.5">
                  {product.name}
                </h2>
                
                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md border border-amber-200/70 text-xs font-extrabold">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Based on {product.reviewsCount} verified customer ratings
                  </span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through tabular-nums">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-emerald-800 font-medium">
                    Inclusive of all kitchen hygiene taxes &amp; charges
                  </span>
                </div>
                {product.originalPrice && (
                  <span className="text-xs font-extrabold text-emerald-700 bg-white px-2 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  About this Morning Dish
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.longDescription || product.description}
                </p>
              </div>

              {/* Macro Nutritional Grid (Calories, Protein, Carbs, Fat) */}
              <div className="space-y-1.5 pt-1">
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Nutritional Breakdown (Per Serving)
                </h4>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-amber-50/80 p-2 rounded-xl border border-amber-200/60">
                    <span className="text-[10px] font-bold text-amber-800 block">Calories</span>
                    <span className="text-xs sm:text-sm font-extrabold text-amber-950 tabular-nums">
                      {product.calories} kcal
                    </span>
                  </div>
                  <div className="bg-emerald-50/80 p-2 rounded-xl border border-emerald-200/60">
                    <span className="text-[10px] font-bold text-emerald-800 block">Protein</span>
                    <span className="text-xs sm:text-sm font-extrabold text-emerald-950 tabular-nums">
                      {product.protein}
                    </span>
                  </div>
                  <div className="bg-blue-50/80 p-2 rounded-xl border border-blue-200/60">
                    <span className="text-[10px] font-bold text-blue-800 block">Carbs</span>
                    <span className="text-xs sm:text-sm font-extrabold text-blue-950 tabular-nums">
                      {product.carbs}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-600 block">Fats</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 tabular-nums">
                      {product.fat}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Full Ingredients List */}
          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
              Fresh Ingredients &amp; Recipe Highlights
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {product.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 text-slate-700 font-medium"
                >
                  ✓ {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Customer Reviews Spotlight */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                Customer Reviews
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                      <div className="flex text-amber-500 text-xs">
                        {'★'.repeat(rev.rating)}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 block">{rev.role}</span>
                    <p className="text-xs text-slate-600 italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Contiguous Sticky Bottom Purchase Module */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700">Quantity:</span>
            <div className="flex items-center bg-white border border-slate-300 rounded-xl shadow-2xs overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 text-sm font-bold text-slate-900 tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm font-extrabold text-slate-900 tabular-nums">
              Total: ₹{product.price * quantity}
            </span>
          </div>

          {/* Action CTAs: Add to Cart and Buy Now */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 active:scale-95 text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold tracking-wide shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
