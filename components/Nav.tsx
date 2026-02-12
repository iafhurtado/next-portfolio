"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ConnectButton } from "thirdweb/react";
import { base } from "thirdweb/chains";
import { client } from "@/lib/thirdweb";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="font-display text-lg font-semibold text-[var(--foreground)]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Ivan F.H.
        </a>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="ml-4 [&_button]:rounded-full [&_button]:border [&_button]:border-[var(--border)] [&_button]:bg-transparent [&_button]:px-6 [&_button]:py-2 [&_button]:text-sm [&_button]:font-medium [&_button]:text-[var(--foreground)] [&_button]:transition-colors [&_button]:hover:border-[var(--accent)] [&_button]:hover:bg-[var(--accent-muted)]">
            <ConnectButton
              client={client}
              chain={base}
              connectButton={{
                label: "Connect Wallet",
              }}
              connectModal={{
                size: "wide",
              }}
            />
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
