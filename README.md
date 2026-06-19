# Portfolio / Blog

Personal portfolio and blog for [zamirazenil.com](https://www.zamirazenil.com/) — a statically generated site with an embedded CMS for content editing.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components / PPR)
- [Sanity](https://www.sanity.io) Studio v6, embedded at `/studio`, with Visual Editing and TypeGen
- [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Bun](https://bun.sh) as package manager; [oxlint](https://oxc.rs) + [oxfmt](https://oxc.rs) for linting/formatting
- Deployed on [Vercel](https://vercel.com)

## Development

```sh
bun install
cp .env.local.example .env.local   # fill in values (see below)
bun dev                            # runs typegen, then next dev at localhost:3000
```

Environment variables (`.env.local`):

| Variable                        | Purpose                                                 |
| ------------------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID                                       |
| `NEXT_PUBLIC_SANITY_DATASET`    | Dataset name (`production`)                             |
| `SANITY_API_READ_TOKEN`         | Viewer token — required for draft mode / visual editing |
| `NEXT_PUBLIC_BASE_URL`          | Canonical site origin (https required in production)     |
| `GOOGLE_ANALYTICS_ID`           | Optional GA4 measurement ID (`G-…`)                     |

Pull real values with `vercel env pull .env.local`.

## Commands

| Command                     | What it does                                            |
| --------------------------- | ------------------------------------------------------- |
| `bun dev`                   | Dev server (runs Sanity typegen first)                  |
| `bun run build`             | Production build + Studio manifest extract              |
| `bun run typegen`           | Regenerate `sanity.types.ts` from schema + GROQ queries |
| `bun run type-check`        | Next typegen + `tsc --noEmit`                           |
| `bun run lint` / `lint:fix` | oxlint / oxfmt + oxlint --fix                           |
| `bun run format`            | Format with oxfmt                                       |

## Content model

Documents: `post` (blog), `project` (portfolio). Singletons: `home`, `about`, `postList`, `projectList`, `settings`. Schemas live in `sanity/schemas/`; GROQ queries in `sanity/lib/queries.ts` (typed via `bun run typegen` — rerun it after changing a schema or query).

## Editing content

Open `/studio` on the deployed site (or locally) to edit content. The Presentation tool provides live, click-to-edit previews via draft mode. Published changes appear on the site through `SanityLive` revalidation — no rebuild needed.
