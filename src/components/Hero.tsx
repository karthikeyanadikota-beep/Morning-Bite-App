import React from 'react';
import { useApp } from '../context/AppContext';
import { ASSET_IMAGES } from '../data/foodData';
import { Clock, ShieldCheck, Heart, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setSelectedCategory, scrollToSection, setSearchQuery } = useApp();

  const handleOrderBreakfast = () => {
    setSelectedCategory('breakfast');
    scrollToSection('menu-section');
  };

  const handleExploreLunch = () => {
    setSelectedCategory('lunch');
    scrollToSection('menu-section');
  };

  const quickPicks = [
    { label: 'Idli + Sambar', cat: 'south_indian', price: '₹60' },
    { label: 'Masala Dosa', cat: 'south_indian', price: '₹80' },
    { label: 'Indori Poha', cat: 'breakfast', price: '₹50' },
    { label: 'Healthy Combo', cat: 'combos', price: '₹120' },
    { label: 'Office Lunch', cat: 'healthy_meals', price: '₹150' },
  ];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-white pt-6 pb-12 lg:pt-10 lg:pb-16 border-b border-emerald-100/50">
      
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Target audience banner */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>For Busy Employees, Students & Working Professionals</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2 className="text-amber-700 text-xl sm:text-2xl font-bold font-display tracking-tight">
                Too Busy for Breakfast?
              </h2>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] font-display">
                Fresh &amp; Healthy Breakfast <br className="hidden sm:inline" />
                <span className="text-emerald-700 underline decoration-amber-400 decoration-wavy decoration-2">
                  Delivered to Your Doorstep.
                </span>
              </h1>
            </div>

            {/* Core Subtitle & Positioning */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Healthy food, delivered fresh so you start your day right. Homestyle Indian breakfast &amp; wholesome office lunch prepared at dawn with farm-fresh ingredients.
            </p>

            {/* Key Promise Pill Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-4 text-xs font-semibold text-slate-700 bg-white/80 p-3 rounded-2xl border border-slate-200/80 shadow-xs max-w-xl mx-auto lg:mx-0">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Freshly prepared every morning
              </span>
              <span className="text-slate-300" aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5 text-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                Hygienic kitchen
              </span>
              <span className="text-slate-300" aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5 text-emerald-700">
                <Heart className="w-4 h-4 text-emerald-600 shrink-0" />
                Affordable from ₹50
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={handleOrderBreakfast}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm tracking-wide shadow-md shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Order Breakfast</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleExploreLunch}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-sm tracking-wide shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Lunch</span>
                <span className="text-amber-100 text-xs font-normal">🍱 Desk Friendly</span>
              </button>
            </div>

            {/* Quick-Pick Shortcuts */}
            <div className="pt-2 text-center lg:text-left">
              <span className="text-xs text-slate-500 font-medium block mb-2">
                Popular morning favorites:
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {quickPicks.map((pick) => (
                  <button
                    key={pick.label}
                    onClick={() => {
                      setSearchQuery(pick.label.split(' ')[0]);
                      scrollToSection('menu-section');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 border border-slate-200/80 transition-colors cursor-pointer"
                  >
                    <span>{pick.label}</span>
                    <span className="text-emerald-600 font-bold">{pick.price}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Food Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-950/15 border-4 border-white bg-slate-100 aspect-[4/3] group">
                <img
                  src={ASSET_IMAGES.heroBreakfast}
                  alt="Fresh healthy Indian breakfast including dosa, idli, upma, sambar and fruits"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Bottom caption over image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="bg-emerald-600/90 backdrop-blur-xs px-2.5 py-1 rounded-md font-bold tracking-wide">
                      Authentic South Indian & Healthy Bowls
                    </span>
                    <span className="text-emerald-200">Cooked fresh at 5:30 AM</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Delivery ETA */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-emerald-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5 text-emerald-600 animate-spin-slow" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">30-Min Delivery</span>
                  <span className="text-[11px] text-emerald-700 font-medium">Hot &amp; Fresh at Your Door</span>
                </div>
              </div>

              {/* Floating Badge 2: Health Rating */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-amber-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg font-bold">
                  ⭐
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-extrabold text-slate-900">4.9 / 5.0</span>
                    <span className="text-[11px] text-slate-500">(25k+ orders)</span>
                  </div>
                  <span className="text-[11px] text-slate-600 font-medium">100% Wholesome Ingredients</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
