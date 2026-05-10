import {
  LoanData,
  AutomaticCalculations,
  InterestType,
} from "@/validators/loanData.validator";

import calculateLastInstallmentDate from "./calculateLastInstallmentDate";
import calculateTotalPayable from "./totalPayable";
import calculateInstallments from "./calculateInstallments";
import calculateInstallmentAmount from "./calculateInstallmentAmount";

type ComputeLoanResult = {
  totalPayable: number;
  totalInstallments?: number;
  lastInstallmentDate?: string;
  installmentAmount: number;
};

export function computeLoan(
  loanData: LoanData,
  config: { automaticCalculation: AutomaticCalculations },
): ComputeLoanResult {
  const result: ComputeLoanResult = {
    totalPayable: 0,
    totalInstallments: loanData.totalInstallments,
    lastInstallmentDate: loanData.lastInstallmentDate,
    installmentAmount: 0,
  };

  const {
    totalAmount,
    interestRate,
    interestType,
    startingDate,
    repaymentType,
    firstInstallmentDate,
    installmentFrequency,
    lastInstallmentDate,
    totalInstallments,
  } = loanData;

  const loanAmount = Number(totalAmount);
  const annualInterestRate = Number(interestRate);

  if (!loanAmount || !startingDate) return result;

  if (repaymentType === "one-time") {
    if (!loanData.endDate) return result;

    result.totalPayable = calculateTotalPayable({
      principal: loanAmount,
      rate: annualInterestRate,
      startDate: startingDate,
      endDate: loanData.endDate,
      interestType: interestType as InterestType,
    });

    return result;
  }

  if (!firstInstallmentDate || !installmentFrequency) return result;

  if (config.automaticCalculation === "installments") {
    if (!lastInstallmentDate) return result;

    const count = calculateInstallments({
      startDate: firstInstallmentDate,
      endDate: lastInstallmentDate,
      frequency: installmentFrequency,
    });

    result.totalInstallments = count;

    result.totalPayable = calculateTotalPayable({
      principal: loanAmount,
      rate: annualInterestRate,
      startDate: startingDate,
      endDate: lastInstallmentDate,
      interestType: interestType as InterestType,
    });

    if (result.totalPayable > 0 && (count as number) > 0) {
      result.installmentAmount = calculateInstallmentAmount(
        result.totalPayable,
        count as number,
      );
    }

    return result;
  }

  if (config.automaticCalculation === "last-date") {
    if (!totalInstallments) return result;

    const d = calculateLastInstallmentDate({
      startDate: firstInstallmentDate,
      count: totalInstallments,
      frequency: installmentFrequency,
    });

    const lastDate = d?.toISOString().slice(0, 10);

    result.lastInstallmentDate = lastDate;
    result.totalInstallments = totalInstallments;

    result.totalPayable = calculateTotalPayable({
      principal: loanAmount,
      rate: annualInterestRate,
      startDate: startingDate,
      endDate: lastDate as string,
      interestType: interestType as InterestType,
    });

    if (result.totalPayable > 0 && totalInstallments > 0) {
      result.installmentAmount = calculateInstallmentAmount(
        result.totalPayable,
        totalInstallments,
      );
    }

    return result;
  }

  return result;
}
