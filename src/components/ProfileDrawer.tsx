import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  User, 
  ShoppingBag, 
  MapPin, 
  Heart, 
  Calendar, 
  LogOut, 
  Building, 
  Home, 
  Plus, 
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS } from '../data/foodData';

export const ProfileDrawer: React.FC = () => {
  const { 
    isProfileOpen, 
    setIsProfileOpen, 
    user, 
    logoutUser, 
    orders, 
    favorites, 
    toggleFavorite, 
    addToCart,
    openProductModal,
    updateAddresses
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'favorites' | 'plans'>('orders');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newLabel, setNewLabel] = useState<'Home' | 'Office' | 'Other'>('Office');
  const [newAddressText, setNewAddressText] = useState('');
  const [newLandmark, setNewLandmark] = useState('');
  const [newPincode, setNewPincode] = useState('560103');

  if (!isProfileOpen || !user) return null;

  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressText) return;
    const newAddr = {
      id: `addr-${Date.now()}`,
      label: newLabel,
      address: newAddressText,
      landmark: newLandmark,
      city: 'Bengaluru',
      pincode: newPincode,
    };
    updateAddresses([...(user.addresses || []), newAddr]);
    setShowAddAddress(false);
    setNewAddressText('');
    setNewLandmark('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Background click to dismiss */}
      <div className="flex-1" onClick={() => setIsProfileOpen(false)} />

      {/* Slide Drawer */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 border-l border-slate-200 animate-in slide-in-from-right duration-300">
        
        {/* Header with User Info */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-lg shadow-md shadow-emerald-800/20">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                {user.name}
              </h2>
              <span className="text-xs text-slate-500 block">{user.email}</span>
              <span className="text-[11px] text-emerald-700 font-medium">{user.phone}</span>
            </div>
          </div>

          <button
            onClick={() => setIsProfileOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'orders' ? 'border-emerald-600 text-emerald-700' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'addresses' ? 'border-emerald-600 text-emerald-700' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'favorites' ? 'border-emerald-600 text-emerald-700' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Favorites ({favorites.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('plans')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'plans' ? 'border-emerald-600 text-emerald-700' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Meal Plans</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* TAB 1: My Orders & Previous Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider block">
                Order History &amp; Receipts
              </span>

              {orders.length === 0 ? (
                <div className="p-8 text-center text-slate-500 space-y-2">
                  <span className="text-3xl">📦</span>
                  <p className="text-xs">No orders placed yet. Start your morning with fresh idlis or dosa!</p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">#{ord.id}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500">{ord.createdAt}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        ord.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.status}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="space-y-1 text-xs text-slate-700 border-t border-b border-slate-200/60 py-2">
                      {ord.items.map((it) => (
                        <div key={it.product.id} className="flex justify-between">
                          <span>{it.quantity} × {it.product.name}</span>
                          <span className="font-semibold tabular-nums">₹{it.product.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-500 block text-[11px]">Slot: {ord.deliveryTimeSlot}</span>
                        <span className="font-extrabold text-slate-900 tabular-nums">Total: ₹{ord.total}</span>
                      </div>

                      <button
                        onClick={() => {
                          ord.items.forEach((it) => addToCart(it.product, it.quantity));
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-emerald-800 font-bold hover:bg-emerald-50 transition-colors text-xs cursor-pointer shadow-2xs"
                      >
                        Re-order All
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Delivery Locations
                </span>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              {showAddAddress && (
                <form onSubmit={handleSaveAddress} className="p-4 bg-slate-50 rounded-2xl border border-emerald-200 space-y-3">
                  <div className="flex gap-2">
                    {(['Office', 'Home', 'Other'] as const).map((lbl) => (
                      <button
                        key={lbl}
                        type="button"
                        onClick={() => setNewLabel(lbl)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          newLabel === lbl ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-700'
                        }`}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Address, Desk #, Flat, Building"
                    value={newAddressText}
                    onChange={(e) => setNewAddressText(e.target.value)}
                    className="w-full p-2 text-xs bg-white border rounded-xl"
                  />

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Landmark"
                      value={newLandmark}
                      onChange={(e) => setNewLandmark(e.target.value)}
                      className="flex-1 p-2 text-xs bg-white border rounded-xl"
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={newPincode}
                      onChange={(e) => setNewPincode(e.target.value)}
                      className="w-24 p-2 text-xs bg-white border rounded-xl"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 text-xs bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              {user.addresses?.map((addr) => (
                <div key={addr.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      {addr.label === 'Office' ? <Building className="w-3.5 h-3.5 text-emerald-600" /> : <Home className="w-3.5 h-3.5 text-blue-600" />}
                      <span>{addr.label}</span>
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {addr.address}{addr.landmark && `, ${addr.landmark}`}
                    <br />
                    {addr.city} - {addr.pincode}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Favorite Foods */}
          {activeTab === 'favorites' && (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider block">
                Saved Favorite Dishes ({favoriteProducts.length})
              </span>

              {favoriteProducts.length === 0 ? (
                <div className="p-8 text-center text-slate-500 space-y-2">
                  <span className="text-3xl">❤️</span>
                  <p className="text-xs">No favorites saved yet. Click the heart icon on any food item.</p>
                </div>
              ) : (
                favoriteProducts.map((prod) => (
                  <div key={prod.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{prod.name}</h4>
                      <span className="text-[11px] text-slate-500 block">₹{prod.price} · {prod.calories} kcal</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => addToCart(prod)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                      >
                        + Add
                      </button>
                      <button
                        onClick={() => toggleFavorite(prod.id)}
                        className="p-1 text-rose-500 hover:text-slate-400"
                        title="Remove"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: Active Meal Plans */}
          {activeTab === 'plans' && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider block">
                Subscribed Office Plans
              </span>

              <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                    Active Plan
                  </span>
                  <span className="text-xs font-semibold text-emerald-100">Renewed weekly</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display">
                    5-Day Morning Breakfast Plan
                  </h3>
                  <p className="text-xs text-emerald-100 mt-1">
                    Priority hot breakfast delivery at 7:30 AM before daily standup.
                  </p>
                </div>

                <div className="pt-2 border-t border-emerald-500/50 flex justify-between items-center text-xs">
                  <span>Upcoming: <strong>Tuesday Poha &amp; Sprouts</strong></span>
                  <span className="font-bold text-emerald-200">Delivering 7:30 AM</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer with Logout */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">MorningBite v2.4</span>
          <button
            onClick={logoutUser}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>

    </div>
  );
};
