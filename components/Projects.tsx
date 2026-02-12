"use client";

import { Section, SectionItem } from "./Section";

const projects = [
  {
    name: "LOGSYS",
    tag: "Agentic Supply Chain ·  OS",
    description:
      "A Logistics Operating System controlled via a conversation with agents specialized in the Logistic and Supply Chain industries. You want freight moving? Ask Bookr. You want compliance? Ask Compli.",
    url: "https://logsys-web.vercel.app",
  },
  {
    name: "XOC Protocol",
    tag: "Stablecoin · Multi-chain",
    description:
      "Base protocol for minting XOC on Polygon, Base, Arbitrum, Ethereum, and Optimism. Driving adoption and inclusion for stablecoins in Mexico and beyond.",
    url: "https://www.xocolatl.finance/",
  },
  {
    name: "Alux",
    tag: "DeFi · Lending",
    description:
      "Lending protocol inspired by Aave V3, built within the LaDAO ecosystem to extend decentralized credit and liquidity.",
    url: "https://www.xocolatl.finance/lending",
  },
  {
    name: "CrediTalent",
    tag: "Reputation · Credit",
    description:
      "Experimental protocol extending credit lines to builders based on on-chain reputation via Talent Protocol.",
    url: "https://github.com/La-DAO/creditalent-frontend",
  },
  {
    name: "KN ESP",
    tag: "Supply chain · Enterprise",
    description:
      "Kuehne + Nagel’s modular supply chain platform—sourcing, quality control, orders, transportation, predictive analytics, and digital logistics.",
    url: "https://www.kuehne-nagel.com/services/supply-chain-management/order-management",
  },
];

export function Projects() {
  return (
    <Section id="projects" title="Selected initiatives">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <SectionItem key={project.name}>
            <a
              href={project.url}
              {...(project.url.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="block rounded-xl border border-[var(--border)] bg-[var(--muted-bg)] p-6 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-muted)]"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                {project.tag}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                {project.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {project.description}
              </p>
            </a>
          </SectionItem>
        ))}
      </div>
    </Section>
  );
}
