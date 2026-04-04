"use client";

import Hook from "./Hook";
import Link from "next/link";
import clsx from "clsx";
import useAuthStore from "@/stores/auth.store";

export default function CTA() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return (
    <section className="cta py-[3rem] flex flex-col justify-center items-center gap-[2rem]">
      <section>
        <h1 className="text-[#555] text-center text-xl mb-[2rem]">
          Join thousands of users who trust Loqvio with their financial
          management
        </h1>
        <section className="hooks center-section flex justify-center items-center gap-[2rem] max-[600px]:flex-col max-[600px]:items-start">
          <Hook desc="Sign Up to start using" />
          <Hook desc="Upgrade later" />
          <Hook desc="Cancel anytime" />
        </section>
      </section>
      {!isAuthenticated && (
        <Link
          href="/auth/sign-up"
          className={clsx(
            "bg-black p-2 text-white rounded-md font-bold hover:[bg-[#999]] hover:opacity-[.9]",
          )}
        >
          Sign Up
        </Link>
      )}
    </section>
  );
}
