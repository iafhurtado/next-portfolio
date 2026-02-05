"use client";

import { Section, SectionItem } from "./Section";

const education = [
  {
    school: "Kuehne Logistics University (KLU)",
    degree: "Master’s Degree, Global Logistics",
    period: "2014 – 2016",
    url: "https://www.klu.org/",
  },
  {
    school: "Высшая Школа Экономики (HSE)",
    degree: "Master’s Degree, Faculty of Logistics",
    period: "2015",
    url: "https://www.hse.ru/en/",
  },
  {
    school: "University of Arizona",
    degree: "Bachelor of Science, Business Administration (Operations Management)",
    period: "2009 – 2012",
    url: "https://eller.arizona.edu/",
  },
  {
    school: "Pima Community College",
    degree: "Associate, Business Administration",
    period: "2007 – 2009",
    url: "https://www.pima.edu/",
  },
];

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className="grid gap-6 sm:grid-cols-2">
        {education.map((edu) => (
          <SectionItem key={edu.school}>
            <a
              href={edu.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-5 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-muted)]"
            >
              <p className="font-medium text-[var(--foreground)]">{edu.school}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{edu.degree}</p>
              <p className="mt-1 text-xs text-[var(--accent)]">{edu.period}</p>
            </a>
          </SectionItem>
        ))}
      </div>
    </Section>
  );
}
