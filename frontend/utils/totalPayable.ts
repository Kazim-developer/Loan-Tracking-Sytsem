import { InterestType } from "@/validators/loanData.validator";

function calculateTotalPayable({
  principal,
  rate,
  startDate,
  endDate,
  interestType,
}: {
  principal: number;
  rate: number;
  startDate: string;
  endDate: string;
  interestType: InterestType;
}) {
  if (!rate) return principal;

  const timeInYears =
    (new Date(endDate).getTime() - new Date(startDate).getTime()) /
    (1000 * 60 * 60 * 24 * 365);

  if (interestType === "SIMPLE") {
    return principal + principal * (rate / 100) * timeInYears;
  }

  // simple compound (yearly)
  return principal * Math.pow(1 + rate / 100, timeInYears);
}

export default calculateTotalPayable;
