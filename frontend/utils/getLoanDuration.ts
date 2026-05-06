export function getLoanDuration(
  startDate: Date | string,
  endDate: Date | string,
) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "-";
  }

  // total months difference
  const yearsDiff = end.getFullYear() - start.getFullYear();
  const monthsDiff = end.getMonth() - start.getMonth();

  const totalMonths = yearsDiff * 12 + monthsDiff;

  if (totalMonths <= 0) return "-";

  // If less than 12 months → show months
  if (totalMonths < 12) {
    return `${totalMonths} month${totalMonths > 1 ? "s" : ""}`;
  }

  // If 12+ → show years (rounded down)
  const years = Math.floor(totalMonths / 12);

  return `${years} year${years > 1 ? "s" : ""}`;
}
