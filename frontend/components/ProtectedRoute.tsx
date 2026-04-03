"use client";

import useAuthStore from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const authChecked = useAuthStore((s) => s.authChecked);

  const router = useRouter();

  useEffect(() => {
    if (authChecked && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [authChecked, isAuthenticated, router]);

  if (!authChecked) return null;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
