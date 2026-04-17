"use client";

import Plan from "./Plan";
import ShowCancelSubscriptionContainer from "../CancelSubscriptionModelContainer";
import useShowModelStore from "@/stores/showElement.store";

export default function Pricing() {
  const showCancelSubscriptionModel = useShowModelStore(
    (s) => s.showCancelSubscription,
  );

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
          <section className="plans grid grid-cols-2 gap-[2rem] mt-[3rem] max-[740px]:grid-cols-1">
            <Plan plan="Free" />
            <Plan plan="Pro" />
            <Plan plan="Business" />
          </section>
        </section>
      </section>
      {showCancelSubscriptionModel && <ShowCancelSubscriptionContainer />}
    </section>
  );
}
