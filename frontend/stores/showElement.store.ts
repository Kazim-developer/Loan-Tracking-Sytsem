import { create } from "zustand";

const storeFunc = (set) => ({
  showCancelSubscription: false,

  showCreateLoanModel: false,

  showCreateClientModel: false,

  showSidebar: false,

  setShowCancelSubscription: (value: boolean) =>
    set({ showCancelSubscription: value }),

  setShowCreateLoanModel: (value: boolean) =>
    set({ showCreateLoanModel: value }),

  setShowCreateClientModel: (value: boolean) =>
    set({ showCreateClientModel: value }),

  setShowSidebar: (value: boolean) => set({ showSidebar: value }),
});

const useShowElementStore = create(storeFunc);

export default useShowElementStore;
