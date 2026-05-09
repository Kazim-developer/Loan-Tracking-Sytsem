"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "@/handlers/checkAuth";
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

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["me"],
    queryFn: checkAuth,
    retry: false,
    enabled: hydrated && !authChecked,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

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
        authChecked: true,
        subscriptionPlan: user.subscriptionPlan,
      });
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
        authChecked: true,
        subscriptionPlan: "",
      });
    }
  }, [hydrated, isSuccess, isError, data]);

  if (!hydrated || !authChecked) {
    return <Loader fullScreen />;
  }

  return <>{children}</>;
}
