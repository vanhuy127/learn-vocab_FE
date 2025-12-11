import { create } from 'zustand';

import type { IUserAccount } from '@/interface';

interface AuthState {
  user: IUserAccount | null;
  setUser: (user: IUserAccount | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
