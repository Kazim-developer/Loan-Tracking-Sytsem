import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoanDataState = {
  clientId: string;
  clientName: string;

  setLoanData: (data: Partial<LoanDataState>) => void;
};

export const useLoanDataStore = create<LoanDataState>()(
  persist(
    (set) => ({
      clientId: "",
      clientName: "",

      setLoanData: (data) => set((s) => ({ ...s, ...data })),
    }),
    {
      name: "loan-data",
    },
  ),
);
