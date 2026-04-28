import { LoanData } from "./loanData.validator";
import { Installment } from "./installment.validator";

type InstallmentData = {
  installmentAmount?: number;
  lastInstallmentDate?: string;
  totalInstallments: number;
  installmentSchedule?: Installment[];
};

export type LoanCreationPayload = LoanData & {
  totalPayable: number;
  installmentData: InstallmentData;
};
