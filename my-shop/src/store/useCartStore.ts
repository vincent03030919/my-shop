import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  currency: string;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setCurrency: (currency: string) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  currency: 'USD',
  
  addItem: (product: Product, quantity: number) => {
    set((state) => {
      const existingItem = state.items.find(item => item.productId === product.id);
      
      if (existingItem) {
        return {
          items: state.items.map(item => 
            item.productId === product.id 
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          )
        };
      } else {
        return {
          items: [...state.items, { productId: product.id, quantity, product }]
        };
      }
    });
  },
  
  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter(item => item.productId !== productId)
    }));
  },
  
  updateQuantity: (productId: string, quantity: number) => {
    set((state) => ({
      items: state.items.map(item => 
        item.productId === productId 
          ? { ...item, quantity } 
          : item
      )
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  setCurrency: (currency: string) => {
    set({ currency });
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotalPrice: () => {
    return get().items.reduce((total, item) => {
      // In a real app, you would convert currencies here
      return total + (item.product.price * item.quantity);
    }, 0);
  }
}));