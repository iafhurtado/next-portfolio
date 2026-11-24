// Facts and figures for the n8n business development system.
// Numbers are a snapshot read from the n8n instance on the date below.
// Update them here; every section and page reads from this file.

export const snapshotDate = "24 Nov 2026";

export const caseStudyPath = "/case-studies/n8n-business-development";

export const stats = [
  { value: "33", label: "workflows", note: "orchestrators, sub-agents, syncs, monitors" },
  { value: "4,900+", label: "executions", note: "since April 2026" },
  { value: "523", label: "logged prospecting runs", note: "each with its rejection reasons" },
  { value: "1,204", label: "prospects tracked", note: "EU pipeline state table" },
  { value: "2", label: "markets", note: "EU on Pipedrive, Mexico on Odoo" },
];

export type CanvasNodeKind = "trigger" | "data" | "logic" | "code" | "sub" | "agent" | "notify";

export type CanvasNode = {
  id: string;
  x: number;
  y: number;
  kind: CanvasNodeKind;
  name: string;
  sub: string;
  what: string;
  why: string;
};

// Main line of the orchestrator, in execution order.
export const canvasNodes: CanvasNode[] = [
  {
    id: "schedule",
    x: 40,
    y: 40,
    kind: "trigger",
    name: "Schedule",
    sub: "every 10 min",
    what: "A schedule trigger starts the orchestrator. When the queue is full, the tick ends at the backlog guard.",
    why: "A short interval with a cheap exit beats a long interval with a heavy run. The system reacts within minutes once I clear drafts.",
  },
  {
    id: "slot",
    x: 200,
    y: 40,
    kind: "data",
    name: "Rotation slot",
    sub: "1 of 24 searches",
    what: "Reads the current slot from a data table and claims the next one. Each slot is a region and a search angle.",
    why: "State lives in a table, not in the model. Two runs never repeat the same search, and I can see where the rotation stands.",
  },
  {
    id: "state",
    x: 360,
    y: 40,
    kind: "data",
    name: "Pipeline state",
    sub: "data table",
    what: "Loads every known prospect: company, domain, city and status.",
    why: "The pipeline is the source of truth for deduplication and for how much work is already waiting on me.",
  },
  {
    id: "guard",
    x: 520,
    y: 40,
    kind: "logic",
    name: "Backlog guard",
    sub: "max 40 queued",
    what: "Counts leads waiting for a draft and drafts waiting to be sent. Over 40, the run is logged as skipped and the slot is held.",
    why: "Never source faster than a person can work the leads. An agent that fills a queue nobody reads is spend, not pipeline.",
  },
  {
    id: "queries",
    x: 680,
    y: 40,
    kind: "code",
    name: "Build queries",
    sub: "code",
    what: "Builds two search briefs for the slot, rotates the angle, and lists nearby shops already in the pipeline to skip.",
    why: "Prompts are assembled by code from state. The brief changes every run without anyone editing a prompt.",
  },
  {
    id: "prospect",
    x: 840,
    y: 40,
    kind: "sub",
    name: "Prospecting x2",
    sub: "sub-workflow",
    what: "Calls the Prospecting sub-agent twice. It searches the web and returns candidates with a source URL and an evidence phrase.",
    why: "One sub-workflow, one job, one contract. The same agent is reused by the orchestrator and exposed on its own.",
  },
  {
    id: "filter",
    x: 1000,
    y: 40,
    kind: "code",
    name: "Dedupe + EU gate",
    sub: "code, no model",
    what: "Normalises names and domains, drops duplicates, non-EU shops, out-of-scope segments and anything without a source URL.",
    why: "Exact checks belong in code. The model only sees candidates that survive, and is told not to re-check what code already settled.",
  },
  {
    id: "judge",
    x: 130,
    y: 262,
    kind: "agent",
    name: "BDM judge",
    sub: "AI agent",
    what: "Scores each candidate 1 to 5 against a written rubric. Stores 3 and above, never more than five per run, through one tool.",
    why: "The model does the one thing code cannot: judge merit. One tool, a strict output schema, and a cap keep it honest.",
  },
  {
    id: "ok",
    x: 440,
    y: 262,
    kind: "logic",
    name: "Run ok?",
    sub: "if",
    what: "Checks the structured output. A failed run is logged with its summary and pushed to my phone.",
    why: "Failure is a first-class path with its own record, not an exception buried in an execution list.",
  },
  {
    id: "sdr",
    x: 620,
    y: 262,
    kind: "sub",
    name: "SDR drafting",
    sub: "sub-workflow",
    what: "Drafts the first touch and a follow-up for each stored lead, as email or Instagram DM, in German, Spanish or English.",
    why: "Drafts only. Every message goes out under my name, so a person reads and sends each one.",
  },
  {
    id: "log",
    x: 800,
    y: 262,
    kind: "data",
    name: "Run log",
    sub: "data table",
    what: "Writes one row per run: reviewed, approved, stored, top leads, rejection reasons, next slot.",
    why: "523 rows later this table is the system's memory. It tells me which regions run dry and why candidates get rejected.",
  },
  {
    id: "notify",
    x: 980,
    y: 262,
    kind: "notify",
    name: "Push summary",
    sub: "to my phone",
    what: "Sends a one-screen summary: stored, approved, reviewed, pre-filtered, drafts and backlog.",
    why: "I supervise from a notification. If the numbers look off I open the run, otherwise I don't.",
  },
];

export type CanvasAttachment = { id: string; x: number; name: string; sub: string };

// Attached to the AI agent node, the way n8n draws models and tools.
export const judgeAttachments: CanvasAttachment[] = [
  { id: "model", x: 130, name: "Chat model", sub: "via OpenRouter" },
  { id: "schema", x: 240, name: "Output schema", sub: "structured" },
  { id: "revops", x: 350, name: "RevOps tool", sub: "enrich + store" },
];

// A real run, replayed on the canvas. Company names removed.
export const replay = {
  runLabel: "15 Nov 2026, slot 7",
  caption:
    "Six candidates sourced. Code dropped three as duplicates. The judge scored the remaining three at 3 of 5 and stored them for enrichment.",
  // Item counts shown on the edge leaving each node.
  counts: { prospect: "6 found", filter: "3 fresh", judge: "3 stored" } as Record<string, string>,
};

export const subAgents = [
  {
    name: "Prospecting",
    job: "Finds candidates on the open web and returns them with a source URL and an evidence phrase. No evidence, no candidate.",
  },
  {
    name: "RevOps",
    job: "Enriches an approved lead, checks the CRM for an existing deal, and stores it in the pipeline table and Pipedrive.",
  },
  {
    name: "SDR",
    job: "Writes the first message and a follow-up in the lead's language and channel. It drafts. It never sends.",
  },
];

export const designRules = [
  {
    title: "Code first, model last",
    body: "Deduplication, the EU gate and segment filters are deterministic code. In the replayed run, code removed half the candidates before the model saw any of them.",
  },
  {
    title: "Throttle to the human",
    body: "The backlog guard stops sourcing at 40 queued leads. The Mexican copy uses 30, the capacity of the sales rep who works them.",
  },
  {
    title: "A person sends every message",
    body: "Agents research, score and draft. Outreach goes out under a real name, so a real person presses send.",
  },
  {
    title: "Every run leaves a record",
    body: "Success, failure and skip each write a row with reasons. I can answer why a lead was rejected three months later.",
  },
  {
    title: "Evidence or it did not happen",
    body: "A candidate without a source URL is dropped by code. The judge scores what is evidenced, not what sounds plausible.",
  },
];

export const workflowFamily = [
  {
    group: "EU business development",
    items: [
      "Business Development Manager (orchestrator)",
      "Prospecting, RevOps and SDR sub-agents",
      "Company enrichment backfill",
      "Prospecting exposed as an MCP tool",
    ],
  },
  {
    group: "Mexico (cloned for the producer's sales team)",
    items: [
      "MX orchestrator and three localised sub-agents",
      "Odoo sync: contact and opportunity, idempotent",
      "One-off, re-runnable migration to production Odoo",
      "Site stock sync with a separate monitor workflow",
    ],
  },
  {
    group: "Sales follow-through and marketing",
    items: [
      "Sample follow-up engine, daily",
      "Instagram DM to Pipedrive notes (webhook and form)",
      "Creator scout: sourcing, then judge and draft",
      "Weekly GA4 watchdog with nine alert rules",
    ],
  },
];

export const platformLessons = [
  {
    need: "Move a change from test to production",
    built: "A one-off migration workflow, keyed so it can be re-run safely, and a note in the description saying who must approve before publishing.",
    lesson: "Promotion needs a path and an approver that live in the product, not in a description field.",
  },
  {
    need: "Keep two markets in step",
    built: "A second set of workflows cloned from the first, with localised prompts, filters and CRM.",
    lesson: "Copies drift. A fix in one set has to be ported to the other. Diff, merge and a shared base with overrides are what make a clone a deployment.",
  },
  {
    need: "Know when something quietly stopped",
    built: "A separate monitor workflow that alerts on a failed sync or six hours without a good run, plus run-log tables and push summaries.",
    lesson: "Silence is the failure mode. Missed runs matter as much as failed ones, and the view has to span workflows.",
  },
  {
    need: "Configure each market separately",
    built: "Separate credentials per market and constants at the top of code nodes.",
    lesson: "Secrets, variables and limits should be scoped to an environment and reviewable in one place.",
  },
  {
    need: "Change an agent without breaking it",
    built: "An evaluation table for the Mexican RevOps agent and smoke-test workflows for OAuth credentials.",
    lesson: "Tests belong in the promotion path. A workflow that passed its evaluation is a different artefact from one that was edited on the canvas.",
  },
];

export const stack = [
  "n8n",
  "AI Agent nodes",
  "Sub-workflows",
  "Data tables",
  "Webhooks",
  "MCP",
  "OpenRouter",
  "Firecrawl",
  "Pipedrive",
  "Odoo",
  "Supabase",
  "Manychat",
  "GA4",
  "Pushover",
];
