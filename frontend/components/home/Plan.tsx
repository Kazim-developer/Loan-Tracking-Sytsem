"use client";

import { plans } from "@/utils/subscriptionPlanData";
import CheckIcon from "./icons/CheckIcon";
import clsx from "clsx";
import useAuthStore from "@/stores/auth.store";
import useSubscriptionStore from "@/stores/subscription.store";

export default function Plan({ plan }: { plan: string }) {
  const res = plans.find((p) => p.plan === plan);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const activeSubscriptionPlan = useSubscriptionStore(
    (s) => s.activeSubscriptionPlan,
  );

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
      {plan === "Pro" ? (
        <span className="popular px-[1rem] py-[0.5rem] rounded-[10px] border-2 absolute top-[-1rem] left-1/2 -translate-x-1/2 bg-yellow-300 text-black font-bold">
          Most Popular
        </span>
      ) : null}
      {isAuthenticated && plan === activeSubscriptionPlan && (
        <section
          className={clsx(
            "absolute top-[2rem] right-[2rem] p-2 bg-green-200 rounded-[5px] ",
          )}
        >
          <h1 className="text-green-600 font-[500] text-xl">Active</h1>
        </section>
      )}
      <section>
        <h1 className="text-2xl font-[500]">{res?.plan}</h1>
        <section className="price flex flex-col gap-[1rem] my-[1rem]">
          <section className="flex justify-left items-end gap-[8px]">
            <h1 className="text-4xl font-[500]">${res?.month}</h1>
            <span className="text-xl text-[#555]">/month</span>
          </section>
          <p className="text-[#555]">${res?.day} /day</p>
        </section>
        <p className="text-xl font-[500]">{res?.title}</p>
      </section>
      <section>
        {res?.features?.map((feature, index) => {
          return (
            <section
              key={index}
              className="list flex items-center justify-left gap-[0.5rem]"
            >
              <CheckIcon />
              <span className="text-[#555]">{feature}</span>
            </section>
          );
        })}
      </section>
      {plan === "Free" ? (
        !isAuthenticated && <button className="upgrade-button">Sign Up</button>
      ) : plan === "Pro" ? (
        <button className="upgrade-button">Upgrade</button>
      ) : plan === "Business" ? (
        <button className="upgrade-button">Upgrade</button>
      ) : (
        <button className="upgrade-button">Upgrade</button>
      )}
    </section>
  );
}
