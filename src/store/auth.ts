import { create } from 'zustand';

import type { IUserAccount } from '@/interface';

interface AuthState {
  user: IUserAccount | null;
  accessToken: string | null;
  setUser: (user: IUserAccount | null) => void;
  setAccessToken: (accessToken: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
  clearAuth: () => set({ user: null, accessToken: null }),
}));
