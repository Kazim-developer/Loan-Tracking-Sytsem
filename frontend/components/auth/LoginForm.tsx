"use client";

import clsx from "clsx";
import GoogleButton from "@/components/auth/GoogleButton";
import Link from "next/link";
import LineDivider from "@/components/auth/LineDivider";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { FormData } from "@/validators/formData.validator";
import { postFormData } from "@/handlers/postFormData";
import ShowPasswordCheckbox from "@/components/auth/ShowPasswordCheckbox";
import { useAuthStore } from "@/stores/auth.store";
import { hasErrors } from "@/utils/hasErrors.util";

export default function LoginForm() {
  const setAuthUser = useAuthStore((store) => store.setAuthUser);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  const { mutate } = useMutation({
    mutationFn: (formData: FormData) => postFormData("auth/login", formData),
    onSuccess: (data) => {
      toast.success(data.message);
      setTimeout(() => {
        router.replace("/dashboard");
      }, 3000);

      setAuthUser({ email: data.email });
      setAuthUser({ loginMethod: data.method });
      setAuthUser({ isAuthenticated: true });
    },
    onError: (error) => {
      setAuthUser({ isAuthenticated: false });
      if (hasErrors(error)) {
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
        "login-form border-1 w-[80%] max-w-[500px] min-w-[300px] p-5 shadow-md rounded-xl",
      )}
    >
      <h1 className={clsx("mb-[1.5rem] text-2xl font-md text-center")}>
        Login with your account
      </h1>
      <GoogleButton text="Login" />
      <LineDivider />
      <form
        className={clsx("flex flex-col gap-[1rem]")}
        onSubmit={(e) => {
          e.preventDefault();
          mutate(formData);
        }}
      >
        <input
          type="text"
          placeholder="Email"
          ref={emailRef}
          className={clsx(
            "p-2 focus:outline-none border border-gray-300 focus:border-black rounded-lg",
          )}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className={clsx(
            "p-2 focus:outline-none border border-gray-300 focus:border-black rounded-lg",
          )}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <ShowPasswordCheckbox
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <Link href="/forgot-password" className={clsx("text-blue-800")}>
          Forget Password?
        </Link>
        <button
          type="submit"
          className={clsx(
            "bg-black text-white p-3 text-bold cursor-pointer rounded-lg",
          )}
        >
          Login
        </button>
      </form>
      <p className={clsx("mt-[1rem]")}>
        Dont have an account?{" "}
        <Link href="/signup" className={clsx("text-blue-800")}>
          Sign Up
        </Link>{" "}
      </p>
    </section>
  );
}
