import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "@/handlers/checkAuth";
import { useSubscriptionStore } from "@/stores/subscription.store";

export function useSubscriptionSync() {
  const setSubscriptionData = useSubscriptionStore(
    (s) => s.setSubscriptionData,
  );

  const pendingSubscriptionPlan = useSubscriptionStore(
    (s) => s.pendingSubscriptionPlan,
  );

  const isCancellatingPlan = useSubscriptionStore((s) => s.isCancellatingPlan);

  const shouldSync = !!pendingSubscriptionPlan || isCancellatingPlan;

  const query = useQuery({
    queryKey: ["polling"],
    queryFn: checkAuth,
    refetchInterval: (data) => {
      if (!shouldSync) return false;

      const user = data?.user;

      // stop when upgrade done
      if (
        pendingSubscriptionPlan &&
        user?.activeSubscriptionPlan === pendingSubscriptionPlan
      ) {
        return false;
      }

      // stop when cancel done
      if (isCancellatingPlan && user?.cancelAt !== null) {
        return false;
      }

      return 2000;
    },
    retry: false,
  });

  useEffect(() => {
    const user = query.data?.user;
    if (!user) return;

    setSubscriptionData({
      activeSubscriptionPlan: user.activeSubscriptionPlan,
      cancelAt: user.cancelAt,
    });

    // upgrade completed
    if (
      pendingSubscriptionPlan &&
      user.activeSubscriptionPlan === pendingSubscriptionPlan
    ) {
      setSubscriptionData({
        pendingSubscriptionPlan: "",
        upgradingPlan: "",
      });
    }

    // cancel completed
    if (isCancellatingPlan && user.cancelAt !== null) {
      setSubscriptionData({
        isCancellatingPlan: false,
      });
    }
  }, [query.data, isCancellatingPlan, pendingSubscriptionPlan]);

  return query;
}
