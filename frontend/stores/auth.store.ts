import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  email: string;
  loginMethod: string;
  imageUrl: string;

  isAuthenticated: boolean;
  isGoogleLogin: boolean;
  authChecked: boolean;
  hydrated: boolean;

  userId: string;
  accountId: string;

  setAuthUser: (user: Partial<AuthState>) => void;
  setAuthChecked: (value: boolean) => void;
  setHydrated: (value: boolean) => void;
  resetAuthStore: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: "",
      loginMethod: "",
      imageUrl: "",

      isAuthenticated: false,
      isGoogleLogin: false,
      authChecked: false,
      hydrated: false,

      userId: "",
      accountId: "",

      setAuthUser: (user) => set(user),

      setAuthChecked: (value) => set({ authChecked: value }),
      setHydrated: (value) => set({ hydrated: value }),

      resetAuthStore: () =>
        set({
          email: "",
          loginMethod: "",
          imageUrl: "",
          isAuthenticated: false,
          isGoogleLogin: false,
          authChecked: false,
          userId: "",
          accountId: "",
        }),
    }),
    {
      name: "auth-store",

      partialize: (state) => ({
        email: state.email,
        loginMethod: state.loginMethod,
        imageUrl: state.imageUrl,
        isAuthenticated: state.isAuthenticated,
        isGoogleLogin: state.isGoogleLogin,
        userId: state.userId,
        accountId: state.accountId,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
