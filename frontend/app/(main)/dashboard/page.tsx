"use client";

import StatisticsGrid from "@/components/dashboard/StatisticsGrid";
import Usage from "@/components/dashboard/Usage";
import ProtectedRoute from "@/components/providers/ProtectedRoute";
import { getStats } from "@/utils/getStats";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    retry: 1,
  });

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <section className="center-section my-[3rem] flex flex-col gap-[2rem]">
        <div>
          <h1 className="text-3xl font-[500] tracking-tight">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Overview of your loans and performance
          </p>
        </div>

        <StatisticsGrid data={data.stats} />

        <Usage data={data.usage} />
      </section>
    </ProtectedRoute>
  );
}
