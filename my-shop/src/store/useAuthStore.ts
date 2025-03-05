import { create } from 'zustand';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithWeChat: () => Promise<void>;
  logout: () => void;
  updateUserPreferences: (language: string, currency: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name || 'User',
          language: data.user.user_metadata?.language || 'en',
          currency: data.user.user_metadata?.currency || 'USD',
        };
        
        set({ user, isAuthenticated: true, isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true });
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            language: 'en',
            currency: 'USD',
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        const user: User = {
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name || name,
          language: data.user.user_metadata?.language || 'en',
          currency: data.user.user_metadata?.currency || 'USD',
        };
        
        set({ user, isAuthenticated: true, isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  loginWithGoogle: async () => {
    set({ isLoading: true });
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      
      if (error) throw error;
      
      // The user will be redirected to Google for authentication
      // We'll handle the callback in a separate component
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  loginWithWeChat: async () => {
    set({ isLoading: true });
    
    try {
      // Note: WeChat provider needs to be configured in Supabase dashboard
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'wechat',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      
      if (error) throw error;
      
      // The user will be redirected to WeChat for authentication
      // We'll handle the callback in a separate component
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
  
  updateUserPreferences: async (language: string, currency: string) => {
    set((state) => {
      if (!state.user) return state;
      
      // Update local state
      const updatedUser = { ...state.user, language, currency };
      
      // Update user metadata in Supabase
      supabase.auth.updateUser({
        data: { language, currency }
      }).catch(error => {
        console.error('Error updating user preferences:', error);
      });
      
      return { user: updatedUser };
    });
  }
}));

// Initialize auth state from session
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) {
    const user: User = {
      id: session.user.id,
      email: session.user.email || '',
      name: session.user.user_metadata?.name || 'User',
      language: session.user.user_metadata?.language || 'en',
      currency: session.user.user_metadata?.currency || 'USD',
    };
    
    useAuthStore.setState({ 
      user, 
      isAuthenticated: true 
    });
  }
});

// Listen for auth changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    const user: User = {
      id: session.user.id,
      email: session.user.email || '',
      name: session.user.user_metadata?.name || 'User',
      language: session.user.user_metadata?.language || 'en',
      currency: session.user.user_metadata?.currency || 'USD',
    };
    
    useAuthStore.setState({ 
      user, 
      isAuthenticated: true 
    });
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({ 
      user: null, 
      isAuthenticated: false 
    });
  }
});