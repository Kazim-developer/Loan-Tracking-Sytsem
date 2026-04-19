import { create } from "zustand";

const storeFunc = (set) => ({
  showCancelSubscription: false,

  showCreateLoanModel: false,

  setShowCancelSubscription: (value: boolean) =>
    set({ showCancelSubscription: value }),

  setShowCreateLoanModel: (value: boolean) =>
    set({ showCreateLoanModel: value }),
});

const useShowElementStore = create(storeFunc);

export default useShowElementStore;
