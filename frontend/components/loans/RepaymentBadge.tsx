export const RepaymentBadge = ({ type }: { type: string }) => {
  const base = "px-2 py-1 rounded-full text-xs font-medium";

  if (type === "INSTALLMENTS") {
    return (
      <span className={`${base} bg-blue-100 text-blue-700`}>Installments</span>
    );
  }

  return (
    <span className={`${base} bg-purple-100 text-purple-700`}>One-time</span>
  );
};
