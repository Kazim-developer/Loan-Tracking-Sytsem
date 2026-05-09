"use client";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");

  if (!token) return null;

  return <ResetPasswordForm token={token} />;
}
