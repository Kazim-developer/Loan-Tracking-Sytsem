import { create } from "zustand";
import { persist } from "zustand/middleware";

const storeFunc = (set) => ({
  email: "",
  loginMethod: "",
  imageUrl: "",

  isAuthenticated: false,
  isGoogleLogin: false,
  authChecked: false,

  userId: "",
  accountId: "",

  setEmail: (email: string) => set({ email }),
  setLoginMethod: (method: string) => set({ loginMethod: method }),
  setImageUrl: (url: string) => set({ imageUrl: url }),

  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
  setAuthChecked: (value: boolean) => set({ authChecked: value }),
  setIsGoogleLogin: (value: boolean) => set({ isGoogleLogin: value }),

  setUserId: (id: string) => set({ userId: id }),
  setAccountId: (id: string) => set({ accountId: id }),

  resetAuthStore: () => {
    set({
      email: "",
      loginMethod: "",
      imageUrl: "",
      userId: "",
      accountId: "",
      isAuthenticated: false,
      isGoogleLogin: false,
      authChecked: false,
    });

    localStorage.removeItem("login-user");
  },
});

const useAuthStore = create(
  persist(storeFunc, {
    name: "login-user",

    partialize: (state) => ({
      email: state.email,
      loginMethod: state.loginMethod,
      imageUrl: state.imageUrl,
    }),
  }),
);

export default useAuthStore;
