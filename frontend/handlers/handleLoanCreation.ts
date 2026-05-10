import generateInstallmentSchedule from "@/utils/generateInstallmentSchedule";
import { postFormData } from "./postFormData";

import {
  InstallmentFrequency,
  LoanData,
} from "@/validators/loanData.validator";

const handleLoanCreation = (
  loanData: LoanData,
  totalPayable: number,
  totalInstallments: number,
  installmentAmount: number,
) => {
  let payload;

  const {
    startingDate,
    endDate,
    firstInstallmentDate,
    lastInstallmentDate,
    installmentFrequency,
    repaymentType,
    totalAmount,
    interestRate,
    ...rest
  } = loanData;

  const annualInterestRate = Number(interestRate);
  const loanAmount = Number(totalAmount);

  if (loanData.repaymentType === "one-time" && !loanData.hasInstallments) {
    payload = {
      ...rest,
      totalAmount: loanAmount,
      interestRate: annualInterestRate,
      totalPayable: totalPayable,
      startingDate,
      endDate,
    };
  } else if (
    loanData.repaymentType === "installments" &&
    loanData.hasInstallments
  ) {
    const installments =
      loanData.repaymentType === "installments" && loanData.hasInstallments
        ? generateInstallmentSchedule({
            totalPayable: totalPayable,
            totalInstallments,
            firstInstallmentDate: loanData.firstInstallmentDate as string,
            frequency: loanData.installmentFrequency as InstallmentFrequency,
          })
        : [];

    payload = {
      ...rest,
      totalPayable,
      totalAmount: loanAmount,
      interestRate: annualInterestRate,
      startingDate,
      installmentData: {
        installmentFrequency,
        totalInstallments,
        firstInstallmentDate,
        lastInstallmentDate,
        installmentAmount,
        installmentSchedule: installments,
      },
    };
  }

  return postFormData("create-loan", payload as any);
};

export default handleLoanCreation;
