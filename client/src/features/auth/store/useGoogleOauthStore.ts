import { create } from 'zustand';

type Roles = 'freelancer' | 'client';

type StoreType = {
  role: Roles[] | null;

  setRole: (role: Roles[]) => void;
  clearStore: () => void;
};

export const useGoogleOauthStore = create<StoreType>((set) => ({
  role: null,

  setRole: (role) => set({ role }),
  clearStore: () => set({ role: null }),
}));
