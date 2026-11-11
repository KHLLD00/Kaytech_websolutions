# Kaytech Web Solutions

A modern, responsive website for **Kaytech Web Solutions**, a digital studio focused on website design for Nigerian businesses. The site presents the studio's services, packages and selected projects, and gives prospective clients a way to request a quote.

**Live website:** https://kaytechwebsolutions.vercel.app

---

## Overview

The project is built with the Next.js App Router and uses Supabase to manage website content. Public-facing pages read content from the database, while an authenticated admin dashboard provides tools for managing the site's content and media.

The interface includes responsive layouts, light and dark themes, project case studies, pricing information, testimonials and contact flows.

## Features

- **Responsive marketing website** with Home, About, Services, Projects and Pricing pages.
- **Service pages** for website design, business websites, e-commerce and custom website design.
- **Project portfolio** with individual case-study pages, project details, technologies, process and outcomes.
- **Content-managed sections** for hero content, services, packages, projects, FAQs and testimonials.
- **Admin dashboard** for managing site content and project media.
- **Quote request flow** that prepares a message users can send through email or WhatsApp.
- **Testimonial submissions** that enter a pending review state before publication.
- **Light and dark themes**, with the initial theme following the visitor's system preference.
- **SEO foundations**, including page metadata, canonical URLs, Open Graph metadata, robots directives and a sitemap.
- **NGN/USD display option** using a periodically cached exchange-rate lookup.

## Tech stack

| Technology | Purpose |
| --- | --- |
| [Next.js](https://nextjs.org/) 16 | App framework and routing |
| [React](https://react.dev/) 19 | UI |
| [TypeScript](https://www.typescriptlang.org/) | Static typing |
| [Tailwind CSS](https://tailwindcss.com/) 4 | Styling |
| [Supabase](https://supabase.com/) | Database, authentication and media storage |
| [@supabase/ssr](https://supabase.com/docs/guides/auth/server-side/nextjs) | Supabase session handling in Next.js |
| [next-themes](https://github.com/pacocoursey/next-themes) | Theme management |
| [Vercel](https://vercel.com/) | Deployment platform |

## Getting started

### Requirements

- Node.js (use a current LTS release)
- npm
- A Supabase project for database-backed content and admin authentication

### 1. Clone the repository

```bash
git clone https://github.com/KHLLD00/Kaytech_websolutions.git
cd Kaytech_websolutions
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Add your Supabase project URL and publishable key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

You can find these values in your Supabase project's API settings.

> Do not put a Supabase service-role key or other secret credentials in a `NEXT_PUBLIC_` variable. The browser client uses the publishable key; database access must be protected by Row Level Security policies.

### 4. Set up Supabase

Run the SQL files in the Supabase SQL Editor, in this order:

1. `supabase/schema.sql` - creates the core CMS tables, policies and media buckets, and inserts initial site content.
2. `supabase/testimonials.sql` - creates the testimonials table and its access policies.
3. Apply the SQL migrations in `supabase/migrations/` in chronological order if they have not already been applied:
   - `20260929_add_project_case_study_fields.sql`
   - `20261027_design_only_content.sql`

Create or configure the admin user in Supabase Authentication using the email authorized by the current admin implementation. The dashboard checks the signed-in user's email, and the SQL policies also use that email for CMS write access. Keep those settings aligned if the admin account changes.

The storage buckets `hero`, `projects` and `general` are created by the core schema script.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |

## Project structure

The repository uses the Next.js App Router. Key directories and files:

```
.
├── app/
│   ├── about/             # About page
│   ├── admin/             # Admin login and dashboard
│   ├── auth/              # Authentication routes
│   ├── pricing/           # Pricing page
│   ├── privacy/            # Privacy page
│   ├── projects/           # Project listing and case studies
│   ├── quote/              # Quote request page
│   ├── services/           # Services and service detail pages
│   ├── testimonial/        # Testimonial submission page
│   ├── globals.css         # Global styles and design tokens
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Homepage
│   ├── robots.ts            # Robots directives
│   ├── sitemap.ts           # Sitemap
│   └── opengraph-image.tsx  # Social sharing image
├── components/
│   ├── admin/               # Admin interface components
│   ├── layout/              # Navigation, footer and shared layout
│   ├── projects/            # Portfolio components
│   ├── quote/               # Quote form components
│   ├── sections/             # Homepage sections
│   ├── services/             # Service components
│   ├── testimonials/         # Testimonial components
│   └── ui/                   # Reusable interface components
├── hooks/                    # React hooks
├── lib/
│   ├── supabase/             # Browser and server Supabase clients
│   ├── content.ts            # Local fallback content
│   ├── constants.ts          # Site-wide constants and links
│   ├── currency.ts           # Exchange-rate lookup and cache
│   ├── project-types.ts       # Project data types
│   ├── quote.ts               # Quote message helpers
│   └── seo.ts                 # Metadata helper
├── supabase/
│   ├── migrations/            # Database migrations
│   ├── schema.sql             # Core CMS schema and policies
│   └── testimonials.sql       # Testimonials schema and policies
├── .env.example
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Content management

The public website reads managed content from Supabase. The core schema includes:

- `site_content` - editable site and hero content
- `services` - service descriptions and display order
- `packages` - pricing packages and included features
- `projects` - portfolio entries and case-study information
- `faqs` - frequently asked questions
- `testimonials` - submitted client feedback and publication status

The admin dashboard is available at `/admin`. Sign in with the configured admin account to manage supported content.

Public visitors can submit testimonials at `/testimonial`. New submissions are stored as pending and are not displayed publicly until approved.

## Deployment

The project can be deployed to [Vercel](https://vercel.com/):

1. Import the GitHub repository into Vercel.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to the project's environment variables.
3. Confirm the Supabase schema, policies, storage buckets and admin account are configured.
4. Deploy the project.

Vercel will use the Next.js framework settings and the scripts defined in `package.json`.

## Security notes

- Keep environment files and secret credentials out of version control.
- Use the Supabase publishable key in the browser, together with correctly configured Row Level Security.
- Review RLS policies whenever database tables or access requirements change.
- Restrict CMS write operations and storage uploads to authorized administrators.
- Keep the admin email check in the application aligned with the admin identity referenced by the database policies.

## Contributing

This repository is maintained for the Kaytech Web Solutions website. Before proposing changes, install dependencies, run the linter and verify that the production build completes:

```bash
npm run lint
npm run build
```

---

Built for **Kaytech Web Solutions**.
