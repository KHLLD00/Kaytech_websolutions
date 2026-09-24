create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null check (char_length(trim(client_name)) between 2 and 120),
  company text not null check (char_length(trim(company)) between 2 and 160),
  role text,
  content text not null check (char_length(trim(content)) between 20 and 1200),
  rating integer not null check (rating between 1 and 5),
  photo_url text,
  project_id uuid references public.projects(id) on delete set null,
  status text not null default 'pending' check (status in ('pending','published','rejected')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists testimonials_status_idx on public.testimonials(status);
create index if not exists testimonials_project_id_idx on public.testimonials(project_id);
drop trigger if exists testimonials_updated_at on public.testimonials;
create trigger testimonials_updated_at before update on public.testimonials for each row execute function public.set_updated_at();
alter table public.testimonials enable row level security;
drop policy if exists "Public can read published testimonials" on public.testimonials;
create policy "Public can read published testimonials" on public.testimonials for select using (status = 'published');
drop policy if exists "Anyone can submit pending testimonials" on public.testimonials;
create policy "Anyone can submit pending testimonials" on public.testimonials for insert to anon, authenticated with check (status = 'pending' and featured = false);
drop policy if exists "Admin can manage testimonials" on public.testimonials;
create policy "Admin can manage testimonials" on public.testimonials for all to authenticated using ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com') with check ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com');
