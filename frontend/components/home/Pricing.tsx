"use client";

import Plan from "./Plan";
import ShowCancelSubscriptionContainer from "../CancelSubscriptionModelContainer";
import useShowModelStore from "@/stores/showElement.store";
import { useQuery } from "@tanstack/react-query";
import { checkSubscriptionDetail } from "@/handlers/checkSubscriptionDetail";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";

export default function Pricing() {
  const showCancelSubscriptionModel = useShowModelStore(
    (s) => s.showCancelSubscription,
  );

  const setAuthUser = useAuthStore((s) => s.setAuthUser);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { data, isLoading } = useQuery({
    queryKey: ["subscription"],
    queryFn: checkSubscriptionDetail,
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: false,
  });

  useEffect(() => {
    if (!data?.subscription?.activeSubscriptionPlan) return;

    setAuthUser({
      subscriptionPlan: data.subscription.activeSubscriptionPlan,
    });
  }, [data?.subscription?.activeSubscriptionPlan, setAuthUser]);

  if (isLoading) return <h1>Loading ...</h1>;

  return (
    <section id="pricing" className="center-section py-[3rem]">
      <section>
        <section className="mb-[2rem]">
          <section className="text-content ">
            <h1 className="text-4xl font-[500] text-center mb-[1rem]">
              Simple, Transparent Pricing
            </h1>
            <p className="text-center text-2xl text-[#555]">
              Choose the plan that fits your needs — no surprise price
              increases.
            </p>
          </section>
          <section className="plans grid grid-cols-3 mt-[3rem] max-[900px]:grid-cols-2 max-[900px]:gap-[1rem] max-[650px]:grid-cols-1">
            {isAuthenticated ? (
              <>
                <Plan
                  plan="Free"
                  activeSubscriptionPlan={
                    data.subscription.activeSubscriptionPlan
                  }
                  cancelAt={data.subscription.cancelAt}
                  autoRenew={data.subscription.autoRenew}
                />
                <Plan
                  plan="Pro"
                  activeSubscriptionPlan={
                    data.subscription.activeSubscriptionPlan
                  }
                  cancelAt={data.subscription.cancelAt}
                  autoRenew={data.subscription.autoRenew}
                />
                <Plan
                  plan="Business"
                  activeSubscriptionPlan={
                    data.subscription.activeSubscriptionPlan
                  }
                  cancelAt={data.subscription.cancelAt}
                  autoRenew={data.subscription.autoRenew}
                />
              </>
            ) : (
              <>
                <Plan plan="Free" />
                <Plan plan="Pro" />
                <Plan plan="Business" />
              </>
            )}
          </section>
        </section>
      </section>
      {showCancelSubscriptionModel && <ShowCancelSubscriptionContainer />}
    </section>
  );
}
