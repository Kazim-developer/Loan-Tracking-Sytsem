import clsx from "clsx";
export default function Close({
  size,
  setShowSidebar,
  setShowCreateClientModel,
  setShowCreateLoanModel,
}: {
  size?: string;
  setShowSidebar?: (value: boolean) => void;
  setShowCreateClientModel?: (value: boolean) => void;
  setShowCreateLoanModel?: (value: boolean) => void;
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
        setShowSidebar
          ? setShowSidebar(false)
          : setShowCreateClientModel
            ? setShowCreateClientModel(false)
            : setShowCreateLoanModel
              ? setShowCreateLoanModel(false)
              : null
      }
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}
