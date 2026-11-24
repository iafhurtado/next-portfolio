"use client";

import Link from "next/link";
import { Section, SectionItem } from "./Section";
import { caseStudyPath } from "@/lib/automation";

type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights?: string[];
  link?: { href: string; label: string };
};

const jobs: Job[] = [
  {
    company: "OG Bombs Europe",
    role: "Founder & Operator",
    period: "Feb 2026 – Present",
    location: "Hamburg, Germany",
    summary:
      "Founder of an import and e-commerce business for Mexican spice bombs. I built the product stack on Lovable and Supabase (storefront, ops dashboard, booking flow) and run business development, sales follow-up and cold outreach on n8n. A multi-agent system sources, qualifies and enriches leads into Pipedrive and drafts the first message in German, Spanish or English. A person reviews and sends every one.",
    highlights: [
      "Designed and operate 33 n8n workflows: an orchestrator with Prospecting, RevOps and SDR sub-agents, deterministic filters and a gated AI judge.",
      "1,204 prospects tracked and 523 logged prospecting runs, each with its rejection reasons, across 4,900+ executions.",
      "Rolled the system out to Mexico for the producer's sales team: localised agents, Odoo CRM sync and a re-runnable migration to production.",
      "Automated the follow-through: a daily sample follow-up engine, Instagram DMs logged to Pipedrive, and a weekly GA4 watchdog with nine alert rules.",
    ],
    link: { href: caseStudyPath, label: "Read the n8n case study" },
  },
  {
    company: "Palletways Deutschland GmbH",
    role: "Group Product Manager",
    period: "Oct 2022 – Present",
    location: "Hamburg, Germany",
    summary:
      "Driving success and scalability of the product portal. Stakeholder management and alignment with cross-functional teams to meet customer, partner, and internal needs. Define and execute the portal roadmap with a focus on improvement and innovation.",
  },
  {
    company: "LaDAO",
    role: "Product Engineer",
    period: "Apr 2022 – Dec 2025",
    location: "Distributed",
    summary:
      "DeFi builder: strategic development and management for XOC DAO, grant coordination (e.g. Optimism), design and build of protocols and products. Shipped base protocol for XOC on Polygon, Base, Arbitrum, Ethereum, Optimism; launched Alux (Aave V3–inspired lending) and CrediTalent (reputation-based credit via Talent Protocol).",
  },
  {
    company: "Product Builder (Self-employed)",
    role: "Product Builder",
    period: "Jan 2024 – Jan 2025",
    location: "Hamburg, Germany",
    summary:
      "Hands-on software product building for clients who need someone who knows the code inside-out. Combined Product Management and UX Design to deliver simple solutions to real problems.",
  },
  {
    company: "Product Leadership & UX Design",
    role: "Freelance",
    period: "Sep 2020 – Feb 2024",
    location: "Hamburg, Germany",
    summary:
      "Vision, strategy, and roadmap with executives; Jobs-To-Be-Done and practical solutions; user-interaction diagrams and front-end interfaces (Figma); user feedback and documentation for stakeholders.",
  },
  {
    company: "Fuji DAO",
    role: "Product Team Lead",
    period: "Feb 2022 – Nov 2022",
    location: "Hamburg, Germany",
    summary:
      "Money-lego aggregating borrowing pools with auto-refinancing. Shaped roadmap, structured dev team, and worked with designers and community for high-quality UX of the interface and smart contracts.",
  },
  {
    company: "Kuehne + Nagel",
    role: "Product Manager",
    period: "Mar 2019 – Jan 2021",
    location: "Hamburg Area, Germany",
    summary:
      "KN ESP supply chain platform: modular architecture connecting customers with vendors, assets, and cargo flows. Agile PM role bringing business value and technology together for digital-logistics experience.",
  },
  {
    company: "ShareHouse GmbH & Co. KG",
    role: "Product Owner",
    period: "May 2018 – Mar 2019",
    location: "Hamburg Area, Germany",
    summary: "Marketplace for storage space. Fast, transparent, secure.",
  },
  {
    company: "Clinch Logistics GmbH",
    role: "Co-Founder & CEO",
    period: "Apr 2017 – Feb 2019",
    location: "Hamburg, Germany",
    summary: "Co-founded and led logistics company.",
  },
];

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="relative space-y-0">
        {/* vertical line */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-[var(--border)] md:left-6" />
        {jobs.map((job) => (
          <SectionItem key={`${job.company}-${job.period}`}>
            <div className="relative flex gap-6 pb-10 pl-10 md:pl-12">
              <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-[var(--accent)] md:left-4" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {job.role}
                  </h3>
                  <span className="text-xs text-[var(--muted)]">{job.period}</span>
                </div>
                <p className="text-sm font-medium text-[var(--accent)]">
                  {job.company}
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">{job.location}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {job.summary}
                </p>
                {job.highlights && (
                  <ul className="mt-3 space-y-2">
                    {job.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-relaxed text-[var(--foreground)]"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                          aria-hidden
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
                {job.link && (
                  <Link
                    href={job.link.href}
                    className="mt-4 inline-block text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                  >
                    {job.link.label} →
                  </Link>
                )}
              </div>
            </div>
          </SectionItem>
        ))}
      </div>
    </Section>
  );
}
