import React from 'react';
import { useApp } from '../context/AppContext';
import { PROMO_OFFERS } from '../data/foodData';
import { Tag, Sparkles, Check, ArrowRight } from 'lucide-react';

export const OffersSection: React.FC = () => {
  const { applyCoupon, setIsCartOpen, showNotification } = useApp();

  const handleGrabOffer = (code: string) => {
    applyCoupon(code);
    setIsCartOpen(true);
    showNotification(`Promo code ${code} activated in cart!`);
  };

  const cardStyles = [
    { bg: 'from-amber-500/10 via-amber-500/5 to-white', border: 'border-amber-200', tagBg: 'bg-amber-500 text-white', icon: '🎉' },
    { bg: 'from-emerald-500/10 via-emerald-500/5 to-white', border: 'border-emerald-200', tagBg: 'bg-emerald-600 text-white', icon: '🚴' },
    { bg: 'from-teal-500/10 via-teal-500/5 to-white', border: 'border-teal-200', tagBg: 'bg-teal-600 text-white', icon: '🥗' },
    { bg: 'from-blue-500/10 via-blue-500/5 to-white', border: 'border-blue-200', tagBg: 'bg-blue-600 text-white', icon: '💼' },
  ];

  return (
    <section id="offers-section" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Special Morning Promos
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-0.5">
              Fresh Daily Deals &amp; Discounts
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-0">
            Use these codes at checkout or click "Grab Offer" to auto-apply
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROMO_OFFERS.map((offer, idx) => {
            const style = cardStyles[idx % cardStyles.length];

            return (
              <div
                key={offer.code}
                className={`rounded-3xl p-5 border ${style.border} bg-gradient-to-b ${style.bg} flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 relative group`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{style.icon}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${style.tagBg}`}>
                      {offer.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 font-display">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {offer.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-800 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200/80">
                      <Tag className="w-3 h-3 text-emerald-600" />
                      <span>{offer.code}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">
                      Min. ₹{offer.minOrder}
                    </span>
                  </div>

                  <button
                    onClick={() => handleGrabOffer(offer.code)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Grab Offer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
