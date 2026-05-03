"use client";

import { useAuthStore } from "@/stores/auth.store";
import clsx from "clsx";
import Link from "next/link";
import Profile from "./auth/Profile";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const pathName = usePathname();

  return (
    <section
      className={clsx(
        "flex justify-between items-center gap-[2rem]",
        !isAuthenticated ? "max-[860px]:hidden" : "max-[760px]:hidden",
      )}
    >
      <section
        className={clsx(
          "nav-links flex justify-between items-center gap-[2rem]",
        )}
      >
        {!isAuthenticated && (
          <>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faqs">FAQs</a>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link
              href="/"
              className={clsx(pathName === "/" ? "active-link" : null)}
            >
              Home
            </Link>
            <Link
              href="/loans"
              className={clsx(pathName === "/loans" ? "active-link" : null)}
            >
              Loans
            </Link>
            <Link
              href="/dashboard"
              className={clsx(pathName === "/dashboard" ? "active-link" : null)}
            >
              Dashboard
            </Link>
            <Link
              href="/upgrade"
              className={clsx(pathName === "/upgrade" ? "active-link" : null)}
            >
              Upgrade
            </Link>
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
