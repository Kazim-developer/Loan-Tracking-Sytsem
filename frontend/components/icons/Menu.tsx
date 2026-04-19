"use client";

import { useAuthStore } from "@/stores/auth.store";
import clsx from "clsx";

export default function Menu({
  setShowSidebar,
}: {
  setShowSidebar: (value: boolean) => void;
}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={clsx(
        "w-10 h-10 cursor-pointer",
        !isAuthenticated ? "min-[860px]:hidden" : "min-[760px]:hidden",
      )}
      onClick={() => setShowSidebar(true)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}
