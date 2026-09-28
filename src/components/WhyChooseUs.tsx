import React from 'react';
import { 
  Salad, 
  ChefHat, 
  Bike, 
  Sparkles, 
  Coins, 
  Heart,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Salad className="w-6 h-6 text-emerald-600" />,
      title: 'Healthy Ingredients',
      description: 'Zero refined palm oil or artificial colors. Naturally fermented batters, whole grains, cold-pressed oils, and farm vegetables.',
      color: 'bg-emerald-50 border-emerald-200/70',
    },
    {
      icon: <ChefHat className="w-6 h-6 text-amber-600" />,
      title: 'Freshly Prepared at Dawn',
      description: 'Our kitchens begin steaming idlis and hand-rolling chapatis at 4:30 AM every morning. Nothing is frozen or reheated.',
      color: 'bg-amber-50 border-amber-200/70',
    },
    {
      icon: <Bike className="w-6 h-6 text-blue-600" />,
      title: 'Fast & Scheduled Delivery',
      description: 'Guaranteed 30-minute hot delivery or pre-scheduled sunrise slots (6:30 AM to 8:30 AM) to fit your work commute.',
      color: 'bg-blue-50 border-blue-200/70',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-teal-600" />,
      title: 'Hygienic Kitchens',
      description: '100% FSSAI certified high-sanitation commercial prep stations with daily UV sterilization, hairnets, and thermal monitoring.',
      color: 'bg-teal-50 border-teal-200/70',
    },
    {
      icon: <Coins className="w-6 h-6 text-orange-600" />,
      title: 'Affordable Prices',
      description: 'Wholesome breakfast starting at just ₹50. Nutritious, clean homestyle food shouldn’t be a luxury for students & employees.',
      color: 'bg-orange-50 border-orange-200/70',
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-600" />,
      title: 'Made With Care',
      description: 'Cooked with the comforting warmth and love of a family kitchen, balancing traditional authentic South & North Indian flavors.',
      color: 'bg-rose-50 border-rose-200/70',
    },
  ];

  return (
    <section id="why-us" className="py-16 bg-slate-50/70 border-t border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700">
            Our Quality Promise
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Why Choose MorningBite?
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            We solve the morning breakfast dilemma for thousands of professionals every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl bg-white border ${item.color} shadow-xs hover:shadow-md transition-all duration-300 space-y-3`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quality stats row */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 font-display tabular-nums">
              25,000+
            </span>
            <span className="text-xs text-slate-500 font-semibold block mt-1">
              Morning Meals Delivered
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 font-display tabular-nums">
              99.2%
            </span>
            <span className="text-xs text-slate-500 font-semibold block mt-1">
              On-Time Slot Delivery
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 font-display tabular-nums">
              4.9★
            </span>
            <span className="text-xs text-slate-500 font-semibold block mt-1">
              Customer Satisfaction
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 font-display tabular-nums">
              0%
            </span>
            <span className="text-xs text-slate-500 font-semibold block mt-1">
              Preservatives or Palm Oil
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
