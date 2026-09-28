import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Heart,
  Instagram,
  Twitter,
  Linkedin,
  Facebook
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setSelectedCategory, scrollToSection } = useApp();

  const handleNav = (cat: string) => {
    setSelectedCategory(cat);
    scrollToSection('menu-section');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xl">
                🥗
              </div>
              <span className="text-2xl font-extrabold text-white font-display">
                Morning<span className="text-emerald-400">Bite</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Healthy food. Delivered fresh. Start your day right. We bring authentic, hygienic homestyle breakfast and nutritious office lunch directly to your doorstep before your workday starts.
            </p>

            <div className="flex items-center gap-3 text-slate-400 pt-1">
              <a href="#social" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#social" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#social" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#social" className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>FSSAI License No: 11224333000542 · 100% Certified Hygiene</span>
            </div>
          </div>

          {/* Quick Menu Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Morning Menu
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('breakfast')} className="hover:text-emerald-400 transition-colors">
                  Steamed Idlis &amp; Sambar
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('south_indian')} className="hover:text-emerald-400 transition-colors">
                  Crispy Masala Dosas
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('breakfast')} className="hover:text-emerald-400 transition-colors">
                  Indori Kanda Poha
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('healthy_meals')} className="hover:text-emerald-400 transition-colors">
                  Ragi &amp; Millet Specials
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('healthy_drinks')} className="hover:text-emerald-400 transition-colors">
                  Cold-Pressed Detox Juices
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('combos')} className="hover:text-emerald-400 transition-colors">
                  Grand Power Combos
                </button>
              </li>
            </ul>
          </div>

          {/* Office & Corporate */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Office &amp; Corporate
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollToSection('office-plans')} className="hover:text-emerald-400 transition-colors">
                  5-Day Breakfast Plan
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('office-plans')} className="hover:text-emerald-400 transition-colors">
                  5-Day Executive Lunch
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('office-plans')} className="hover:text-emerald-400 transition-colors">
                  Monthly Healthy Habit Plan
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('offers-section')} className="hover:text-emerald-400 transition-colors">
                  Corporate Bulk Discounts
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('why-us')} className="hover:text-emerald-400 transition-colors">
                  Desk Delivery Badges
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Help &amp; Support
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+91 80 4920 1800</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>support@morningbite.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Delivery: 6:30 AM – 2:30 PM</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Indiranagar &amp; Bellandur Kitchens, Bengaluru</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 MorningBite Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#terms" className="hover:text-slate-300">Terms of Service</a>
            <span>·</span>
            <a href="#privacy" className="hover:text-slate-300">Privacy Policy</a>
            <span>·</span>
            <a href="#hygiene" className="hover:text-slate-300">Hygiene Audits</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
