"use client";

import clsx from "clsx";
import MyLogo from "./MyLogo";
import Menu from "./home/icons/Menu";
import { useState } from "react";
import NavLinks from "./NavLinks";
import SidebarContainer from "./SidebarContainer";

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

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
      <SidebarContainer
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
    </section>
  );
}
