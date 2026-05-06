"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/stores/auth.store";

export default function Hero() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <section
      className={clsx(
        "hero py-[3rem] center-section flex justify-between items-center gap-[1rem] max-[1000px]:flex-col max-[1000px]:gap-[2rem]",
      )}
    >
      <section className={clsx("flex-1")}>
        <section className={clsx("text-content mb-[2rem]")}>
          <h1 className="text-4xl font-[500] mb-[1rem]">
            All your loans. One simple system.
          </h1>
          <p className="text-2xl font-[300] text-[#555]">
            Automate calculations, monitor payments, and handle overdue accounts
            with ease
          </p>
        </section>
        {!isAuthenticated && (
          <section className={clsx("action-buttons flex gap-[1rem]")}>
            <Link
              href="/signup"
              className="relative overflow-hidden bg-black p-[1em] rounded-md text-white font-bold hover:opacity-[.9]"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className={clsx(
                "p-[1em] rounded-md border-1 border-[#ccc] hover:bg-[#eee]",
              )}
            >
              Login
            </Link>
          </section>
        )}
        {isAuthenticated && (
          <Link
            href="/dashboard"
            className="relative overflow-hidden bg-black p-[1em] rounded-md text-white font-bold hover:opacity-[.9]"
          >
            Go to Dashboard
          </Link>
        )}
      </section>
      <div className="flex-1 border border-[#ddd] rounded-[20px] shadow-2xl p-4 overflow-hidden">
        <Image
          src="/assets/stats-dashboard.webp"
          alt="dashboard image"
          width={1400}
          height={900}
          className="w-full h-auto scale-110 object-contain"
          priority
        />
      </div>
    </section>
  );
}
