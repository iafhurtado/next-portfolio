"use client";

import { motion } from "framer-motion";
import { Section, SectionItem } from "./Section";

const groups = [
  {
    label: "Top skills",
    items: [
      "Stablecoins",
      "Next.js",
      "Decentralized Applications (DApps)",
      "Product Management",
      "UX Design",
      "Strategic Planning",
      "Team Leadership",
    ],
  },
  {
    label: "Tech & product",
    items: [
      "React",
      "JavaScript",
      "HTML & CSS",
      "Figma",
      "Agile",
      "Roadmap & Stakeholder Management",
    ],
  },
  {
    label: "Languages",
    items: [
      "Spanish (Native)",
      "English (Native)",
      "German (Limited Working)",
      "Russian (Elementary)",
    ],
  },
  {
    label: "Certifications",
    items: [
      "Programming with JavaScript",
      "Version Control",
      "Building Generative AI Applications (Amazon Bedrock)",
      "HTML and CSS in depth",
      "Advanced React",
    ],
  },
];

export function Skills() {
  return (
    <Section id="skills" title="Skills & certifications">
      <div className="grid gap-10 sm:grid-cols-2">
        {groups.map((group, gi) => (
          <SectionItem key={group.label}>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-6">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill, si) => (
                  <motion.li
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ delay: gi * 0.05 + si * 0.03 }}
                    className="rounded-full bg-[var(--background)] px-3 py-1.5 text-sm text-[var(--foreground)]"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </div>
          </SectionItem>
        ))}
      </div>
    </Section>
  );
}
