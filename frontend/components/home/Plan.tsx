"use client";

import { plans } from "@/utils/subscriptionPlanData";
import CheckIcon from "./icons/CheckIcon";
import clsx from "clsx";
import useAuthStore from "@/stores/auth.store";
import useSubscriptionStore from "@/stores/subscription.store";
import ActiveSubscriptionTag from "../ActiveSubscriptionTag";
import MostPopularPlan from "../MostPopularPlan";
import { openCheckout } from "@/lib/openCheckout";
import { PRICES } from "@/config/pricing";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "@/utils/checkAuth";
import { useEffect } from "react";

export default function Plan({
  plan,
}: {
  plan: string;
  priceId: string;
  email: string;
}) {
  const res = plans.find((p) => p.plan === plan);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const activeSubscriptionPlan = useSubscriptionStore(
    (s) => s.activeSubscriptionPlan,
  );

  const setSubscriptionPlan = useSubscriptionStore(
    (s) => s.setSubscriptionPlan,
  );

  const expectedPlan = useSubscriptionStore((s) => s.pendingSubscriptionPlan);
  const setExpectedPlan = useSubscriptionStore((s) => s.setPendingPlan);

  const isPolling = useSubscriptionStore((s) => s.isPolling);
  const setIsPolling = useSubscriptionStore((s) => s.setIsPolling);

  const email = useAuthStore((s) => s.email);
  const accountId = useAuthStore((s) => s.accountId);

  const { data } = useQuery({
    queryKey: ["current-subscription-plan"],
    queryFn: checkAuth,
    refetchInterval: isPolling ? 2000 : false,
  });

  useEffect(() => {
    if (
      isPolling &&
      expectedPlan &&
      data?.subscription?.plan === expectedPlan
    ) {
      setIsPolling(false);
      setExpectedPlan("");
      setSubscriptionPlan(data?.activeSubscriptionPlan);
    }
  }, [data, isPolling, expectedPlan]);

  return (
    <section
      className={clsx(
        `${plan}`,
        "relative p-[2rem] border-1 rounded-[20px] flex flex-col gap-[2rem]",
        plan === "Free"
          ? "border-gray-300"
          : plan === "Pro"
            ? "border-black shadow-2xl"
            : plan === "Business"
              ? "border-gray-500"
              : plan === "Enterprise"
                ? "border-2 border-black"
                : null,
      )}
    >
      {plan === "Pro" ? <MostPopularPlan /> : null}
      {isAuthenticated && plan === activeSubscriptionPlan && (
        <ActiveSubscriptionTag />
      )}
      <section>
        <h1 className="text-2xl font-[500]">{res?.plan}</h1>
        <section className="price flex flex-col gap-[1rem] my-[1rem]">
          <section className="flex justify-left items-end gap-[8px]">
            <h1 className="text-4xl font-[500]">${res?.month}</h1>
            <span className="text-xl text-[#555]">/month</span>
          </section>
        </section>
        <p className="text-xl font-[500]">{res?.title}</p>
      </section>
      <section>
        {res?.features?.map((feature, index) => {
          return (
            <section
              key={index}
              className="list flex items-center justify-left gap-[0.85rem]"
            >
              <CheckIcon />
              <span className="text-[#555] text-md">{feature}</span>
            </section>
          );
        })}
      </section>
      {plan === "Free" ? (
        !isAuthenticated && <button className="upgrade-button">Sign Up</button>
      ) : plan === "Pro" && activeSubscriptionPlan !== "Pro" ? (
        <button
          className="upgrade-button"
          onClick={() =>
            openCheckout(
              PRICES.PRO_MONTHLY,
              email,
              accountId,
              false,
              undefined,
              undefined,
              () => setIsPolling(true),
            )
          }
        >
          Upgrade to Pro
        </button>
      ) : plan === "Business" && activeSubscriptionPlan !== "Business" ? (
        <button
          className="upgrade-button"
          onClick={() =>
            openCheckout(
              PRICES.BUSINESS_MONTHLY,
              email,
              accountId,
              false,
              undefined,
              undefined,
              () => setIsPolling(true),
            )
          }
        >
          Upgrade to Business
        </button>
      ) : null}
    </section>
  );
}
