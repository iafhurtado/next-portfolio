"use client";

import { motion } from "framer-motion";
import { Section, SectionItem } from "./Section";

const groups = [
  {
    label: "Top skills",
    items: [
      "Cross-functional Team Leadership",
      "Strategic Planning",
      "Supply Chain Software",
      "Product Management",
      "UX Design",
      "Agile Facilitation",
      "Stakeholder Management",
      "Communication",
      "Stablecoins"
    ],
  },
  {
    label: "Tech & product",
    items: [
      "React",
      "Typescript",
      "HTML & CSS",
      "Figma",
      "Next.js",
      "Tailwind CSS",
      "OpenAI Agents SDK",
      "Cursor",
      "Git",
      "Vercel",
      "Docker",
      "AWS/Bedrock",
      "Solidity",
      "Python"

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
      "Building Generative AI Applications using Amazon Bedrock",
      "AI Engineer Agentic Track by Ed Donner",
      "Node and Version Control",
      "Complete Web Design: from Figma to Webflow by Vako Shvili",
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
