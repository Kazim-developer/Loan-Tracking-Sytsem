import { create } from "zustand";
import { persist } from "zustand/middleware";

const storeFunc = (set) => ({
  activeSubscriptionPlan: "",
  pendingSubscriptionPlan: "",

  isPolling: false,

  setSubscriptionPlan: (value: string) =>
    set({ activeSubscriptionPlan: value }),

  setPendingPlan: (plan: string) => set({ pendingSubscriptionPlan: plan }),

  setIsPolling: (value: boolean) => set({ isPolling: value }),
});

const useSubscriptionStore = create(
  persist(storeFunc, {
    name: "active-subscription",
    partialize: (state) => ({ activePlan: state.activeSubscriptionPlan }),
  }),
);

export default useSubscriptionStore;
