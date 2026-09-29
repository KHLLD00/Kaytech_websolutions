-- Case-study fields for the project portfolio.
-- This migration is additive: existing project content remains valid.

alter table public.projects
  add column if not exists slug text,
  add column if not exists overview text not null default '',
  add column if not exists role jsonb not null default '[]'::jsonb,
  add column if not exists year text not null default '',
  add column if not exists screenshot text,
  add column if not exists github_url text,
  add column if not exists technologies jsonb not null default '[]'::jsonb,
  add column if not exists challenge text not null default '',
  add column if not exists solution text not null default '',
  add column if not exists features jsonb not null default '[]'::jsonb,
  add column if not exists process jsonb not null default '[]'::jsonb,
  add column if not exists outcome text not null default '';

create unique index if not exists projects_slug_unique
  on public.projects (slug)
  where slug is not null and slug <> '';

update public.projects
set slug = regexp_replace(
  regexp_replace(lower(trim(name)), '[^a-z0-9]+', '-', 'g'),
  '(^-+|-+$)', '', 'g'
)
where (slug is null or slug = '');

update public.projects
set screenshot = fallback_image
where (screenshot is null or screenshot = '')
  and fallback_image is not null
  and fallback_image <> '';
