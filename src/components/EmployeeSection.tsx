import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OFFICE_MEAL_PLANS, ASSET_IMAGES } from '../data/foodData';
import { 
  Briefcase, 
  Clock, 
  Calendar, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  HeartHandshake,
  Coffee,
  X
} from 'lucide-react';
import { MealPlan } from '../types';

export const EmployeeSection: React.FC = () => {
  const { setSelectedCategory, scrollToSection, showNotification } = useApp();
  const [selectedPlanModal, setSelectedPlanModal] = useState<MealPlan | null>(null);

  const handleSubscribe = (plan: MealPlan) => {
    setSelectedPlanModal(null);
    showNotification(`Subscribed to ${plan.title}! Our team will contact you for schedule confirmation.`);
  };

  return (
    <section id="office-plans" className="py-14 bg-gradient-to-b from-white via-emerald-50/40 to-white border-t border-b border-emerald-100/60 relative overflow-hidden">
      
      {/* Decorative ambient background */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Special Banner & Employee Value Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold shadow-2xs">
            <Briefcase className="w-3.5 h-3.5 text-amber-700" />
            <span>Dedicated For Working Professionals &amp; Corporate Hubs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
            Office Morning? <br className="hidden sm:inline" />
            <span className="text-emerald-700">We’ve Got Your Breakfast Covered! 💼🍱</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Running late for work? Don’t skip your breakfast. Order fresh, healthy food and get it delivered before your workday begins.
          </p>

          {/* "Order Before 8 AM" Key Commitment Callout */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 p-3 rounded-2xl bg-white border border-emerald-200 shadow-xs">
            <span className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl">
              <Clock className="w-4 h-4 text-emerald-700" />
              Order Before 8:00 AM
            </span>
            <span className="text-xs font-semibold text-slate-700">
              Guaranteed hot delivery to your home or office desk by 8:30 AM
            </span>
          </div>

        </div>

        {/* Feature Spotlight: Bento Box Photography & Office Promise */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
            <img
              src={ASSET_IMAGES.officeLunch}
              alt="Healthy executive office lunch bento box"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/70 backdrop-blur-xs text-white p-2.5 rounded-xl text-xs flex items-center justify-between">
              <span className="font-bold">Desk-Friendly Leakproof Packaging</span>
              <span className="text-emerald-300 font-semibold">Zero Spills</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Tailored for Tech Parks &amp; Corporate Campuses
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Say Goodbye to Skipping Breakfast &amp; Post-Lunch Lethargy
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Standard cafeteria food is often drenched in refined oil and heavy spices. MorningBite prepares clean, balanced macros: cold-pressed oils, fiber-rich whole grains, and protein-packed dals that keep you sharp during morning sprint calls.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Pre-Booked Morning Slot</h4>
                  <p className="text-[11px] text-slate-500">Pick 7:00 AM, 7:30 AM, or 8:00 AM so food arrives right as you step out.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Direct Desk / Reception Drop</h4>
                  <p className="text-[11px] text-slate-500">Our campus delivery badges allow direct handover at your tech park desk.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Flexible Pause &amp; Reschedule</h4>
                  <p className="text-[11px] text-slate-500">Working from home or taking a Friday off? Pause your plan with one tap.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Eco-Friendly Thermal Boxes</h4>
                  <p className="text-[11px] text-slate-500">100% biodegradable bagasse containers that retain heat naturally.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title: Weekly Office Meal Plans */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700">
            Automate Your Nutrition
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-0.5">
            Weekly &amp; Monthly Office Meal Plans
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose a recurring plan to lock in lower prices and guaranteed priority dawn delivery.
          </p>
        </div>

        {/* 4 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {OFFICE_MEAL_PLANS.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              {plan.badge && (
                <div className="absolute -top-3 left-5 bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-3">
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                    {plan.duration}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 font-display mt-0.5">
                    {plan.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Price Display */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                      ₹{plan.price}
                    </span>
                    <span className="text-xs text-slate-500">/ week</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                    {plan.savings}
                  </span>
                </div>

                {/* Feature Bullets */}
                <div className="space-y-2 pt-1 text-xs text-slate-600">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => setSelectedPlanModal(plan)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  View Sample Menu &amp; Subscribe
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Plan Details & Subscription Modal */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="fixed inset-0" onClick={() => setSelectedPlanModal(null)} />
          
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 z-10 border border-slate-200 space-y-4">
            <button
              onClick={() => setSelectedPlanModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase text-emerald-700">
                {selectedPlanModal.duration}
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                {selectedPlanModal.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {selectedPlanModal.subtitle}
              </p>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold text-slate-900">
                  ₹{selectedPlanModal.price}
                </span>
                <span className="text-xs text-slate-500 block">{selectedPlanModal.savings}</span>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                {selectedPlanModal.mealsIncluded}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                Sample Weekly Menu
              </h4>
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 space-y-1.5 text-xs text-slate-700">
                {selectedPlanModal.sampleItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleSubscribe(selectedPlanModal)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Confirm Subscription (₹{selectedPlanModal.price})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
