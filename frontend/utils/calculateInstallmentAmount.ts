function calculateInstallmentAmount(totalPayable: number, count: number) {
  const base = totalPayable / count;

  return Number(base.toFixed(2));
}

export default calculateInstallmentAmount;
