"use client";

import { Section, SectionItem } from "./Section";
import { ElectricText } from "./ElectricText";

const email = "iafhurtado@gmail.com";
const linkedIn = "https://www.linkedin.com/in/ivan-flores-hurtado-09243b44";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <SectionItem>
        <p className="text-lg text-[var(--muted)]">
          Open to building the future agentic supply chains and critical logistics technology.
        </p>
        <p className="text-lg text-[var(--muted)]">
          <ElectricText>Let's connect.</ElectricText>
        </p>
      </SectionItem>
      <SectionItem>
        <div className="flex flex-wrap gap-6">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-transform hover:scale-105"
          >
            {email}
          </a>
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)]"
          >
            LinkedIn
          </a>
        </div>
      </SectionItem>
      <SectionItem>
        <p className="text-xs text-[var(--muted)]">
          Hamburg, Germany
        </p>
      </SectionItem>
    </Section>
  );
}
