export type RepaymentType = "one-time" | "installments" | "";
export type InterestType = "SIMPLE" | "COMPOUND" | "";
export type InstallmentFrequency = "WEEKLY" | "MONTHLY" | "";
export type AutomaticCalculations = "installments" | "last-date" | "";

export type LoanData = {
  clientId: string;
  totalAmount: string;

  interestRate?: string;
  interestType?: InterestType;

  startingDate: string;

  // one-time
  endDate?: string;

  hasInstallments: boolean;

  // installments
  firstInstallmentDate?: string;

  totalInstallments?: number;
  lastInstallmentDate?: string;

  installmentFrequency?: InstallmentFrequency;
  repaymentType: RepaymentType;
};
