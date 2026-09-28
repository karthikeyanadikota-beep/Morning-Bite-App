import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  X, 
  Bike, 
  ChefHat, 
  Sparkles,
  ArrowRight,
  Receipt
} from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { currentOrder, setCurrentOrder, scrollToSection } = useApp();

  const [activeStep, setActiveStep] = useState(2); // Kitchen Preparing Fresh

  useEffect(() => {
    if (!currentOrder) return;
    // Simulate live progress transition
    const timer = setTimeout(() => {
      setActiveStep(3); // On the way
    }, 4500);
    return () => clearTimeout(timer);
  }, [currentOrder]);

  if (!currentOrder) return null;

  const handleClose = () => {
    setCurrentOrder(null);
  };

  const steps = [
    { label: 'Order Confirmed', icon: '✓', sub: 'Received at Central Kitchen' },
    { label: 'Preparing Fresh', icon: '👩‍🍳', sub: 'Steaming hot idlis & dosas' },
    { label: 'Out for Delivery', icon: '🚴', sub: 'Rider en-route with hot insulated bag' },
    { label: 'Delivered', icon: '🏡', sub: 'Enjoy your healthy morning!' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={handleClose} />

      {/* Main Confirmation Box */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col border border-emerald-100">
        
        {/* Floating Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center text-3xl mb-3 shadow-inner">
            🚴
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight">
            Your Healthy Meal is on the Way!
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            Order confirmed. Our master chefs are preparing your breakfast fresh at dawn.
          </p>

          <div className="mt-4 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-900/50 backdrop-blur-md text-emerald-100 text-xs font-mono font-bold tracking-wider">
            <span>ORDER #{currentOrder.id}</span>
            <span aria-hidden="true">·</span>
            <span>SLOT: {currentOrder.deliveryTimeSlot}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Live Order Tracker Stages */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center justify-between">
              <span>Live Order Tracker</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Live Status
              </span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative">
              {steps.map((st, idx) => {
                const stepNum = idx + 1;
                const isCompleted = stepNum < activeStep;
                const isCurrent = stepNum === activeStep;

                return (
                  <div key={st.label} className="flex flex-col items-center text-center">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all shadow-xs mb-2 ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {isCompleted ? '✓' : st.icon}
                    </div>
                    <span className={`text-xs font-bold ${isCurrent ? 'text-amber-800' : isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                      {st.label}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">
                      {st.sub}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery & Rider Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Delivery Destination */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Delivery Location
              </span>
              <p className="text-xs font-bold text-slate-900">
                {currentOrder.customerName} · {currentOrder.phone}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentOrder.address}
                {currentOrder.landmark && `, ${currentOrder.landmark}`}
                <br />
                {currentOrder.city} - {currentOrder.pincode}
              </p>
            </div>

            {/* Estimated Arrival Time */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Delivery Window
              </span>
              <p className="text-sm font-extrabold text-slate-900">
                {currentOrder.deliveryTimeSlot}
              </p>
              <p className="text-xs text-emerald-700 font-medium">
                Insulated thermal packaging keeps food at 65°C
              </p>
              <span className="text-[11px] text-slate-500 block">
                Payment: <strong className="uppercase text-slate-700">{currentOrder.paymentMethod}</strong>
              </span>
            </div>

          </div>

          {/* Ordered Food Items Receipt */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-2.5">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-slate-600" />
              Order Summary ({currentOrder.items.length} items)
            </span>

            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {currentOrder.items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-xs text-slate-700">
                  <span className="font-medium">
                    {item.quantity} × {item.product.name}
                  </span>
                  <span className="font-bold tabular-nums">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-500">Paid Amount</span>
              <span className="text-base font-extrabold text-emerald-800 tabular-nums">
                ₹{currentOrder.total}
              </span>
            </div>
          </div>

        </div>

        {/* Footer CTAs */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              handleClose();
              scrollToSection('menu-section');
            }}
            className="flex-1 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
          >
            Order Another Breakfast
          </button>

          <button
            onClick={handleClose}
            className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Done</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
