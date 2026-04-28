"use client";

import clsx from "clsx";
import { useSubscriptionStore } from "@/stores/subscription.store";
import cancelSubscription from "@/handlers/cancelSubscription";
import useShowModelStore from "@/stores/showElement.store";
import { useMutation } from "@tanstack/react-query";

export default function CancelSubscriptionModel() {
  const activeSubscriptionPlan = useSubscriptionStore(
    (s) => s.activeSubscriptionPlan,
  );

  const setSubscriptionData = useSubscriptionStore(
    (s) => s.setSubscriptionData,
  );

  const setShowCancelSubscriptionModel = useShowModelStore(
    (s) => s.setShowCancelSubscription,
  );

  const { mutate } = useMutation({
    mutationFn: () => cancelSubscription(),
    onSuccess: () => {
      setSubscriptionData({ pendingCancellationPlan: "" });
    },
  });

  return (
    <div
      className={clsx(
        "w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl",
        "flex flex-col gap-5 border border-gray-200",
      )}
    >
      <div className="space-y-2">
        <h1 className="text-xl font-[500] text-gray-900">
          Cancel your {activeSubscriptionPlan} subscription?
        </h1>

        <p className="text-sm text-gray-500 leading-relaxed">
          Your subscription will remain active until the billing period ends,
          then switch to the Free plan.
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition cursor-pointer"
          onClick={() => setShowCancelSubscriptionModel(false)}
        >
          Keep Plan
        </button>

        <button
          className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition cursor-pointer"
          onClick={() => {
            mutate();
            setSubscriptionData({
              cancellingPlan: activeSubscriptionPlan,
            });
          }}
        >
          Confirm Cancellation
        </button>
      </div>
    </div>
  );
}
