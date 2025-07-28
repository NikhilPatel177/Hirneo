import { create } from 'zustand';
import type { IUser } from '../types/IUser';

type AuthStore = {
  user: IUser | null;
  accessToken: string | null;

  setToken: (accessToken: string | null) => void;
  setUser: (user: IUser) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,

  setToken: (accessToken) => set({ accessToken }),
  setUser: (user) => set({ user }),
  clearAuth: () => set({ accessToken: null, user: null }),
}));
