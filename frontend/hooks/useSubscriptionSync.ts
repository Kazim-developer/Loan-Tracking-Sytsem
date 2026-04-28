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

  const cancellingPlan = useSubscriptionStore((s) => s.cancellingPlan);

  const pendingCancellationPlan = useSubscriptionStore(
    (s) => s.pendingCancellationPlan,
  );

  const shouldSync = !!pendingSubscriptionPlan || !!pendingCancellationPlan;

  const query = useQuery({
    queryKey: ["me"],
    queryFn: checkAuth,
    refetchInterval: shouldSync ? 2000 : false,
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
      });
    }

    // cancel completed
    if (cancellingPlan && user.cancelAt !== null) {
      setSubscriptionData({
        cancellingPlan: "",
      });
    }
  }, [query.data]);

  return query;
}
