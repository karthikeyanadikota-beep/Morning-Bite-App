import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Calendar,
  Building,
  Home
} from 'lucide-react';
import { TIME_SLOTS } from '../data/foodData';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    deliveryFee, 
    discountAmount, 
    finalTotal, 
    placeOrder, 
    user 
  } = useApp();

  const defaultAddr = user?.addresses[0];

  const [fullName, setFullName] = useState(user?.name || 'Arjun Mehta');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [email, setEmail] = useState(user?.email || 'arjun.mehta@techcorp.in');
  const [address, setAddress] = useState(defaultAddr?.address || 'Desk #402, Helios Tech Park, Outer Ring Road');
  const [landmark, setLandmark] = useState(defaultAddr?.landmark || 'Opposite Cisco Gate 2');
  const [city, setCity] = useState(defaultAddr?.city || 'Bengaluru');
  const [pincode, setPincode] = useState(defaultAddr?.pincode || '560103');

  const [deliveryType, setDeliveryType] = useState<'standard' | 'express' | 'schedule'>('schedule');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[1].label); // 7:00 AM - 7:30 AM
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card' | 'netbanking'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !pincode) {
      alert('Please fill in your name, contact phone, and delivery address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder({
        items: cart,
        subtotal: cartSubtotal,
        deliveryFee,
        discount: discountAmount,
        total: finalTotal,
        customerName: fullName,
        phone,
        email,
        address,
        landmark,
        city,
        pincode,
        deliveryType,
        deliveryTimeSlot: selectedTimeSlot,
        paymentMethod,
      });
      setIsSubmitting(false);
    }, 700);
  };

  const handleSelectSavedAddress = (saved: any) => {
    setAddress(saved.address);
    setLandmark(saved.landmark || '');
    setCity(saved.city);
    setPincode(saved.pincode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={() => setIsCheckoutOpen(false)} />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[94vh] flex flex-col border border-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              🛍️
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Fast &amp; Fresh Checkout
              </h2>
              <span className="text-xs text-slate-500">
                Delivering to your home or office on time
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          
          {/* Section 1: Customer Contact Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">1</span>
                Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                  placeholder="e.g. Arjun Mehta"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                  placeholder="arjun@example.com"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">2</span>
                Delivery Location
              </h3>

              {/* Quick Saved Address Pills */}
              {user?.addresses && (
                <div className="flex items-center gap-1.5">
                  {user.addresses.map((saved) => (
                    <button
                      key={saved.id}
                      type="button"
                      onClick={() => handleSelectSavedAddress(saved)}
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg border transition-colors flex items-center gap-1 cursor-pointer ${
                        address === saved.address
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {saved.label === 'Office' ? <Building className="w-3 h-3" /> : <Home className="w-3 h-3" />}
                      <span>{saved.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Flat / House / Office Desk &amp; Building *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                  placeholder="e.g. Desk #402, 4th Floor, Tech Park or Flat 302, Green Glen"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Landmark</label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                    placeholder="Near main security gate"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none"
                    placeholder="560103"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Delivery Options & Morning Time Slots */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">3</span>
              Delivery Preference &amp; Breakfast Time Slot
            </h3>

            {/* Delivery Mode Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDeliveryType('standard')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  deliveryType === 'standard'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold mb-0.5">
                  <span>🚴 Standard</span>
                </div>
                <span className="text-[10px] text-slate-500 block">30–35 mins</span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('express')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  deliveryType === 'express'
                    ? 'border-amber-600 bg-amber-50/70 text-amber-950 font-bold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold mb-0.5 text-amber-700">
                  <Zap className="w-3.5 h-3.5" />
                  <span>⚡ Express</span>
                </div>
                <span className="text-[10px] text-slate-500 block">Within 20–25 mins</span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('schedule')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  deliveryType === 'schedule'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold mb-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>⏰ Scheduled Slot</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-medium block">Recommended</span>
              </button>
            </div>

            {/* Time Slot Picker (Specific to Breakfast / Lunch timings) */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                Select Preferred Morning/Lunch Slot:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTimeSlot === slot.label;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot.label)}
                      className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <span className="text-xs font-extrabold block">{slot.label}</span>
                      <span className={`text-[10px] block truncate ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                        {slot.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 4: Payment Options */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">4</span>
              Payment Method
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-lg mb-1 block">📱</span>
                <span className="text-xs font-bold block">Instant UPI</span>
                <span className="text-[10px] text-slate-500">GPay, PhonePe, Paytm</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-lg mb-1 block">💵</span>
                <span className="text-xs font-bold block">Cash on Delivery</span>
                <span className="text-[10px] text-slate-500">Pay at Doorstep</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-lg mb-1 block">💳</span>
                <span className="text-xs font-bold block">Credit / Debit Card</span>
                <span className="text-[10px] text-slate-500">Visa, Mastercard, RuPay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-lg mb-1 block">🏦</span>
                <span className="text-xs font-bold block">Net Banking</span>
                <span className="text-[10px] text-slate-500">All Major Banks</span>
              </button>
            </div>

            {/* Sub-selector if UPI */}
            {paymentMethod === 'upi' && (
              <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-900">Select UPI App:</span>
                <div className="flex gap-2">
                  {(['gpay', 'phonepe', 'paytm', 'qr'] as const).map((app) => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => setUpiApp(app)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition-colors ${
                        upiApp === app ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {app === 'qr' ? 'Scan QR' : app}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Order Summary Confirmation */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Selected Morning Items ({cart.length})
            </h4>
            <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between text-xs text-slate-700">
                  <span className="truncate pr-2">
                    {item.quantity} × {item.product.name}
                  </span>
                  <span className="font-semibold tabular-nums shrink-0">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Submit Bar inside modal */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 block">Total Amount to Pay</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-emerald-800 tabular-nums">
                  ₹{finalTotal}
                </span>
                {discountAmount > 0 && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    You saved ₹{discountAmount}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-emerald-700/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Place Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
