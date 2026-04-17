import clsx from "clsx";

export default function ActiveSubscriptionTag() {
  return (
    <section
      className={clsx(
        "absolute top-6 right-6 flex items-center gap-2",
        "px-3 py-1 rounded-full",
        "bg-green-100 border border-green-300/60 shadow-sm",
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>

      <span className="text-green-700 font-semibold text-sm">Active</span>
    </section>
  );
}
