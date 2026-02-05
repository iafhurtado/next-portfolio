"use client";

import { Section, SectionItem } from "./Section";

const quote =
  "Origen/Origin/Ankunft";
const quoteAuthor = "— Hermosillo, Sonora, México";

const about = [
  "I do exactly as I say—no empty promises, to myself or others. That’s how I’ve built the skills I have: by not stopping when things got hard, keeping a permanent student mindset, and using creativity to excel.",
  "My curiosity is what drives my work. I am always looking for new challenges and opportunities to learn and grow.",
  "Across companies and projects I’ve gained financial literacy, product and logistics management, business analysis, and how to bring that analysis to market.",
  "If you want to work with me, you know where to find me."
];

export function About() {
  return (
    <Section id="about" title="About">
      <SectionItem>
        <blockquote className="border-l-2 border-[var(--accent)] pl-6 text-lg italic text-[var(--muted)]">
          {quote}
          <footer className="mt-2 not-italic text-[var(--foreground)]">
            {quoteAuthor}
          </footer>
        </blockquote>
      </SectionItem>
      {about.map((paragraph, i) => (
        <SectionItem key={i}>
          <p className="leading-relaxed text-[var(--foreground)]">{paragraph}</p>
        </SectionItem>
      ))}
      <SectionItem>
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--accent)]">
          Professional focus
        </p>
        <p className="mt-2 text-[var(--muted)]">
          Product Management · UX Design · Software Development · Strategic
          Planning · Team Leadership · Supply Chain & Logistics · DeFi &
          Stablecoins
        </p>
      </SectionItem>
    </Section>
  );
}
