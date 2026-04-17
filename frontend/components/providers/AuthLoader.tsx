"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useSubscriptionStore } from "@/stores/subscription.store";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "@/utils/checkAuth";
import { useEffect } from "react";
import Loader from "../LoadingSpinner";

export default function AuthLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrated = useAuthStore((s) => s.hydrated);
  const authChecked = useAuthStore((s) => s.authChecked);
  const setAuthUser = useAuthStore((s) => s.setAuthUser);
  const setAuthChecked = useAuthStore((s) => s.setAuthChecked);

  const setSubscriptionData = useSubscriptionStore(
    (s) => s.setSubscriptionData,
  );

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["me"],
    queryFn: checkAuth,
    retry: false,
    enabled: hydrated && !authChecked,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // 🚨 CRITICAL: block UI until Zustand is ready

  useEffect(() => {
    if (!hydrated) return;

    const user = data?.user;

    if (isSuccess && user) {
      setAuthUser({
        userId: user.userId,
        accountId: user.accountId,
        email: user.email,
        imageUrl: user.imageUrl,
        loginMethod: user.loginMethod,
        isGoogleLogin: user.isGoogleLogin,
        isAuthenticated: true,
      });

      setSubscriptionData({
        activeSubscriptionPlan: user.activeSubscriptionPlan ?? "",
        cancellingPlan: user.cancelAt ? user.activeSubscriptionPlan : "",
        cancelAt: user.cancelAt ?? "",
      });

      setAuthChecked(true);
    }

    if (isError) {
      setAuthUser({
        userId: "",
        accountId: "",
        email: "",
        imageUrl: "",
        loginMethod: "",
        isGoogleLogin: false,
        isAuthenticated: false,
      });

      setSubscriptionData({
        activeSubscriptionPlan: "",
        cancellingPlan: "",
        cancelAt: "",
      });

      setAuthChecked(true);
    }
  }, [hydrated, isSuccess, isError, data]);

  if (!hydrated) {
    return <Loader fullScreen />;
  }

  return <>{children}</>;
}
