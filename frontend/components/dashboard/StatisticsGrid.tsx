import Stat from "./Stat";

export default function StatisticsGrid({ data }) {
  const profitPercentage =
    data.totalLoanAmount > 0
      ? ((data.totalPayableAmount - data.totalLoanAmount) * 100) /
        data.totalLoanAmount
      : 0;

  const totalRemaining = data.totalPayableAmount - data.totalPaidAmount;

  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <Stat label="Total Loan" value={data.totalLoanAmount} variant="neutral" />
      <Stat
        label="Total Payable"
        value={data.totalPayableAmount}
        variant="info"
      />
      <Stat
        label="Paid Amount"
        value={data.totalPaidAmount}
        variant="success"
      />
      <Stat
        label="Overdue Amount"
        value={data.totalOverdueAmount}
        variant="danger"
      />
      <Stat
        label="Expected Profit %"
        value={profitPercentage}
        isPercentage
        variant={profitPercentage > 0 ? "success" : "danger"}
      />
      <Stat
        label="Remaining Amount"
        value={totalRemaining}
        variant="warning"
      />{" "}
    </section>
  );
}
