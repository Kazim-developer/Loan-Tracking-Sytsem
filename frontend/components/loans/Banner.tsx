"use client";

import { AlertTriangle, X } from "lucide-react";
import { useRouter } from "next/navigation";

type BannerProps = {
  limitReached: boolean;
  setDismissed: (value: boolean) => void;
};

export default function Banner({ limitReached, setDismissed }: BannerProps) {
  const router = useRouter();
  return (
    <div className="mb-5">
      <div
        className={`
          flex items-start justify-between gap-4
          rounded-2xl border px-5 py-4
          shadow-sm
          ${
            limitReached
              ? "border-red-200 bg-red-50"
              : "border-amber-200 bg-amber-50"
          }
        `}
      >
        <div className="flex items-start gap-3">
          <div
            className={`
              mt-0.5 rounded-full p-2
              ${
                limitReached
                  ? "bg-red-100 text-red-600"
                  : "bg-amber-100 text-amber-600"
              }
            `}
          >
            <AlertTriangle size={18} />
          </div>

          <div>
            <h3
              className={`
                font-semibold
                ${limitReached ? "text-red-800" : "text-amber-800"}
              `}
            >
              {limitReached
                ? "Usage limit reached"
                : "Approaching usage limits"}
            </h3>

            <p
              className={`
                mt-1 text-sm
                ${limitReached ? "text-red-700" : "text-amber-700"}
              `}
            >
              Upgrade your plan to continue using all features.
            </p>

            <button
              className={`
                mt-3 rounded-lg px-4 py-2 text-sm font-medium
                transition-colors
                ${
                  limitReached
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-amber-600 text-white hover:bg-amber-700"
                }
              `}
              onClick={() => router.push("/upgrade")}
            >
              Upgrade Plan
            </button>
          </div>
        </div>

        {!limitReached && (
          <button
            onClick={() => setDismissed(true)}
            className="text-muted-foreground transition hover:text-foreground"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
