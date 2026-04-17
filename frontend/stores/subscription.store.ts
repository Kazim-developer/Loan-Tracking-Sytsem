import { create } from "zustand";
import { persist } from "zustand/middleware";

type SubscriptionState = {
  activeSubscriptionPlan: string;
  pendingSubscriptionPlan: string;
  cancellingPlan: string;
  cancelAt: string;

  setSubscriptionData: (data: Partial<SubscriptionState>) => void;
  resetWorkflowState: () => void;
};

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      activeSubscriptionPlan: "",
      pendingSubscriptionPlan: "",
      cancellingPlan: "",
      cancelAt: "",

      setSubscriptionData: (data) => set((state) => ({ ...state, ...data })),

      resetWorkflowState: () =>
        set({
          pendingSubscriptionPlan: "",
          cancellingPlan: "",
        }),
    }),
    {
      name: "subscription-store",

      // ONLY persist workflow intent, NOT server state
      partialize: (state) => ({
        pendingSubscriptionPlan: state.pendingSubscriptionPlan,
        cancellingPlan: state.cancellingPlan,
      }),
    },
  ),
);
