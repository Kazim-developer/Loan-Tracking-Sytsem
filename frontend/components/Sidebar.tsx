"use client";

import clsx from "clsx";
import Link from "next/link";
import Close from "./home/icons/Close";
import useAuthStore from "@/stores/auth.store";
import Image from "next/image";

export default function Sidebar({
  setShowSidebar,
}: {
  setShowSidebar: (value: boolean) => void;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const imageUrl = useAuthStore((s) => s.profileUrl);
  const isGoogleAuthenticated = useAuthStore((s) => s.isGoogleAuthenticated);

  return (
    <section className="sidebar">
      <Close setShowSidebar={setShowSidebar} />
      {isAuthenticated && isGoogleAuthenticated && (
        <Image
          src={imageUrl}
          width={50}
          height={50}
          className="rounded-full relative"
          alt="profile"
        />
      )}
      <section
        className={clsx("flex flex-col justify-between items-start gap-[2rem]")}
      >
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#pricing">Pricing</a>
        <a href="#faqs">FAQs</a>
        {isAuthenticated && (
          <>
            <a href="/dashboard">Dashboard</a>
            <a>Logout</a>
          </>
        )}
      </section>

      {!isAuthenticated && (
        <section
          className={clsx(
            "flex flex-col justify-between items-start gap-[2rem] mt-[2rem]",
          )}
        >
          <Link href="/auth/login">Login</Link>
          <Link
            href="/auth/signup"
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
