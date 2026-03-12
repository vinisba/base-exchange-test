"use client";

import { Suspense, useEffect, useState } from "react";
import { Logo } from "./logo";
import { Menu } from "./menu";
import { NavUser } from "../user/nav-user";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center transition-all duration-300 ${
        scrolled ? "pt-0 px-0" : "p-4 md:p-6"
      }`}
    >
      <div
        className={`w-full max-w-6xl flex flex-row items-center h-16 gap-4 bg-white border transition-all duration-300 px-4 ${
          scrolled ? "rounded-b-xl" : "rounded-xl"
        }`}
      >
        <Logo />
        <div className="flex-1">
          <Menu />
        </div>
        <NavUser />
      </div>
    </header>
  );
}
