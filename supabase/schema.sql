-- Kaytech Web Solutions CMS
-- Run this once in the Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  content_key text not null,
  value text not null default '',
  updated_at timestamptz not null default now(),
  unique (section, content_key)
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  number text not null default '',
  title text not null,
  short_description text not null default '',
  description text not null default '',
  icon text,
  included_items jsonb not null default '[]'::jsonb,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  price_ngn integer not null default 0 check (price_ngn >= 0),
  features jsonb not null default '[]'::jsonb,
  is_featured boolean not null default false,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  category text not null default '',
  tags jsonb not null default '[]'::jsonb,
  live_url text,
  fallback_image text,
  featured boolean not null default false,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null default '',
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_content_updated_at on public.site_content;
create trigger site_content_updated_at before update on public.site_content
for each row execute function public.set_updated_at();

drop trigger if exists services_updated_at on public.services;
create trigger services_updated_at before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists packages_updated_at on public.packages;
create trigger packages_updated_at before update on public.packages
for each row execute function public.set_updated_at();

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists faqs_updated_at on public.faqs;
create trigger faqs_updated_at before update on public.faqs
for each row execute function public.set_updated_at();

alter table public.site_content enable row level security;
alter table public.services enable row level security;
alter table public.packages enable row level security;
alter table public.projects enable row level security;
alter table public.faqs enable row level security;

-- Public users can only read active/published content.
drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content" on public.site_content
for select using (true);

drop policy if exists "Public can read active services" on public.services;
create policy "Public can read active services" on public.services
for select using (is_active = true);

drop policy if exists "Public can read active packages" on public.packages;
create policy "Public can read active packages" on public.packages
for select using (is_active = true);

drop policy if exists "Public can read active projects" on public.projects;
create policy "Public can read active projects" on public.projects
for select using (is_active = true);

drop policy if exists "Public can read active faqs" on public.faqs;
create policy "Public can read active faqs" on public.faqs
for select using (is_active = true);

-- Only the Kaytech admin account can write CMS content.
-- The dashboard also checks authentication server-side.
create policy "Admin can manage site content" on public.site_content
for all to authenticated
using ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com')
with check ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com');

create policy "Admin can manage services" on public.services
for all to authenticated
using ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com')
with check ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com');

create policy "Admin can manage packages" on public.packages
for all to authenticated
using ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com')
with check ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com');

create policy "Admin can manage projects" on public.projects
for all to authenticated
using ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com')
with check ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com');

create policy "Admin can manage faqs" on public.faqs
for all to authenticated
using ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com')
with check ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com');

insert into public.site_content (section, content_key, value) values
('hero', 'eyebrow', 'WEB DESIGN & DEVELOPMENT'),
('hero', 'heading', 'Websites built to move your business forward.'),
('hero', 'description', 'We design and build modern, high-performing websites that help businesses look credible, connect with their audience, and grow online.'),
('hero', 'primary_cta_text', 'Get a Free Quote'),
('hero', 'primary_cta_link', '/quote'),
('hero', 'secondary_cta_text', 'View Our Projects'),
('hero', 'secondary_cta_link', '/projects'),
('hero', 'supporting_text', 'From idea to launch — we handle the digital side.'),
('hero', 'desktop_image', ''),
('hero', 'mobile_image', '')
on conflict (section, content_key) do nothing;

insert into public.packages (name, description, price_ngn, features, is_featured, display_order)
select * from (values
  ('Starter', 'For businesses that need a professional online presence.', 50000, '["Professional website design","Responsive design","Core website pages","Business/contact information","Social links","Basic SEO foundation","Deployment"]'::jsonb, false, 1),
  ('Business', 'For businesses that need a fuller professional website.', 100000, '["Everything in Starter","More pages/content","Enhanced design","Service/product presentation","Contact/lead forms","Open Graph/social sharing","Advanced SEO foundation","Additional functionality"]'::jsonb, true, 2),
  ('Professional', 'For businesses requiring more advanced or customized experiences.', 150000, '["Everything in Business","Advanced/custom functionality","Custom integrations where applicable","More complex page structures","Enhanced UX","Additional customization"]'::jsonb, false, 3)
) as seed(name, description, price_ngn, features, is_featured, display_order)
where not exists (select 1 from public.packages);

insert into public.services (number, title, short_description, description, included_items, display_order)
select * from (values
  ('01', 'Website Design & Development', 'Modern responsive websites designed and developed around the client''s goals.', 'Modern responsive websites designed and developed around the client''s goals.', '["Custom design suited to the business","Responsive across desktop, tablet and mobile","Clean, maintainable code"]'::jsonb, 1),
  ('02', 'Business Websites', 'Professional websites for companies and organizations that need a strong online presence.', 'Professional websites for companies and organizations that need a strong online presence.', '["Core pages (Home, About, Services, Contact)","Clear presentation of what the business offers","Contact and lead capture"]'::jsonb, 2),
  ('03', 'E-commerce', 'Online stores designed to present products clearly and support purchasing.', 'Online stores designed to present products clearly and support purchasing.', '["Product listings and detail pages","Cart and checkout flow","Optional payment integration"]'::jsonb, 3),
  ('04', 'Custom Web Solutions', 'Custom functionality and experiences for requirements outside standard website packages.', 'Custom functionality and experiences for requirements outside standard website packages.', '["Custom features scoped to your requirements","Third-party integrations where applicable","Ongoing support for evolving needs"]'::jsonb, 4)
) as seed(number, title, short_description, description, included_items, display_order)
where not exists (select 1 from public.services);

-- Storage buckets.
insert into storage.buckets (id, name, public)
values
  ('hero', 'hero', true),
  ('projects', 'projects', true),
  ('general', 'general', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can view CMS media" on storage.objects;
create policy "Public can view CMS media" on storage.objects
for select using (bucket_id in ('hero', 'projects', 'general'));

drop policy if exists "Admin can upload CMS media" on storage.objects;
create policy "Admin can upload CMS media" on storage.objects
for insert to authenticated
with check (
  bucket_id in ('hero', 'projects', 'general')
  and (auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com'
);

drop policy if exists "Admin can update CMS media" on storage.objects;
create policy "Admin can update CMS media" on storage.objects
for update to authenticated
using (
  bucket_id in ('hero', 'projects', 'general')
  and (auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com'
)
with check (
  bucket_id in ('hero', 'projects', 'general')
  and (auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com'
);

drop policy if exists "Admin can delete CMS media" on storage.objects;
create policy "Admin can delete CMS media" on storage.objects
for delete to authenticated
using (
  bucket_id in ('hero', 'projects', 'general')
  and (auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com'
);
