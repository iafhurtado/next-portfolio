// Blog posts live here as plain data. Add a post by appending to `posts`.

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO date
  summary: string;
  readingTime: string;
  tags: string[];
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "one-n8n-system-two-markets",
    title: "One n8n system, two markets: what it taught me about automation as software",
    date: "2026-11-24",
    summary:
      "I run business development for my company on n8n, in the EU and in Mexico. Four things I learned once the business started to depend on it.",
    readingTime: "3 min read",
    tags: ["n8n", "AI agents", "Product"],
    body: [
      {
        type: "p",
        text: "OG Bombs Europe imports Mexican spice bombs into the EU. It has one founder and no sales team. Since April 2026 the prospecting, qualifying and first-draft outreach have run on n8n: an orchestrator, three sub-agents, and a rule that a person sends every message.",
      },
      {
        type: "p",
        text: "In August I rolled the same system out to our producer in Hermosillo, on a different CRM and in a different tone. That second market is where the real lessons were.",
      },
      { type: "h2", text: "1. Code first, model last" },
      {
        type: "p",
        text: "Checking for duplicates is exact work, so it belongs in code. A code node normalises names and domains, drops duplicates and anything outside the EU, and only then hands over to the model, which is told not to re-check what code already settled. In a recent run, code removed three of six candidates before the model saw one. The model does the single thing code cannot do: judge whether a lead deserves a founder's email.",
      },
      { type: "h2", text: "2. Copying is not deploying" },
      {
        type: "p",
        text: "The Mexican rollout is a clone: four workflows duplicated, prompts localised, Pipedrive swapped for Odoo. A clone is quick to make and slow to live with. A fix to the filter in one market has to be ported to the other by hand, and nothing shows me where the two sets differ.",
      },
      {
        type: "p",
        text: "Going live on the production CRM needed its own workflow: a one-off migration, keyed so it could be re-run without creating duplicates. That is a deployment pipeline, written by hand, used once.",
      },
      { type: "h2", text: "3. Silence is the failure mode" },
      {
        type: "p",
        text: "A failed execution is easy to see. A sync that quietly stops is not. It looks exactly like a quiet day. I ended up building a separate monitor workflow that alerts when a sync fails or goes six hours without a good run, and a run log that records skips as carefully as successes.",
      },
      { type: "h2", text: "4. Throttle to the human" },
      {
        type: "p",
        text: "Agents can source leads faster than anyone can work them. The orchestrator stops when 40 leads are queued. The Mexican copy stops at 30, which is what one sales rep can handle. A full queue nobody reads is spend, not pipeline.",
      },
      { type: "h2", text: "What this adds up to" },
      {
        type: "p",
        text: "Once a business depends on a workflow, it stops being a canvas and becomes software. It needs environments, a promotion path, a diff, tests and a view of its health. n8n's enterprise features address much of this with Git-based environments, external secrets and log streaming. I rebuilt small versions of them by hand first, which is the fastest way I know to understand why they matter.",
      },
      {
        type: "callout",
        text: "The full architecture, with a replay of a real run, is in the case study.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
