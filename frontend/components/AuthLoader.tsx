"use client";

import useAuthStore from "@/stores/auth.store";
import { checkAuth } from "@/utils/checkAuth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function AuthLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isError, isSuccess } = useQuery({
    queryKey: ["checking-auth"],
    queryFn: checkAuth,
    retry: false,
  });

  const {
    setEmail,
    setLoginMethod,
    setIsAuthenticated,
    setImageUrl,
    setAuthChecked,
    setIsGoogleLogin,
  } = useAuthStore();

  useEffect(() => {
    if (isSuccess && data?.user) {
      setEmail(data.user.email);
      setImageUrl(data.user.imageUrl);
      setIsGoogleLogin(data.user.isGoogleLogin);
      setLoginMethod(data.user.loginMethod);

      setIsAuthenticated(data.user.isAuthenticated);
      setAuthChecked(true);
    }

    if (isError) {
      setIsAuthenticated(false);
      setAuthChecked(true);
    }
  }, [isSuccess, isError, data]);

  return <>{children}</>;
}
