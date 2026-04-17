import { create } from "zustand";

const storeFunc = (set) => ({
  showCancelSubscription: false,

  setShowCancelSubscription: (value: boolean) =>
    set({ showCancelSubscription: value }),
});

const useShowElementStore = create(storeFunc);

export default useShowElementStore;
