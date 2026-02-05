"use client";

import { motion } from "framer-motion";

const line1 = "Alignment";
const line2 = "Artist";
const subtitle =
  "Bringing people together and getting shit done. Working out of Hamburg, Germany.";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center bg-grid px-6 pt-24"
    >
      <div className="mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-sm uppercase tracking-widest text-[var(--accent)]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Ivan Flores Hurtado
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          <span className="block">{line1}</span>
          <span className="block text-[var(--accent)]">{line2}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-xl text-lg text-[var(--muted)] sm:text-xl"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <a
            href="https://huggingface.co/spaces/Jaibooo/agents"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-transform hover:scale-105"
          >
            Meet my AI ego
          </a>
          <a
            href="https://www.linkedin.com/in/ivan-flores-hurtado-09243b44"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-muted)]"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <span className="block h-8 w-5 rounded-full border-2 border-current p-1">
            <span className="block h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
