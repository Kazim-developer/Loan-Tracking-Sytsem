"use client";

import clsx from "clsx";
import MyLogo from "./MyLogo";
import Menu from "./icons/Menu";
import { useEffect } from "react";
import NavLinks from "./NavLinks";
import SidebarContainer from "./SidebarContainer";
import useShowElementStore from "@/stores/showElement.store";

export default function Navbar() {
  const showSidebar = useShowElementStore((s) => s.showSidebar);
  const setShowSidebar = useShowElementStore((s) => s.setShowSidebar);

  useEffect(() => {
    if (!showSidebar) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [showSidebar]);

  return (
    <section
      className={clsx(
        "sticky top-0 z-50 border-1 border-[#ccc] bg-[#fefefe] py-[1rem]",
      )}
    >
      <nav
        className={clsx(
          "home-navbar flex justify-between items-center gap-[2rem] center-section",
        )}
      >
        <MyLogo />
        <NavLinks />
        <Menu setShowSidebar={setShowSidebar} />
      </nav>
      <SidebarContainer />
    </section>
  );
}
