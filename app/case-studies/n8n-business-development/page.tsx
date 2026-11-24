import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, PageShell } from "@/components/PageShell";
import { WorkflowCanvas } from "@/components/automation/WorkflowCanvas";
import {
  designRules,
  platformLessons,
  snapshotDate,
  stack,
  stats,
  subAgents,
  workflowFamily,
} from "@/lib/automation";

export const metadata: Metadata = {
  title: "Case study: business development on n8n, in two markets | Ivan Flores Hurtado",
  description:
    "How a one-founder import business runs prospecting, qualification and outreach drafting on a multi-agent n8n system, and what cloning it to a second market taught me about automation as software.",
  openGraph: {
    title: "Business development on n8n, in two markets",
    description:
      "A multi-agent n8n system: orchestrator, three sub-agents, deterministic guardrails and a human who sends every message.",
    type: "article",
  },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl"
      style={{ fontFamily: "var(--font-syne)" }}
    >
      {children}
    </h2>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p className="max-w-3xl text-[17px] leading-relaxed text-[var(--muted)]">{children}</p>;
}

export default function CaseStudy() {
  return (
    <PageShell wide>
      <article className="space-y-20">
        {/* Header */}
        <header>
          <Link href="/" className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
            ← Home
          </Link>
          <div className="mt-8">
            <Eyebrow>Case study · n8n · AI agents</Eyebrow>
          </div>
          <h1
            className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-5xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Business development on n8n, in two markets
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[var(--muted)]">
            OG Bombs Europe has one founder and no sales team. An orchestrator and three sub-agents find,
            qualify and draft outreach to independent food shops across the EU. I designed the system, I run it,
            and I cloned it for our producer&apos;s sales team in Mexico.
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <div>
              <dt className="text-[var(--muted)]">Role</dt>
              <dd className="mt-1 font-medium text-[var(--foreground)]">Founder, product owner, builder</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Period</dt>
              <dd className="mt-1 font-medium text-[var(--foreground)]">April 2026 to present</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Markets</dt>
              <dd className="mt-1 font-medium text-[var(--foreground)]">EU (Pipedrive) and Mexico (Odoo)</dd>
            </div>
          </dl>
        </header>

        {/* Numbers */}
        <section aria-label="Numbers">
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
        </section>

        {/* Problem */}
        <section className="space-y-5">
          <H2>The problem</H2>
          <Prose>
            The buyers are small, independent shops spread over 27 countries and three working languages. Finding
            them is slow research. Qualifying them is judgement. Writing to them has to sound like a founder, not
            a campaign. There was no sales team and no time to prospect by hand.
          </Prose>
          <Prose>
            The goal was never to automate selling. It was to automate everything before the moment a person
            should take over, and to make that handover clean.
          </Prose>
        </section>

        {/* System */}
        <section className="space-y-6">
          <H2>The system</H2>
          <Prose>
            One orchestrator runs on a schedule and calls three sub-workflows. State lives in n8n data tables.
            Press execute to replay a real run, or select a step to see what it does and why.
          </Prose>
          <WorkflowCanvas />
          <div className="grid gap-4 sm:grid-cols-3">
            {subAgents.map((agent) => (
              <div key={agent.name} className="rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">Sub-agent</p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">{agent.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{agent.job}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Design rules */}
        <section className="space-y-6">
          <H2>Five rules the system follows</H2>
          <ol className="grid gap-4 sm:grid-cols-2">
            {designRules.map((rule, i) => (
              <li key={rule.title} className="rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-5">
                <p className="font-mono text-xs text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-semibold text-[var(--foreground)]">{rule.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{rule.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Second market */}
        <section className="space-y-5">
          <H2>The second market</H2>
          <Prose>
            In August 2026 I cloned the system for our producer in Hermosillo. Same architecture, different
            everything else: searches in Mexican Spanish against local directories and Facebook, WhatsApp as a
            first-touch channel, Odoo as the CRM, and a tone specification written by the sales rep who works the
            leads.
          </Prose>
          <Prose>
            The sync to Odoo creates a contact and a linked opportunity and can be run twice without creating
            duplicates. Going live on the production CRM was a separate, one-off migration workflow built to be
            re-run safely. The backlog limit is set to what one person can follow up.
          </Prose>
        </section>

        {/* Workflow family */}
        <section className="space-y-6">
          <H2>What runs around it</H2>
          <div className="grid gap-4 lg:grid-cols-3">
            {workflowFamily.map((family) => (
              <div key={family.group} className="rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
                  {family.group}
                </h3>
                <ul className="mt-4 space-y-2">
                  {family.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-[var(--foreground)]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Platform lessons */}
        <section className="space-y-6">
          <H2>What I had to build myself</H2>
          <Prose>
            Once the business depended on these workflows, I needed what any software team needs: a way to
            promote changes, keep copies in step, see failures and test before shipping. n8n&apos;s enterprise
            features address much of this with Git-based environments, external secrets and log streaming. I
            rebuilt small versions by hand, which is the fastest way I know to learn why they matter.
          </Prose>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[var(--muted-bg)] text-xs uppercase tracking-wider text-[var(--muted)]">
                  <th scope="col" className="px-5 py-3 font-semibold">I needed to</th>
                  <th scope="col" className="px-5 py-3 font-semibold">So I built</th>
                  <th scope="col" className="px-5 py-3 font-semibold">What it tells me as a product manager</th>
                </tr>
              </thead>
              <tbody>
                {platformLessons.map((row) => (
                  <tr key={row.need} className="border-t border-[var(--border)] align-top">
                    <th scope="row" className="px-5 py-4 font-semibold text-[var(--foreground)]">
                      {row.need}
                    </th>
                    <td className="px-5 py-4 leading-relaxed text-[var(--muted)]">{row.built}</td>
                    <td className="px-5 py-4 leading-relaxed text-[var(--foreground)]">{row.lesson}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Stack */}
        <section className="space-y-5">
          <H2>Stack</H2>
          <ul className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[var(--border)] bg-[var(--muted-bg)] px-3 py-1.5 text-sm text-[var(--foreground)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Close */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--muted-bg)] p-8">
          <h2 className="text-xl font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-syne)" }}>
            Want the walkthrough?
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-[var(--muted)]">
            I am happy to open the canvas and go through what broke, what I changed and what I would build next.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="mailto:iafhurtado@gmail.com"
              className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-transform hover:scale-105"
            >
              iafhurtado@gmail.com
            </a>
            <Link
              href="/blog/one-n8n-system-two-markets"
              className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-muted)]"
            >
              Read the short version
            </Link>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
