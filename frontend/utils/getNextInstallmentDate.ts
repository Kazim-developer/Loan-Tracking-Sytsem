import { InstallmentFrequency } from "@/validators/loanData.validator";

function getNextInstallmentDate(
  date: string,
  frequency: InstallmentFrequency,
  step = 1,
) {
  const d = new Date(date);

  if (frequency === "WEEKLY") {
    d.setDate(d.getDate() + 7 * step);
  }

  if (frequency === "MONTHLY") {
    d.setMonth(d.getMonth() + step);
  }

  return d;
}

export default getNextInstallmentDate;
