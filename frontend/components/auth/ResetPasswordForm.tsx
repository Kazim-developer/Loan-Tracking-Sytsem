"use client";

import ShowPasswordCheckbox from "@/components/ShowPasswordCheckbox";
import { postFormData } from "@/utils/postFormData.util";
import { ResetPassword } from "@/validators/resetPassword.validator";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [resetPassword, setResetPassword] = useState<ResetPassword>({
    token,
    newPassword: "",
  });

  const newPasswordRef = useRef(null);

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    newPasswordRef?.current?.focus();
  }, []);

  const { mutate } = useMutation({
    mutationFn: (data: ResetPassword) =>
      postFormData("auth/reset-password", data),
    onSuccess: (data) => {
      toast.success(data.message);
      setTimeout(() => {
        router.replace("/login");
      }, 3000);
    },
    onError: (error) => {
      if (error.errors) {
        Object.values(error.errors).forEach((msg) => {
          toast.error(msg);
        });
      } else {
        toast.error(error.message || "Something went wrong");
      }
    },
  });

  return (
    <section
      className={clsx(
        "reset-password-form border-1 w-[50%] max-w-[400px] min-w-[300px] p-5",
      )}
    >
      <h1 className={clsx("mb-[1.5rem] text-2xl font-md text-center")}>
        Reset Password
      </h1>
      <form
        className={clsx("flex flex-col gap-[1rem]")}
        onSubmit={(e) => {
          e.preventDefault();
          setResetPassword({
            ...resetPassword,
            newPassword: newPasswordRef?.current?.value,
          });
          mutate(resetPassword);
        }}
      >
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter new password"
          className={clsx(
            "p-2 focus:outline-none border-1 border-[#ccc] w-[100%]",
          )}
          ref={newPasswordRef}
          required
        />
        <ShowPasswordCheckbox
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <button
          type="submit"
          className={clsx("bg-black text-white p-3 text-bold cursor-pointer")}
        >
          Update Password
        </button>
      </form>
      <p className={clsx("mt-[1.5rem]")}>
        Link invalid or expired?{" "}
        <Link href="/forgot-password" className={clsx("text-blue-800")}>
          Get again
        </Link>
      </p>
    </section>
  );
}
