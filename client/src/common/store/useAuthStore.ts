import { create } from 'zustand';
import type { AuthUserType } from '../types/authUserType';

type AuthStore = {
  user: AuthUserType | null;
  accessToken: string | null;

  setToken: (accessToken: string | null) => void;
  setUser: (user: AuthUserType | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,

  setToken: (accessToken) => set({ accessToken }),
  setUser: (user) => set({ user }),
  clearAuth: () => set({ accessToken: null, user: null }),
}));
