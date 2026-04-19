import clsx from "clsx";

export default function DownArrow({ size }: { size?: string }) {
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
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
