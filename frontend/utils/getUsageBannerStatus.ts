import { Usage } from "@/components/dashboard/Usage";

export function getUsageBannerStatus({
  totalLoans,
  activeLoans,
  clients,
}: Usage) {
  const getPercentage = (used: number, limit: number | null) => {
    if (limit === null) return 0;
    return (used / limit) * 100;
  };

  const percentages = [
    getPercentage(totalLoans.used, totalLoans.limit),
    getPercentage(activeLoans.used, activeLoans.limit),
    getPercentage(clients.used, clients.limit),
  ];

  const highest = Math.max(...percentages);

  return {
    show: highest >= 80,
    limitReached: highest >= 100,
  };
}
