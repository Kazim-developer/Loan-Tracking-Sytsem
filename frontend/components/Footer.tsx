"use client";

import Link from "next/link";
import MyLogo from "./MyLogo";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export default function Footer() {
  const pathName = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <footer className="bg-[#efefef] py-[3rem]">
      <section className="center-section flex justify-between items-start gap-[2rem] max-[520px]:flex-col">
        <section className="flex flex-col gap-[1rem] max-w-[600px]">
          <MyLogo />
          <h1>
            Built for lending businesses that are done managing loans on
            spreadsheets.
          </h1>
        </section>
        <section className="flex flex-col gap-[1rem]">
          <h1 className="font-[500]">Product</h1>
          <section className="references flex flex-col gap-[1rem]">
            {pathName !== "/" ? (
              <>
                <Link href="/#features">Features</Link>
                <Link href="/#how-it-works">How It Works</Link>
                <Link href="/#pricing">Pricing</Link>
              </>
            ) : (
              <>
                <a href="#features">Features</a>
                <a href="#how-it-works">How It Works</a>
                <a href="#pricing">Pricing</a>
              </>
            )}
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/support">Support</Link>
          </section>
        </section>
        {!isAuthenticated && (
          <section className="flex flex-col gap-[1rem]">
            <h1 className="font-[500]">Account</h1>
            <section className="references flex flex-col gap-[1rem]">
              <Link href="/signup">Sign Up</Link>
              <Link href="/login">Login</Link>
            </section>
          </section>
        )}
      </section>
      <hr className="center-section my-[1rem]" />
      <section className="center-section flex justify-between items-center gap-[2rem] max-[780px]:flex-col">
        <p>© {new Date().getFullYear()} Loqvio. All rights reserved.</p>
        <section className="flex justify-center items-center gap-[2rem]">
          <Link href="/privacy" target="_blank">
            Privacy Policy
          </Link>
          <Link href="/refund" target="_blank">
            Refund Policy
          </Link>
          <Link href="/terms" target="_blank">
            Terms and Services
          </Link>
        </section>
      </section>
    </footer>
  );
}
