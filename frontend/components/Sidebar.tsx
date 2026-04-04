"use client";

import clsx from "clsx";
import Link from "next/link";
import Close from "./home/icons/Close";
import useAuthStore from "@/stores/auth.store";
import Profile from "./Profile";
import Logout from "./Logout";

export default function Sidebar({
  setShowSidebar,
}: {
  setShowSidebar: (value: boolean) => void;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isGoogleLogin = useAuthStore((s) => s.isGoogleLogin);

  return (
    <section className="sidebar">
      <Close setShowSidebar={setShowSidebar} />
      {isAuthenticated && isGoogleLogin && <Profile isNavbar={false} />}
      <section
        className={clsx("flex flex-col justify-between items-start gap-[2rem]")}
      >
        <Link href="/dashboard">Dashboard</Link>
        {isAuthenticated && (
          <>
            <Link href="/#features">Features</Link>
            <Link href="/#how-it-works">How It Works</Link>
            <Link href="/#pricing">Pricing</Link>
            <Link href="/#faqs">FAQs</Link>
          </>
        )}
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
            <a href="/dashboard">Dashboard</a>
            <Logout />
          </>
        )}
      </section>

      {!isAuthenticated && (
        <section
          className={clsx(
            "flex flex-col justify-between items-start gap-[2rem] mt-[2rem]",
          )}
        >
          <Link href="login">Login</Link>
          <Link
            href="signup"
            className={clsx(
              "bg-black p-2 text-white rounded-md font-bold hover:[bg-[#999]] hover:opacity-[.9]",
            )}
          >
            Sign Up
          </Link>
        </section>
      )}
    </section>
  );
}
