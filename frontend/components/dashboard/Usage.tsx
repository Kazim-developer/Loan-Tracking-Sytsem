import { useAuthStore } from "@/stores/auth.store";

type UsageDetail = {
  used: number;
  limit: number;
};

export type Usage = {
  totalLoans: UsageDetail;
  activeLoans: UsageDetail;
  clients: UsageDetail;
};

export default function Usage({ data }: { data: Usage }) {
  const totalLimit = data.totalLoans.limit;
  const activeLimit = data.activeLoans.limit;
  const clientLimit = data.clients.limit;

  const totalPercent = (data.totalLoans.used / totalLimit) * 100;
  const activePercent = (data.activeLoans.used / activeLimit) * 100;
  const clientPercent = (data.clients.used / clientLimit) * 100;

  const subscriptionPlan = useAuthStore((s) => s.subscriptionPlan);

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">Usage</h2>

      {/* Clients */}
      {subscriptionPlan !== "Business" && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Clients</span>
            <span>
              {data.clients.used} / {clientLimit}
            </span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 transition-all"
              style={{ width: `${clientPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Total Loans */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total Loans</span>
          <span>
            {data.totalLoans.used} / {totalLimit}
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
            {data.activeLoans.used} / {activeLimit}
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
