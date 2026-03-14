"use client";

import { useEffect, useState } from "react";
import { MagicCard } from "@/components/ui/magic-card";

interface NavbarProps {
  children: React.ReactNode;
}

export function Navbar({ children }: NavbarProps) {
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
        className={`w-full max-w-7xl transition-all duration-300 ${
          scrolled ? "rounded-b-xl" : "rounded-xl"
        }`}
      >
        <MagicCard
          mode="orb"
          glowFrom={"#E9D5FF"}
          glowTo={"#FBCFE8"}
          className="p-0"
        >
          <div className="flex flex-row items-center h-16 gap-4 border px-4">
            {children}
          </div>
        </MagicCard>
      </div>
    </header>
  );
}
