"use client";

import { useSubscriptionStore } from "@/stores/subscription.store";
import { toast } from "react-toastify";

import Script from "next/script";

export default function PaddleScriptTag() {
  const setSubscriptionData = useSubscriptionStore(
    (s) => s.setSubscriptionData,
  );

  const upgradingPlan = useSubscriptionStore((s) => s.upgradingPlan);

  return (
    <Script
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      strategy="afterInteractive"
      onLoad={() => {
        const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

        window.Paddle.Environment.set("sandbox");

        window.Paddle.Initialize({
          token,

          eventCallback: (event) => {
            if (event.name === "checkout.completed") {
              setSubscriptionData({ pendingSubscriptionPlan: upgradingPlan });
              toast.info("Payment completed. Activating your plan...");
            }

            if (event.name === "checkout.payment.failed") {
              console.log("Payment failed");
              toast.error("an error occurred, please try later");
            }
          },
        });
      }}
    />
  );
}
