import clsx from "clsx";

export default function BackArrow({
  size,
  setShowCreateClientModel,
  setShowCreateLoanModel,
  setShowCreateInvoiceModel,
}: {
  size?: string;
  setShowCreateClientModel?: (value: boolean) => void;
  setShowCreateLoanModel?: (value: boolean) => void;
  setShowCreateInvoiceModel?: (value: boolean) => void;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={clsx(
        !size
          ? `w-10 h-10 min-w-10 min-h-10`
          : `w-${size} h-${size} min-w-${size} min-h-${size}`,
      )}
      onClick={() =>
        setShowCreateClientModel && setShowCreateLoanModel
          ? (setShowCreateClientModel(true), setShowCreateLoanModel(false))
          : setShowCreateClientModel && setShowCreateInvoiceModel
            ? (setShowCreateInvoiceModel(false), setShowCreateClientModel(true))
            : null
      }
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
}
