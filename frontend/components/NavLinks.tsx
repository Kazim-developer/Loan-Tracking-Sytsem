import clsx from "clsx";
import Link from "next/link";

export default function NavLinks() {
  return (
    <>
      <section
        className={clsx(
          "nav-links flex justify-between items-center gap-[2rem]",
        )}
      >
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#pricing">Pricing</a>
      </section>
      <section
        className={clsx(
          "user-auth flex justify-between items-center gap-[2rem]",
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
    </>
  );
}
