import { create } from "zustand";
import { persist } from "zustand/middleware";

const storeFunc = (set) => ({
  activeSubscriptionPlan: "",

  setSubscriptionPlan: (value: string) =>
    set({ activeSubscriptionPlan: value }),
});

const useSubscriptionStore = create(
  persist(storeFunc, {
    name: "active-subscription",
    partialize: (state) => ({ activePlan: state.activeSubscriptionPlan }),
  }),
);

export default useSubscriptionStore;
