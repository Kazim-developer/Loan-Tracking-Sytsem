import { InstallmentFrequency } from "@/validators/loanData.validator";
import calculateMonthlyInstallments from "./calculateMonthlyInstallments";

function calculateInstallments({
  startDate,
  endDate,
  frequency,
}: {
  startDate: string;
  endDate: string;
  frequency: InstallmentFrequency;
}) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (frequency === "WEEKLY") {
    return Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7)),
    );
  }

  if (frequency === "MONTHLY") {
    return calculateMonthlyInstallments(start, end);
  }
}

export default calculateInstallments;
