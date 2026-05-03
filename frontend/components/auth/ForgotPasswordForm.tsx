"use client";

import { postFormData } from "@/handlers/postFormData";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { ForgotPassword } from "@/validators/forgotPassword.validator";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (data: ForgotPassword) =>
      postFormData("auth/forgot-password", data),
    onSuccess: (data) => {
      toast.success(data.message);
      setTimeout(() => {
        router.replace("/login");
      }, 3000);
    },
    onError: (error) => {
      if (error.errors) {
        Object.values(error.errors).forEach((msg) => {
          toast.error(String(msg));
        });
      } else {
        toast.error(error.message || "Something went wrong");
      }
    },
  });

  return (
    <section
      className={clsx(
        "forget-password-form border-1 w-[50%] max-w-[400px] min-w-[300px] p-5",
      )}
    >
      <h1 className={clsx("mb-[1.5rem] text-2xl font-md text-center")}>
        Get Reset Password Link
      </h1>
      <form
        className={clsx("flex flex-col gap-[1rem]")}
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ email: emailRef?.current?.value as string });
        }}
      >
        <input
          type="text"
          placeholder="Enter email"
          className={clsx(
            "p-2 focus:outline-none border-1 border-[#ccc] w-[100%]",
          )}
          ref={emailRef}
          required
        />
        <button
          type="submit"
          className={clsx("bg-black text-white p-3 text-bold cursor-pointer")}
        >
          Get Link
        </button>
      </form>
    </section>
  );
}
