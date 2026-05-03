import clsx from "clsx";

export type Status =
  | "ACTIVE"
  | "OVERDUE"
  | "CLOSED"
  | "PENDING"
  | "DUE"
  | "PAID"
  | "PARTIAL";
type Size = "sm" | "md" | "lg";

type Props = {
  status: Status;
  size?: Size;
};

export const StatusBadge = ({ status, size = "sm" }: Props) => {
  const base = "rounded-full font-medium inline-block";

  const sizeStyles: Record<Size, string> = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const statusStyles: Record<
    Status,
    { bg: string; text: string; label: string }
  > = {
    ACTIVE: {
      bg: "bg-green-100",
      text: "text-green-700",
      label: "Active",
    },
    OVERDUE: {
      bg: "bg-red-100",
      text: "text-red-700",
      label: "Overdue",
    },
    CLOSED: {
      bg: "bg-gray-200",
      text: "text-gray-700",
      label: "Closed",
    },
    PENDING: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      label: "Pending",
    },
    DUE: {
      bg: "bg-orange-100",
      text: "text-orange-700",
      label: "Due",
    },
    PAID: {
      bg: "bg-green-200",
      text: "text-green-800",
      label: "Paid",
    },
    PARTIAL: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      label: "Partial",
    },
  };

  const current = statusStyles[status] || statusStyles.CLOSED;

  return (
    <span className={clsx(base, sizeStyles[size], current.bg, current.text)}>
      {current.label}
    </span>
  );
};
