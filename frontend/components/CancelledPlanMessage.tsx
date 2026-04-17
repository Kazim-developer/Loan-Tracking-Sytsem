export default function CancelledPlanMessage({
  cancellingPlan,
  cancelAt,
}: {
  cancellingPlan: string;
  cancelAt: string;
}) {
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
    </div>
  );
}
