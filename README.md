# Arcipelago Zero

A minimal, content-managed website built with Next.js 14 and Sanity CMS.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom brand colours
- **CMS**: Sanity v3
- **Fonts**: Manrope (Google Fonts)
- **Deployment**: Vercel (frontend) + Sanity Cloud (Studio)

## Design

### Brand colours

| Name | Hex | Tailwind token |
|------|-----|----------------|
| Teal dark | `#005769` | `teal-dark` |
| Mint | `#aed7c4` | `mint` |
| Sand | `#d8c2a6` | `sand` |

### Layout

- **Navigation**: fixed top bar with a mint pattern strip (`pattern-lines-mint-flipped.png`). Nav items and social links are fetched from Sanity at build/request time. Supports nested pages (dropdown on desktop, drill-down on mobile).
- **Footer**: mint pattern strip (`pattern-lines-mint.png`) with copyright line.
- **Page padding**: root layout accounts for the fixed nav height (`pt-20`/`pt-14`/`pt-20` at mobile/sm/md breakpoints).

## Project Structure

```
arcipelagozero/
├── app/
│   ├── [...slug]/page.tsx   # Dynamic catch-all — renders any Sanity page
│   ├── page.tsx             # Home page (slug: "home")
│   ├── layout.tsx           # Root layout (nav + footer)
│   └── globals.css          # Global styles
├── components/
│   ├── Navigation.tsx       # Fixed nav bar (client component)
│   ├── NavigationWrapper.tsx# Server component — fetches nav data from Sanity
│   ├── Footer.tsx           # Footer
│   ├── PageHeader.tsx       # Optional full-width header image
│   ├── ContentBlock.tsx     # Renders a single content block
│   └── AccordionList.tsx    # Accordion UI component
├── lib/
│   ├── sanity.ts            # Sanity client + fetch helper
│   └── types.ts             # TypeScript types
├── middleware.ts            # Maintenance / coming-soon mode
├── sanity/                  # Sanity Studio (separate app)
│   ├── schemas/             # Content schemas
│   └── sanity.config.ts
└── public/
    └── images/              # Static images (logo, pattern strips)
```

## Content Blocks

Pages are built from composable blocks in Sanity Studio:

| Block | Purpose |
|-------|---------|
| Text Block | Rich text with background colour |
| Image Block | Full-width or contained image |
| Mixed Block | Image + text side by side |
| Gallery Block | Grid of images |
| Carousel Block | Horizontally scrolling images |
| Video Block | Embedded video |
| Embed Block | Arbitrary iframe embed |
| Quote Block | Styled pull quote |
| CTA Block | Call-to-action with button |
| Spacer Block | Vertical whitespace |

## Sanity Page Settings

Each page has three setting groups:

**Content**
- Title, URL slug, optional full-width header image + height (auto / short / medium / tall / fullscreen)
- Content blocks (drag to reorder)
- "Navigation Parent Only" toggle — makes the page a nav-only dropdown container with no content of its own

**Navigation**
- Show in navigation menu (on/off)
- Navigation label (overrides title in the menu)
- Navigation order (lower = earlier)
- Parent page (for nested URLs like `/stays/creative-residency`)

**Settings**
- Published (off = hidden from visitors without deleting)

## Site Settings

A single `siteSettings` document in Sanity controls:
- **Site title** — shown in browser tabs and search results
- **Social media links** — add any platform; toggle "Show in Navigation" per link

Supported platforms: Instagram, Facebook, X (Twitter), LinkedIn, YouTube, TikTok, Pinterest, Vimeo, Threads, Bluesky.

## Maintenance / Coming Soon Mode

Set `NEXT_PUBLIC_MAINTENANCE_MODE=true` in Vercel environment variables to show a "Coming Soon" page to all visitors. The full site stays accessible for preview:

```
https://your-site.vercel.app/?preview=YOUR_PREVIEW_SECRET
```

This sets a cookie valid for 7 days, so you can browse the full site without the query param.

## Setup

### 1. Install dependencies

```bash
npm install
cd sanity && npm install && cd ..
```

### 2. Configure environment variables

**Root `.env.local`:**

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"

# Optional: needed only for server-side content writes
SANITY_API_TOKEN="your-token"

# Optional: enables maintenance / coming soon mode
NEXT_PUBLIC_MAINTENANCE_MODE="false"
PREVIEW_SECRET="your-secret-here"
```

**Sanity Studio `sanity/.env.local`:**

```bash
cd sanity && cp .env.local.example .env.local
```

```env
SANITY_STUDIO_PROJECT_ID="your-project-id"
SANITY_STUDIO_DATASET="production"
```

### 3. Run locally

**Terminal 1 — Next.js frontend:**
```bash
npm run dev
# http://localhost:3000
```

**Terminal 2 — Sanity Studio:**
```bash
npm run sanity
# http://localhost:3333
```

### 4. Create your first page

1. Open Sanity Studio at `http://localhost:3333`
2. Click **Pages** → **Create**
3. Set title `Home` and slug `home`
4. Add content blocks, click **Publish**
5. Refresh `http://localhost:3000`

## Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Import the repo in Vercel
3. Add the environment variables from `.env.local`
4. Deploy

### Sanity Studio

```bash
npm run sanity-deploy
```

Then add your Vercel domain to the CORS allow-list in [sanity.io/manage](https://sanity.io/manage) → API → CORS Origins.

## Troubleshooting

**"Cannot connect to Sanity"** — check `.env.local` has the correct project ID and that Sanity Studio is running locally.

**Page not found** — make sure the page is Published in Sanity Studio and the slug matches the URL exactly.

**Images not loading** — verify `cdn.sanity.io` is listed under `images.remotePatterns` in `next.config.js`.

---

Private project — all rights reserved.
