import { create } from "zustand";

interface AuthState {
  user: { email: string } | null;
  setUserData: (user: { email: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUserData: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
