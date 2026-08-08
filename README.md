# Royal Water Damage — Fort Myers

Production Next.js 16 site for Royal Water Damage, a 24/7 water damage restoration company serving Fort Myers, FL and Southwest Florida.

## Stack

- **Next.js 16** — App Router, TypeScript, React Server Components
- **Tailwind CSS v4** — custom design tokens
- **Radix UI** — accessible accordion, dialog, navigation menu
- **react-hook-form + zod** — lead form with inline validation
- **next-sitemap** — sitemap.xml + robots.txt on postbuild
- **lucide-react** — icons

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build   # compiles + generates sitemap + robots.txt
```

### Vercel Deployment

1. Import this repo at [vercel.com/new](https://vercel.com/new)
2. Add environment variables (see `.env.local` for all keys):
   - `NEXT_PUBLIC_GTM_ID` — Google Tag Manager container ID
   - `NEXT_PUBLIC_GA4_ID` — GA4 Measurement ID (skip if using GTM)
   - `NEXT_PUBLIC_CALLRAIL_ID` — CallRail account ID for DNI
3. Connect domain `royalwaterdamagefortmyers.com`
4. Deploy

## Site Architecture — 76 Static Pages

| Route | Type | Pages |
|---|---|---|
| `/` | Static | 1 |
| `/services/[slug]` | SSG | 7 |
| `/locations/[slug]` | SSG | 6 |
| `/services/[slug]/[city]` | SSG | 42 |
| `/blog/[slug]` | SSG | 3 |
| Static pages | Static | 9 |
| `/api/contact` | Dynamic | 1 |

## Updating Content

All content lives in typed data files — edit these, never individual pages:

| File | Controls |
|---|---|
| `src/data/business.ts` | NAP, hours, phone numbers, geo |
| `src/data/services.ts` | All 7 service pages |
| `src/data/locations.ts` | All 6 location pages |
| `src/data/blog.ts` | All blog posts |
| `public/data/business.json` | Machine-readable citation file |

## Phone Number Strategy (Pay-Per-Call)

| Number | Purpose | Where Used |
|---|---|---|
| **(864) 734-5702** | Pay-per-call tracking | All visible CTAs, header, mobile bar |
| `BUSINESS.phoneGBP` | GBP/NAP schema consistency | JSON-LD `telephone` field only |

**Dynamic Number Insertion (DNI):** Set `NEXT_PUBLIC_CALLRAIL_ID` + update `swap.js` URL in `src/components/analytics/GTMSlot.tsx`. Organic callers see a local (239) pool number; paid callers keep (864).

## Before Launch

Search for all placeholders:
```bash
grep -r "NEEDS CLIENT INPUT" src/ public/
```

Key items needed from client:
- Street address + ZIP
- Logo file (replace SVG wordmark in Header)
- Real photos (hero, team, job site)
- 7 real Google review texts
- Contractor license # and insurance #
- Google Search Console verification code
- OG image `public/og-image.jpg` (1200×630px)
- GTM / GA4 / CallRail IDs → Vercel environment variables
