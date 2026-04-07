"use client";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");

  return <ResetPasswordForm token={token} />;
}
