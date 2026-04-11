"use client";

import clsx from "clsx";
import Link from "next/link";
import Close from "./home/icons/Close";
import useAuthStore from "@/stores/auth.store";
import Profile from "./Profile";
import Logout from "./Logout";
import { usePathname } from "next/navigation";

export default function Sidebar({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const pathName = usePathname();

  return (
    <section
      className={clsx(
        "sidebar overflow-y-auto w-[250px] h-full bg-white pt-6 px-6 absolute top-0 right-0 transition-transform duration-300 ease-in-out",
        showSidebar ? "translate-x-0" : "translate-x-full",
      )}
    >
      <Close setShowSidebar={setShowSidebar} />
      {isAuthenticated && <Profile isNavbar={false} />}
      <section
        className={clsx("flex flex-col justify-between items-start gap-[2rem]")}
      >
        {isAuthenticated && (
          <>
            <Link
              href="/"
              className={clsx(pathName === "/" ? "active-link" : null)}
            >
              Home
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
          <Link
            href="/login"
            className={clsx(pathName === "/login" ? "active-link" : null)}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className={clsx(
              "bg-black p-2 text-white rounded-md font-bold hover:[bg-[#999]] hover:opacity-[.9]",
              pathName === "/login" ? "active-link" : null,
            )}
          >
            Sign Up
          </Link>
        </section>
      )}
    </section>
  );
}
