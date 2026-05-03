import { create } from "zustand";

type LoanDataState = {
  setLoanData: (data: Partial<LoanDataState>) => void;
};

export const useLoanDataStore = create<LoanDataState>()((set) => ({
  setLoanData: (data) => set((s) => ({ ...s, ...data })),
}));
