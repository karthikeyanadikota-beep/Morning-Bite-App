import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  Check, 
  AlertCircle,
  Truck
} from 'lucide-react';
import { PROMO_OFFERS } from '../data/foodData';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    cartSubtotal, 
    deliveryFee, 
    discountAmount, 
    finalTotal, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    setIsCheckoutOpen,
    scrollToSection
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (code: string) => {
    setCouponError(null);
    const res = applyCoupon(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const freeDeliveryThreshold = 199;
  const progressToFreeDelivery = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Background click to dismiss */}
      <div className="flex-1" onClick={() => setIsCartOpen(false)} />

      {/* Slide-over Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-slate-200 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Your Morning Cart
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in basket
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="px-5 py-3 bg-emerald-50/70 border-b border-emerald-100 text-xs">
          {amountNeededForFreeDelivery > 0 ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-semibold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  Add <strong className="text-emerald-700">₹{amountNeededForFreeDelivery}</strong> more for FREE delivery
                </span>
                <span className="text-emerald-700 tabular-nums font-bold">
                  {Math.round(progressToFreeDelivery)}%
                </span>
              </div>
              <div className="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressToFreeDelivery}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</span>
              <span>🎉 Congratulations! You unlocked FREE Delivery!</span>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl">
                🥗
              </div>
              <h3 className="text-base font-bold text-slate-800">Your basket is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Add fresh idlis, hot crispy dosas, or a nutritious lunch bowl to start your healthy morning routine.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  scrollToSection('menu-section');
                }}
                className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
              >
                Browse Fresh Menu
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                <span>Selected Items</span>
                <button
                  onClick={clearCart}
                  className="text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 items-center justify-between"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-200"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-slate-500 block">
                      ₹{item.product.price} each · {item.product.calories} kcal
                    </span>
                    <span className="text-xs font-extrabold text-emerald-800 tabular-nums">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center bg-white border border-slate-300 rounded-lg shadow-2xs overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="p-1 text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold tabular-nums min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="p-1 text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Promo Coupon Section */}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Have a Promo Code?</span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                      <div>
                        <span className="font-bold text-emerald-900 block">{appliedCoupon.code}</span>
                        <span className="text-[10px] text-emerald-700">{appliedCoupon.title}</span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-slate-500 hover:text-rose-600 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="e.g. FIRST20"
                        className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 outline-none uppercase font-bold"
                      />
                      <button
                        onClick={() => handleApplyCoupon(couponInput)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-[11px] text-rose-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" /> {couponError}
                      </p>
                    )}

                    {/* Quick click suggestions */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {PROMO_OFFERS.slice(0, 2).map((off) => (
                        <button
                          key={off.code}
                          onClick={() => handleApplyCoupon(off.code)}
                          className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/80 text-[10px] font-bold hover:bg-amber-100 transition-colors cursor-pointer"
                        >
                          Use {off.code}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Billing & Checkout CTAs */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3.5">
            
            {/* Bill Details */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Item Subtotal</span>
                <span className="tabular-nums font-semibold">₹{cartSubtotal}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                {deliveryFee === 0 ? (
                  <span className="text-emerald-700 font-bold uppercase text-[11px]">FREE</span>
                ) : (
                  <span className="tabular-nums font-semibold">₹{deliveryFee}</span>
                )}
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount</span>
                  <span className="tabular-nums font-bold">-₹{discountAmount}</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                <span>To Pay</span>
                <span className="text-emerald-800 text-base tabular-nums">₹{finalTotal}</span>
              </div>
            </div>

            {/* CTAs: Continue Shopping & Proceed to Checkout */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsCartOpen(false)}
                className="flex-1 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
