export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'healthy_meals' | 'south_indian' | 'quick_bites' | 'healthy_drinks' | 'fruits' | 'combos';
  categoryLabel: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isVeg: boolean;
  calories: number;
  prepTime: string;
  protein: string;
  carbs: string;
  fat: string;
  portionSize: string;
  ingredients: string[];
  image: string;
  fallbackColor: string;
  isBestseller?: boolean;
  isHighProtein?: boolean;
  isBreakfastSpecial?: boolean;
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  landmark?: string;
  city: string;
  pincode: string;
  deliveryType: 'standard' | 'express' | 'schedule';
  deliveryTimeSlot: string;
  paymentMethod: 'upi' | 'cod' | 'card' | 'netbanking';
  status: 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';
  createdAt: string;
  estimatedDelivery: string;
}

export interface UserAddress {
  id: string;
  label: 'Home' | 'Office' | 'Other';
  address: string;
  landmark: string;
  city: string;
  pincode: string;
  isDefault?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  addresses: UserAddress[];
  favoriteIds: string[];
  activeMealPlan?: string;
}

export interface MealPlan {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  price: number;
  savings: string;
  mealsIncluded: string;
  idealFor: string;
  sampleItems: string[];
  features: string[];
  badge?: string;
  colorScheme: string;
}

export interface OfferCoupon {
  code: string;
  discountPercent?: number;
  flatDiscount?: number;
  minOrder: number;
  title: string;
  description: string;
  badge: string;
  expiresIn: string;
}
