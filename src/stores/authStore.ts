import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  user: { email: string } | null;
  setUserData: (user: { email: string }) => void;
  logout: () => void;
}
export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      setUserData: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
