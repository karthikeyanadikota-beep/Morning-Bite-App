import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryBar } from './components/CategoryBar';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { EmployeeSection } from './components/EmployeeSection';
import { OffersSection } from './components/OffersSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { AuthModal } from './components/AuthModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { N8nChatWidget } from './components/N8nChatWidget';
import { Footer } from './components/Footer';
import { CheckCircle2, RotateCcw } from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    filteredProducts, 
    selectedCategory, 
    searchQuery, 
    resetFilters,
    notification 
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFDFB]">
      
      {/* Top Header */}
      <Header />

      {/* Main Page Sections */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Food Category Navigator */}
        <CategoryBar />

        {/* 3. Product Catalog Grid */}
        <section id="menu-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700">
                Fresh From Dawn Kitchens
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-0.5">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Healthy Morning & Lunch Menu'}
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium mt-1 sm:mt-0">
              Steamed &amp; slow-cooked with fresh local farm produce
            </span>
          </div>

          {/* Interactive Filter & Sort Controls */}
          <FilterBar />

          {/* Food Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-xs">
              <span className="text-5xl block">🔍</span>
              <h3 className="text-lg font-bold text-slate-900">
                No matching dishes found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                We couldn't find any dishes matching your current search or filter criteria. Try relaxing your calorie or dietary filters.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </section>

        {/* 4. Special Employee Section & Weekly Meal Plans */}
        <EmployeeSection />

        {/* 5. Promotional Offers Section */}
        <OffersSection />

        {/* 6. Why Choose MorningBite */}
        <WhyChooseUs />

        {/* 7. Customer Testimonials */}
        <ReviewsSection />

      </main>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Tab Bar */}
      <MobileBottomNav />

      {/* Interactive Overlays & Modals */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <AuthModal />
      <ProfileDrawer />
      <N8nChatWidget />

      {/* Toast Notification Bar */}
      {notification && (
        <div className="fixed bottom-16 md:bottom-6 right-4 md:right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
