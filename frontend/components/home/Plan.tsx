"use client";

import { plans } from "@/utils/subscriptionPlanData";
import CheckIcon from "../icons/CheckIcon";
import clsx from "clsx";
import { useAuthStore } from "@/stores/auth.store";
import { useSubscriptionStore } from "@/stores/subscription.store";
import ActiveSubscriptionTag from "../ActiveSubscriptionTag";
import MostPopularPlan from "../MostPopularPlan";
import { openCheckout } from "@/services/payment/openCheckout";
import { PRICES } from "@/config/pricing";
import useShowModelStore from "@/stores/showElement.store";
import CancelledPlanMessage from "../CancelledPlanMessage";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Plan({ plan }: { plan: string }) {
  const res = plans.find((p) => p.plan === plan);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const activeSubscriptionPlan = useSubscriptionStore(
    (s) => s.activeSubscriptionPlan,
  );

  const setSubscriptionData = useSubscriptionStore(
    (s) => s.setSubscriptionData,
  );

  const cancelAt = useSubscriptionStore((s) => s.cancelAt);
  const cancellingPlan = useSubscriptionStore((s) => s.cancellingPlan);
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
        plan === "Free"
          ? "border-gray-300"
          : plan === "Pro"
            ? "border-black"
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
      {plan === "Free" ? (
        !isAuthenticated && (
          <button
            className="upgrade-button"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </button>
        )
      ) : plan === "Pro" && activeSubscriptionPlan !== "Pro" ? (
        <button
          className="upgrade-button"
          onClick={() => {
            if (cancelAt && cancellingPlan) {
              return toast.warning(
                `Your cancellation of ${cancellingPlan} plan is due on ${cancelAt}, upgrade after that`,
              );
            }
            setSubscriptionData({ pendingSubscriptionPlan: "Pro" });
            openCheckout(PRICES.PRO_MONTHLY, email, accountId, false);
          }}
        >
          Upgrade to Pro
        </button>
      ) : plan === "Business" && activeSubscriptionPlan !== "Business" ? (
        <button
          className="upgrade-button"
          onClick={() => {
            if (cancelAt && cancellingPlan) {
              return toast.warning(
                `Your cancellation of ${cancellingPlan} plan is due on ${cancelAt}, upgrade after that`,
              );
            }
            setSubscriptionData({ pendingSubscriptionPlan: "Business" });
            openCheckout(PRICES.BUSINESS_MONTHLY, email, accountId, false);
          }}
        >
          Upgrade to Business
        </button>
      ) : plan === "Pro" && activeSubscriptionPlan === "Pro" && !cancelAt ? (
        <button
          className="cancel-subscription"
          onClick={() => {
            setShowCancelSubscriptionModel(true);
            setSubscriptionData({ pendingCancellationPlan: "Pro" });
          }}
        >
          Cancel Subscription
        </button>
      ) : plan === "Business" &&
        activeSubscriptionPlan === "Business" &&
        !cancelAt ? (
        <button
          className="cancel-subscription"
          onClick={() => {
            setShowCancelSubscriptionModel(true);
            setSubscriptionData({ pendingCancellationPlan: "Business" });
          }}
        >
          Cancel Subscription
        </button>
      ) : null}
      {cancelAt &&
      plan === "Pro" &&
      activeSubscriptionPlan === "Pro" &&
      cancellingPlan === "Pro" ? (
        <CancelledPlanMessage
          cancellingPlan={cancellingPlan}
          cancelAt={cancelAt}
        />
      ) : cancelAt &&
        plan === "Business" &&
        activeSubscriptionPlan === "Business" &&
        cancellingPlan === "Business" ? (
        <CancelledPlanMessage
          cancellingPlan={cancellingPlan}
          cancelAt={cancelAt}
        />
      ) : null}
    </section>
  );
}
