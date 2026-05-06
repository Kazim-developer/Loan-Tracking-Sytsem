export default function Usage({ data }) {
  const totalLimit = data.totalLoanLimit;
  const activeLimit = data.activeLoanLimit;
  const clientLimit = data.clientLimit;

  const totalPercent = (data.usedTotalLoans / totalLimit) * 100;
  const activePercent = (data.usedActiveLoans / activeLimit) * 100;
  const clientPercent = (data.usedClients / clientLimit) * 100;

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">Usage</h2>

      {/* Clients */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Clients</span>
          <span>
            {data.usedClients} / {clientLimit}
          </span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 transition-all"
            style={{ width: `${clientPercent}%` }}
          />
        </div>
      </div>

      {/* Total Loans */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total Loans</span>
          <span>
            {data.usedTotalLoans} / {totalLimit}
          </span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${totalPercent}%` }}
          />
        </div>
      </div>

      {/* Active Loans */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Active Loans</span>
          <span>
            {data.usedActiveLoans} / {activeLimit}
          </span>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all"
            style={{ width: `${activePercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
