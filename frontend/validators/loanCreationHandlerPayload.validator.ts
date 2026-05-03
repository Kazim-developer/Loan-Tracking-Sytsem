import { LoanData } from "./loanData.validator";

export type handlerPayload = {
  loanData: LoanData;
  totalPayable: number;
  totalInstallments: number;
  installmentAmount: number;
};
