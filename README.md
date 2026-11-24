# jaibo.xyz

Personal site of Ivan Flores Hurtado. Next.js (App Router), Tailwind CSS 4, Framer Motion, thirdweb.

## Pages

- `/` — hero, automation showcase, about, skills, experience, projects, education, writing, contact
- `/case-studies/n8n-business-development` — case study of the multi-agent business development system on n8n
- `/blog` and `/blog/[slug]` — blog index and posts

## Where the content lives

| What | File |
| --- | --- |
| n8n numbers, canvas steps, design rules, lessons | `lib/automation.ts` |
| Blog posts | `lib/posts.ts` (append to `posts`) |
| Experience | `components/Experience.tsx` |
| Projects | `components/Projects.tsx` |
| Skills | `components/Skills.tsx` |

The figures in `lib/automation.ts` are a dated snapshot read from the n8n instance. Update `snapshotDate` and `stats` together.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.
