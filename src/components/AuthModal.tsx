import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, User, Mail, Lock, Phone, ArrowRight, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, loginUser } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginUser(email, name || 'Working Professional');
  };

  const handleQuickLogin = (demoName: string, demoEmail: string) => {
    loginUser(demoEmail, demoName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={() => setIsAuthOpen(false)} />

      {/* Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 border border-slate-200 space-y-6">
        
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-xl shadow-xs">
            🥗
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-display">
            {isSignUp ? 'Create MorningBite Account' : 'Welcome to MorningBite'}
          </h2>
          <p className="text-xs text-slate-500">
            {isSignUp
              ? 'Join thousands of healthy morning breakfast achievers'
              : 'Sign in to access your meal plans, addresses & favorites'}
          </p>
        </div>

        {/* Quick Demo Login Preset Buttons for easy testing */}
        <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100 space-y-2 text-center">
          <span className="text-[11px] font-bold uppercase text-emerald-800 tracking-wider block">
            Instant Demo Sign-In
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('Arjun Mehta (Tech Lead)', 'arjun.mehta@techcorp.in')}
              className="flex-1 py-1.5 px-2 bg-white text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              Demo: Office Employee
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('Pooja Iyer (Student)', 'pooja.iyer@campus.edu')}
              className="flex-1 py-1.5 px-2 bg-white text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              Demo: Student
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isSignUp && (
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Your Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  required={isSignUp}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arjun Mehta"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Work or Personal Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="password"
                required
                defaultValue="secret123"
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          {isSignUp ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-emerald-700 font-bold hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              New to MorningBite?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-emerald-700 font-bold hover:underline"
              >
                Create Account
              </button>
            </span>
          )}
        </div>

      </div>

    </div>
  );
};
