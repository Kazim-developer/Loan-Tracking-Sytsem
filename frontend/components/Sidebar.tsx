import clsx from "clsx";
import Link from "next/link";
import Close from "./home/icons/Close";

export default function Sidebar({
  setShowSidebar,
}: {
  setShowSidebar: (value: boolean) => void;
}) {
  return (
    <section className="sidebar">
      <Close setShowSidebar={setShowSidebar} />
      <section
        className={clsx("flex flex-col justify-between items-start gap-[2rem]")}
      >
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#pricing">Pricing</a>
      </section>
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
    </section>
  );
}
