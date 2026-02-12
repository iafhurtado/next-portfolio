"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ConnectButton } from "thirdweb/react";
import { base } from "thirdweb/chains";
import { client } from "@/lib/thirdweb";

// Style for Connect Wallet button hover effect
const connectButtonStyles = `
  .connect-wallet-btn:hover {
    border-color: rgba(255, 255, 255, 0.8) !important;
    color: rgba(255, 255, 255, 0.8) !important;
  }
`;

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest("nav") && !target.closest(".mobile-menu")) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: connectButtonStyles }} />
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
            onClick={handleLinkClick}
          >
            Ivan F.H.
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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
            <div className="ml-4">
              <ConnectButton
                client={client}
                chain={base}
                connectButton={{
                  label: "Connect Wallet",
                  className: "connect-wallet-btn",
                  style: {
                    backgroundColor: "transparent",
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "9999px",
                    padding: "0.5rem 1.5rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                  },
                }}
                connectModal={{
                  size: "wide",
                }}
              />
            </div>
          </div>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-[var(--foreground)]"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-[var(--foreground)]"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-[var(--foreground)]"
            />
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mobile-menu overflow-hidden bg-[var(--background)]/95 backdrop-blur-md border-t border-[var(--border)]"
            >
              <motion.ul
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col px-6 py-4 gap-4"
              >
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-base text-[var(--muted)] transition-colors hover:text-[var(--foreground)] block py-2"
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <div className="flex justify-center">
                    <ConnectButton
                      client={client}
                      chain={base}
                      connectButton={{
                        label: "Connect Wallet",
                        className: "connect-wallet-btn",
                        style: {
                          backgroundColor: "transparent",
                          color: "white",
                          border: "1px solid white",
                          borderRadius: "9999px",
                          padding: "0.5rem 1.5rem",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          transition: "all 0.2s ease",
                        },
                      }}
                      connectModal={{
                        size: "wide",
                      }}
                    />
                  </div>
                </li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
