import { create } from "zustand";
import { persist } from "zustand/middleware";

const storeFunc = (set) => ({
  email: "",
  loginMethod: "",
  profileUrl: "",

  setEmail: (email: string) => set({ email }),
  setLoginMethod: (method: string) => set({ method }),
  setProfileUrl: (url: string) => set({ profileUrl: url }),
});

const useAuthStore = create(
  persist(storeFunc, {
    name: "login-user",
    partialize: (state) => ({
      email: state.email,
      method: state.loginMethod,
      profileUrl: state.profileUrl,
    }),
  }),
);

export default useAuthStore;
