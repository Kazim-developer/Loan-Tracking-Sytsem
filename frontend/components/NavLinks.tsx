"use client";

import useAuthStore from "@/stores/auth.store";
import clsx from "clsx";
import Link from "next/link";
import Profile from "./Profile";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const pathName = usePathname();

  return (
    <section
      className={clsx(
        "flex justify-between items-center gap-[2rem] max-[760px]:hidden",
      )}
    >
      <section
        className={clsx(
          "nav-links flex justify-between items-center gap-[2rem]",
        )}
      >
        <Link href="/dashboard">Dashboard</Link>
        {pathName !== "/" ? (
          <>
            <Link
              href="/#features"
              className={clsx(pathName === "/#features" ? "active-link" : null)}
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className={clsx(
                pathName === "/#how-it-works" ? "active-link" : null,
              )}
            >
              How It Works
            </Link>
            <Link
              href="/#pricing"
              className={clsx(pathName === "/#pricing" ? "active-link" : null)}
            >
              Pricing
            </Link>
            <Link
              href="/#faqs"
              className={clsx(pathName === "/#faqs" ? "active-link" : null)}
            >
              FAQs
            </Link>
          </>
        ) : (
          <>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faqs">FAQs</a>
          </>
        )}
      </section>
      {!isAuthenticated && (
        <section
          className={clsx(
            "user-auth flex justify-between items-center gap-[2rem]",
          )}
        >
          <Link href="/login">Login</Link>
          <Link
            href="/signup"
            className={clsx(
              "bg-black p-2 text-white rounded-md font-bold hover:[bg-[#999]] hover:opacity-[.9]",
            )}
          >
            Sign Up
          </Link>
        </section>
      )}
      {isAuthenticated && <Profile isNavbar={true} />}
    </section>
  );
}
