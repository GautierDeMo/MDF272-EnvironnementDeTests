import { create } from 'zustand';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (userData: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,

  login: async (userData) => {
    try {
      const res = await api.post('/auth/login', userData);
      localStorage.setItem('token', res.data.token);
      set({
        token: res.data.token,
        isAuthenticated: true,
        user: res.data.user,
        loading: false,
      });
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      set({
        token: res.data.token,
        isAuthenticated: true,
        user: res.data.user,
        loading: false,
      });
    } catch (error) {
      console.error('Register error', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      token: null,
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  },

  loadUser: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ loading: false, isAuthenticated: false, user: null });
        return;
      }

      const res = await api.get('/auth/me');
      set({
        isAuthenticated: true,
        user: res.data.user,
        loading: false,
      });
    } catch (error) {
      localStorage.removeItem('token');
      set({
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    }
  },
}));