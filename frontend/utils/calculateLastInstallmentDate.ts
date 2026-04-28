import { InstallmentFrequency } from "@/validators/loanData.validator";
import addMonthsSafely from "./addMonthSafely";

function calculateLastInstallmentDate({
  startDate,
  count,
  frequency,
}: {
  startDate: string;
  count: number;
  frequency: InstallmentFrequency;
}) {
  const start = new Date(startDate);

  if (frequency === "WEEKLY") {
    start.setDate(start.getDate() + (count - 1) * 7);
    return start;
  }

  if (frequency === "MONTHLY") {
    return addMonthsSafely(start, count - 1);
  }
}

export default calculateLastInstallmentDate;
