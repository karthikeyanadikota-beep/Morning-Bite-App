import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Aditi Sharma',
      role: 'Senior Software Engineer, Infosys',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      headline: 'Life saver for morning 8 AM standups',
      comment: 'I used to skip breakfast before going to work. MorningBite makes it so easy to get fresh breakfast delivered right on time.',
      verified: true,
      time: 'Delivered at 7:15 AM'
    },
    {
      name: 'Vikram Menon',
      role: 'Product Lead, Helios Tech Park',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      headline: 'The food is fresh, tasty and affordable',
      comment: 'The food is fresh, tasty and affordable. The idlis and sambar taste authentic and light on the stomach. I subscribed to the 5-day breakfast plan!',
      verified: true,
      time: 'Subscribed to 5-Day Plan'
    },
    {
      name: 'Dr. Shalini Rao',
      role: 'Consultant Physician',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      headline: 'Zero acidity, zero cheap oils',
      comment: 'As a doctor, I constantly advise patients against oily street breakfasts. MorningBite uses genuine cold-pressed oils and wholesome millets.',
      verified: true,
      time: 'Verified Customer'
    },
    {
      name: 'Karthik Narayanan',
      role: 'Chartered Accountant',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      headline: 'Poha and fruit bowl is my daily staple',
      comment: 'Hot poha with peanuts plus the cold-pressed detox juice keeps my energy levels consistent all morning until 1:30 PM lunch break.',
      verified: true,
      time: 'Delivered at 7:45 AM'
    },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700">
              Community Love &amp; Trust
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-0.5">
              Loved by Busy Professionals
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0 text-xs font-semibold text-slate-600">
            <div className="flex text-amber-500">
              {'★★★★★'}
            </div>
            <span>4.9 out of 5 based on 2,800+ verified ratings</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 text-sm">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  "{rev.headline}"
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/70 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-emerald-200"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {rev.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 truncate block">
                    {rev.role}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
