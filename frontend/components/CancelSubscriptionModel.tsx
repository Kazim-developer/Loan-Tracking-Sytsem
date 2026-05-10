"use client";

import clsx from "clsx";
import cancelSubscription from "@/handlers/cancelSubscription";
import useShowModelStore from "@/stores/showElement.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "react-toastify";

export default function CancelSubscriptionModel() {
  const setShowCancelSubscriptionModel = useShowModelStore(
    (s) => s.setShowCancelSubscription,
  );

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: cancelSubscription,
    onSuccess: async () => {
      //* dont remove them, both are necessary
      await queryClient.invalidateQueries({ queryKey: ["subscription"] });
      await queryClient.invalidateQueries({ queryKey: ["subscription"] });

      await queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });

  const subscriptionPlan = useAuthStore((s) => s.subscriptionPlan);

  return (
    <div
      className={clsx(
        "w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl",
        "flex flex-col gap-5 border border-gray-200",
      )}
    >
      <div className="space-y-2">
        <h1 className="text-xl font-[500] text-gray-900">
          Cancel your {subscriptionPlan} subscription plan?
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
            toast.info("please wait, we are processing your request");
            mutate();
          }}
        >
          Confirm Cancellation
        </button>
      </div>
    </div>
  );
}
