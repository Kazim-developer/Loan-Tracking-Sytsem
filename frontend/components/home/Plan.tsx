"use client";

import { plans } from "@/utils/subscriptionPlanData";
import CheckIcon from "../icons/CheckIcon";
import clsx from "clsx";
import { useAuthStore } from "@/stores/auth.store";
import ActiveSubscriptionTag from "../ActiveSubscriptionTag";
import MostPopularPlan from "../MostPopularPlan";
import { openCheckout } from "@/services/payment/openCheckout";
import { PRICES } from "@/config/pricing";
import useShowModelStore from "@/stores/showElement.store";
import CancelledPlanMessage from "../CancelledPlanMessage";
import { useRouter } from "next/navigation";

import { toTitleCase } from "@/utils/toTitleCase";
import { prepareUpgrade } from "@/utils/prepareUpgrade";

type Plan = {
  plan: string;
  activeSubscriptionPlan?: string;
  cancelAt?: string;
  autoRenew?: boolean;
};

export default function Plan({
  plan,
  activeSubscriptionPlan,
  cancelAt,
  autoRenew,
}: Plan) {
  const res = plans.find((p) => p.plan === plan);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const email = useAuthStore((s) => s.email);
  const accountId = useAuthStore((s) => s.accountId);

  const setShowCancelSubscriptionModel = useShowModelStore(
    (s) => s.setShowCancelSubscription,
  );

  const router = useRouter();

  return (
    <section
      className={clsx(
        `${plan}`,
        "relative p-[2rem] border-1 rounded-[20px] flex flex-col gap-[2rem]",
        plan === "Pro" ? "border-black" : "border-gray-300",
      )}
    >
      {plan === "Pro" ? <MostPopularPlan /> : null}
      {isAuthenticated && plan === activeSubscriptionPlan && (
        <ActiveSubscriptionTag />
      )}
      <section>
        <h1 className="text-2xl font-[500]">{res?.plan.toUpperCase()}</h1>
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
      {!isAuthenticated && (
        <button
          className="signup-button"
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </button>
      )}
      {isAuthenticated && plan !== activeSubscriptionPlan && plan !== "Free" ? (
        <button
          className="upgrade-button"
          onClick={async () => {
            await prepareUpgrade();
            openCheckout(
              PRICES[`${plan.toUpperCase()}_MONTHLY` as keyof typeof PRICES],
              email,
              accountId,
              false,
            );
          }}
        >
          Upgrade to {toTitleCase(plan)}
        </button>
      ) : (
        isAuthenticated &&
        !cancelAt &&
        autoRenew &&
        plan !== "Free" && (
          <button
            className="cancel-subscription"
            onClick={() => {
              setShowCancelSubscriptionModel(true);
            }}
          >
            Cancel Subscription
          </button>
        )
      )}

      {isAuthenticated &&
        plan === activeSubscriptionPlan &&
        cancelAt &&
        !autoRenew && (
          <CancelledPlanMessage
            cancellingPlan={activeSubscriptionPlan}
            cancelAt={cancelAt}
          />
        )}
    </section>
  );
}
