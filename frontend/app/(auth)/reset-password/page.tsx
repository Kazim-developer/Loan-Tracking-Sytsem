"use client";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParam = useSearchParams();
  const token = searchParam.get("token");

  return (
    <section
      className={clsx(
        "reset-password-page h-[100vh] w-[100%] flex justify-center items-center",
      )}
    >
      <ResetPasswordForm token={token} />
    </section>
  );
}
