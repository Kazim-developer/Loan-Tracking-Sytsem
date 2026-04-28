import { Installment } from "@/validators/installment.validator";
import getNextLoanInstallmentDate from "./getNextInstallmentDate";
import { InstallmentFrequency } from "@/validators/loanData.validator";

type GenerateInstallmentScheduleParams = {
  totalPayable: number;
  totalInstallments: number;
  firstInstallmentDate: string;
  frequency: InstallmentFrequency;
};

function round2(num: number) {
  return Math.round(num * 100) / 100;
}

function generateInstallmentSchedule({
  totalPayable,
  totalInstallments,
  firstInstallmentDate,
  frequency,
}: GenerateInstallmentScheduleParams): Installment[] {
  // ✅ 1. Validation
  if (!totalInstallments || totalInstallments <= 0) {
    throw new Error("Invalid totalInstallments");
  }

  if (!totalPayable || totalPayable <= 0) {
    throw new Error("Invalid totalPayable");
  }

  if (!firstInstallmentDate) {
    throw new Error("Missing firstInstallmentDate");
  }

  const installments: Installment[] = [];

  // ✅ 2. Base amount (rounded)
  const baseAmount = round2(totalPayable / totalInstallments);

  let assignedTotal = 0;

  for (let i = 0; i < totalInstallments; i++) {
    const dueDate = getNextLoanInstallmentDate(
      firstInstallmentDate,
      frequency,
      i,
    );

    const dueDateFormat = new Date(dueDate).toISOString();

    let amount = baseAmount;

    // ✅ 3. Fix rounding drift on last installment
    if (i === totalInstallments - 1) {
      amount = round2(totalPayable - assignedTotal);
    }

    assignedTotal = round2(assignedTotal + amount);

    installments.push({
      dueDate: dueDateFormat,
      amount,
      status: "PENDING",
    });
  }

  return installments;
}

export default generateInstallmentSchedule;
