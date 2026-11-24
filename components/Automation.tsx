"use client";

import Link from "next/link";
import { Section, SectionItem } from "./Section";
import { WorkflowCanvas } from "./automation/WorkflowCanvas";
import { caseStudyPath, snapshotDate, stats } from "@/lib/automation";

const lessons = [
  {
    title: "Promotion was manual",
    body: "Taking the system from test to a production CRM meant writing a re-runnable migration workflow by hand.",
  },
  {
    title: "Copies drift",
    body: "The Mexican rollout is a second set of workflows. A fix in one market has to be ported to the other.",
  },
  {
    title: "Silence is the failure mode",
    body: "I built a separate monitor workflow, because a sync that stops quietly looks exactly like a sync with nothing to do.",
  },
];

export function Automation() {
  return (
    <Section id="automation" title="Automation in production" wide>
      <SectionItem>
        <h3
          className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          My company has no sales department. It has an orchestrator on n8n.
        </h3>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          OG Bombs Europe finds, qualifies and drafts outreach to independent food shops across the EU with a
          multi-agent system I designed and run. Agents research, score and write. A person sends every message.
          In August 2026 I rolled it out to a second market.
        </p>
      </SectionItem>

      <SectionItem>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[var(--muted-bg)] p-5 last:col-span-2 lg:last:col-span-1">
              <p
                className="text-3xl font-bold text-[var(--foreground)]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--accent)]">{stat.label}</p>
              <p className="mt-1 text-xs leading-snug text-[var(--muted)]">{stat.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-[var(--muted)]">Read from my n8n instance on {snapshotDate}.</p>
      </SectionItem>

      <SectionItem>
        <WorkflowCanvas />
      </SectionItem>

      <SectionItem>
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--accent)]">
          What running it taught me about automation as software
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {lessons.map((lesson) => (
            <div key={lesson.title} className="rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-5">
              <h4 className="font-semibold text-[var(--foreground)]">{lesson.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{lesson.body}</p>
            </div>
          ))}
        </div>
      </SectionItem>

      <SectionItem>
        <div className="flex flex-wrap gap-4">
          <Link
            href={caseStudyPath}
            className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-transform hover:scale-105"
          >
            Read the case study
          </Link>
          <Link
            href="/blog/one-n8n-system-two-markets"
            className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-muted)]"
          >
            Read the short version
          </Link>
        </div>
      </SectionItem>
    </Section>
  );
}
