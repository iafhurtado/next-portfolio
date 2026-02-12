"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function Section({
  id,
  title,
  children,
  className = "",
  wide = false,
}: {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <motion.section
      id={id}
      className={`py-20 md:py-28 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
    >
      <div className={`mx-auto px-6 ${wide ? "max-w-6xl" : "max-w-4xl"}`}>
        {title && (
          <motion.h2
            variants={item}
            className="font-display text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-10"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {title}
          </motion.h2>
        )}
        <motion.div variants={container} className="space-y-6">
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}

export function SectionItem({ children }: { children: React.ReactNode }) {
  return <motion.div variants={item}>{children}</motion.div>;
}
