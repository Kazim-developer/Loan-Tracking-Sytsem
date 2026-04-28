function calculateMonthlyInstallments(start: any, end: any) {
  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (end.getDate() >= start.getDate()) {
    months += 1;
  }

  return Math.max(1, months);
}

export default calculateMonthlyInstallments;
