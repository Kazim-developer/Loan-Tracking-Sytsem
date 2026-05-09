"use client";

import { prepareUpgrade } from "@/utils/prepareUpgrade";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export default function CancelledPlanMessage({
  cancellingPlan,
  cancelAt,
}: {
  cancellingPlan: string;
  cancelAt: string;
}) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: prepareUpgrade,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["subscription"],
      });
    },
  });

  return (
    <div className="px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm">
      <span className="inline-block mb-2 px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
        Scheduled for cancellation
      </span>

      <p className="text-sm text-gray-700">
        {cancellingPlan.toUpperCase()} plan will end on{" "}
        <span className="font-semibold text-gray-900">{cancelAt}</span> and
        switch to Free.
      </p>
      <button className="text-blue-600 mt-2" onClick={() => mutateAsync()}>
        Undo cancellation
      </button>
    </div>
  );
}
