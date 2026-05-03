import { create } from "zustand";

const storeFunc = (set) => ({
  showCancelSubscription: false,

  showCreateLoanModel: false,

  showCreateClientModel: false,

  showSidebar: false,

  showAddPaymentModel: false,

  setShowCancelSubscription: (value: boolean) =>
    set({ showCancelSubscription: value }),

  setShowCreateLoanModel: (value: boolean) =>
    set({ showCreateLoanModel: value }),

  setShowCreateClientModel: (value: boolean) =>
    set({ showCreateClientModel: value }),

  setShowSidebar: (value: boolean) => set({ showSidebar: value }),

  setShowAddPaymentModel: (value: boolean) =>
    set({ showAddPaymentModel: value }),
});

const useShowElementStore = create(storeFunc);

export default useShowElementStore;
