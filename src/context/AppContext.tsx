import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserProfile, MealPlan, OfferCoupon } from '../types';
import { PRODUCTS, PROMO_OFFERS } from '../data/foodData';

interface FilterState {
  vegOnly: boolean;
  maxCalories: number;
  highProteinOnly: boolean;
  maxPrepTime: number; // in mins, 0 for all
  sortBy: 'popularity' | 'price_asc' | 'price_desc' | 'rating';
}

interface AppContextType {
  // Catalog & Filtering
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  filteredProducts: Product[];
  resetFilters: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  appliedCoupon: OfferCoupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  finalTotal: number;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Modals & Drawers
  activeModalProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  activeMealPlanModal: MealPlan | null;
  setActiveMealPlanModal: (plan: MealPlan | null) => void;

  // Orders
  orders: Order[];
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'estimatedDelivery'>) => Order;

  // User Auth
  user: UserProfile | null;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  updateAddresses: (addresses: UserProfile['addresses']) => void;

  // Notifications
  notification: string | null;
  showNotification: (msg: string) => void;

  // Quick navigation
  scrollToSection: (sectionId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialFilters: FilterState = {
  vegOnly: false,
  maxCalories: 1000,
  highProteinOnly: false,
  maxPrepTime: 0,
  sortBy: 'popularity',
};

const DEFAULT_USER: UserProfile = {
  name: 'Arjun Mehta',
  email: 'arjun.mehta@techcorp.in',
  phone: '+91 98765 43210',
  addresses: [
    {
      id: 'addr-1',
      label: 'Office',
      address: 'Desk #402, Building 4B, Helios Tech Park, Outer Ring Road',
      landmark: 'Opposite Cisco Gate 2',
      city: 'Bengaluru',
      pincode: '560103',
      isDefault: true,
    },
    {
      id: 'addr-2',
      label: 'Home',
      address: 'Flat 304, Green Glen Apartment, Bellandur',
      landmark: 'Near EcoWorld Backgate',
      city: 'Bengaluru',
      pincode: '560103',
    },
  ],
  favoriteIds: ['mb-01', 'mb-07', 'mb-12'],
  activeMealPlan: '5-Day Morning Breakfast Plan',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mb_cart');
      return saved ? JSON.parse(saved) : [
        { product: PRODUCTS[0], quantity: 1 },
        { product: PRODUCTS[6], quantity: 1 }
      ];
    } catch {
      return [];
    }
  });

  // Favorites persisted to localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mb_favorites');
      return saved ? JSON.parse(saved) : ['mb-01', 'mb-02', 'mb-07', 'mb-12'];
    } catch {
      return ['mb-01', 'mb-02'];
    }
  });

  // Orders persisted to localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('mb_orders');
      if (saved) return JSON.parse(saved);
      // Sample previous order
      return [
        {
          id: 'MB-78241',
          items: [
            { product: PRODUCTS[0], quantity: 2 },
            { product: PRODUCTS[14], quantity: 1 }
          ],
          subtotal: 185,
          deliveryFee: 0,
          discount: 20,
          total: 165,
          customerName: 'Arjun Mehta',
          phone: '+91 98765 43210',
          email: 'arjun.mehta@techcorp.in',
          address: 'Desk #402, Helios Tech Park, ORR',
          city: 'Bengaluru',
          pincode: '560103',
          deliveryType: 'standard',
          deliveryTimeSlot: '7:30 AM – 8:00 AM',
          paymentMethod: 'upi',
          status: 'delivered',
          createdAt: 'Yesterday at 7:15 AM',
          estimatedDelivery: 'Delivered at 7:42 AM'
        }
      ];
    } catch {
      return [];
    }
  });

  // Modals & UI states
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeMealPlanModal, setActiveMealPlanModal] = useState<MealPlan | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('mb_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<OfferCoupon | null>(PROMO_OFFERS[0]); // default FIRST20
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('mb_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('mb_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('mb_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('mb_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('mb_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSelectedCategory('all');
    setSearchQuery('');
  };

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showNotification(`Added ${product.name} to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showNotification('Item removed from cart');
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart calculations
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Delivery fee is ₹0 if cartSubtotal >= 199, else ₹30
  const deliveryFee = cartSubtotal >= 199 || cartSubtotal === 0 ? 0 : 30;

  // Coupon application logic
  const applyCoupon = (code: string) => {
    const found = PROMO_OFFERS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code.' };
    }
    if (cartSubtotal < found.minOrder) {
      return { success: false, message: `Minimum order amount of ₹${found.minOrder} required for ${found.code}.` };
    }
    setAppliedCoupon(found);
    showNotification(`Coupon ${found.code} applied successfully!`);
    return { success: true, message: `Coupon ${found.code} applied!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showNotification('Coupon removed');
  };

  let discountAmount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.flatDiscount) {
      discountAmount = Math.min(appliedCoupon.flatDiscount, cartSubtotal);
    }
  }

  const finalTotal = Math.max(0, cartSubtotal + deliveryFee - discountAmount);

  // Favorites
  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showNotification('Removed from favorites');
        return prev.filter((id) => id !== productId);
      } else {
        showNotification('Saved to favorites ❤️');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  // Product modal
  const openProductModal = (product: Product) => {
    setActiveModalProduct(product);
  };

  const closeProductModal = () => {
    setActiveModalProduct(null);
  };

  // Auth
  const loginUser = (email: string, name?: string) => {
    const newUser: UserProfile = {
      name: name || email.split('@')[0],
      email: email,
      phone: '+91 98765 43210',
      addresses: DEFAULT_USER.addresses,
      favoriteIds: favorites,
    };
    setUser(newUser);
    setIsAuthOpen(false);
    showNotification(`Welcome back, ${newUser.name}!`);
  };

  const logoutUser = () => {
    setUser(null);
    setIsProfileOpen(false);
    showNotification('Logged out successfully');
  };

  const updateAddresses = (addresses: UserProfile['addresses']) => {
    if (user) {
      setUser({ ...user, addresses });
      showNotification('Address book updated');
    }
  };

  // Place order
  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'estimatedDelivery'>) => {
    const newId = `MB-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id: newId,
      status: 'confirmed',
      createdAt: 'Just now',
      estimatedDelivery: 'Estimated within 25–30 mins',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    showNotification(`🎉 Order ${newId} placed successfully!`);
    return newOrder;
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter((item) => {
    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'breakfast' && !item.isBreakfastSpecial && item.category !== 'breakfast' && item.category !== 'south_indian') {
        return false;
      }
      if (selectedCategory !== 'breakfast' && item.category !== selectedCategory) {
        return false;
      }
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCat = item.categoryLabel.toLowerCase().includes(q);
      const matchIngr = item.ingredients.some((ing) => ing.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchCat && !matchIngr) {
        return false;
      }
    }

    // Veg filter
    if (filters.vegOnly && !item.isVeg) {
      return false;
    }

    // Max calories
    if (filters.maxCalories && item.calories > filters.maxCalories) {
      return false;
    }

    // High protein
    if (filters.highProteinOnly && !item.isHighProtein) {
      return false;
    }

    // Max prep time
    if (filters.maxPrepTime > 0) {
      const timeNum = parseInt(item.prepTime);
      if (timeNum > filters.maxPrepTime) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price_asc') return a.price - b.price;
    if (filters.sortBy === 'price_desc') return b.price - a.price;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    // popularity
    return (b.reviewsCount || 0) - (a.reviewsCount || 0);
  });

  return (
    <AppContext.Provider
      value={{
        products: PRODUCTS,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        filteredProducts,
        resetFilters,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        deliveryFee,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        finalTotal,
        favorites,
        toggleFavorite,
        isFavorite,
        activeModalProduct,
        openProductModal,
        closeProductModal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAuthOpen,
        setIsAuthOpen,
        isProfileOpen,
        setIsProfileOpen,
        activeMealPlanModal,
        setActiveMealPlanModal,
        orders,
        currentOrder,
        setCurrentOrder,
        placeOrder,
        user,
        loginUser,
        logoutUser,
        updateAddresses,
        notification,
        showNotification,
        scrollToSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
