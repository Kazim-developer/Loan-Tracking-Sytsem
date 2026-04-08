"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import useAuthStore from "@/stores/auth.store";

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
          <h1 className={clsx("text-4xl font-[500] mb-[1rem]")}>
            Track Loans, Invoices, and Customer Payments — All in One Place
          </h1>
          <p className={clsx("text-2xl font-[300] text-[#555]")}>
            Built for lenders and growing businesses to manage installments,
            outstanding balances, and send payment reminders easily.
          </p>
        </section>
        {!isAuthenticated && (
          <section className={clsx("action-buttons flex gap-[1rem]")}>
            <Link
              href="/signup"
              className={clsx(
                "bg-black p-[1em] rounded-md text-white font-bold hover:opacity-[.9]",
              )}
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
            className={clsx(
              "bg-black p-[1em] rounded-md text-white font-bold hover:opacity-[.9]",
            )}
          >
            Go to Dashboard
          </Link>
        )}
      </section>
      <section
        className={clsx(
          "flex-1 border-1 border-[#ddd] rounded-[20px] shadow-2xl p-2 ",
        )}
      >
        <Image
          src="/assets/final-dashboard.webp"
          width={1000}
          height={1000}
          alt="dashboard image"
          priority
        />
      </section>
    </section>
  );
}
