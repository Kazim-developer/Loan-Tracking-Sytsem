import { formatCurrency } from "@/utils/formatCurrency";
import clsx from "clsx";
import { DollarSign, AlertTriangle, Clock, TrendingUp } from "lucide-react";

type Variant = "neutral" | "success" | "warning" | "danger" | "info";

const variantStyles = {
  neutral: {
    bg: "bg-gray-50",
    text: "text-gray-800",
    icon: "text-gray-500",
  },
  success: {
    bg: "bg-green-50",
    text: "text-green-700",
    icon: "text-green-600",
  },
  warning: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    icon: "text-yellow-600",
  },
  danger: {
    bg: "bg-red-50",
    text: "text-red-700",
    icon: "text-red-600",
  },
  info: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    icon: "text-blue-600",
  },
};

const iconMap = {
  neutral: DollarSign,
  success: TrendingUp,
  warning: Clock,
  danger: AlertTriangle,
  info: DollarSign,
};

export default function Stat({
  label,
  value,
  isPercentage,
  variant = "neutral",
}: {
  label: string;
  value: number;
  isPercentage?: boolean;
  variant?: Variant;
}) {
  const styles = variantStyles[variant];
  const Icon = iconMap[variant];

  return (
    <div
      className={`rounded-2xl p-5 transition-all hover:shadow-md ${styles.bg} w-full min-w-0`}
    >
      <div className="flex items-center justify-between">
        <span className={clsx("text-sm", `${styles.text}`)}>{label}</span>

        <Icon className={`w-5 h-5 ${styles.icon}`} />
      </div>

      <h1 className={`text-2xl font-[500] mt-3 ${styles.text} truncate`}>
        {isPercentage ? `${value.toFixed(1)}%` : formatCurrency(value)}
      </h1>
    </div>
  );
}
