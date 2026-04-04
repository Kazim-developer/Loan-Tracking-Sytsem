"use client";

import clsx from "clsx";
import GoogleButton from "./GoogleButton";
import LineDivider from "./LineDivider";
import ShowPasswordCheckbox from "./ShowPasswordCheckbox";
import { useState, useRef, useEffect } from "react";
import { FormData } from "@/validators/formData.validator";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { postFormData } from "@/utils/postFormData.util";
import { toast } from "react-toastify";

export default function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const emailRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  const { mutate } = useMutation({
    mutationFn: (formData: FormData) => postFormData("auth/signup", formData),
    onSuccess: () => {
      toast.success("account created successfully");
      setTimeout(() => {
        router.replace("/auth/login");
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
        "signup-form border-1 w-[50%] max-w-[400px] min-w-[300px] p-5",
      )}
    >
      <h1 className={clsx("mb-[1.5rem] text-2xl font-md text-center")}>
        Create your account
      </h1>
      <GoogleButton text="Sign up" />
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
          className={clsx("p-2 focus:outline-none border-1 border-[#ccc]")}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className={clsx("p-2 focus:outline-none border-1 border-[#ccc]")}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
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
          Sign Up
        </button>
      </form>
      <p className={clsx("mt-[1rem]")}>
        Already have an account?{" "}
        <Link href="/login" className={clsx("text-blue-800")}>
          Login
        </Link>{" "}
      </p>
    </section>
  );
}
