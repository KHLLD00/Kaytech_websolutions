create table if not exists public.promotions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  status text not null default 'draft'
    check (status in ('draft', 'published', 'cancelled', 'ended')),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint promotions_valid_window check (ends_at > starts_at)
);

create table if not exists public.promotion_packages (
  id uuid primary key default gen_random_uuid(),
  promotion_id uuid not null references public.promotions(id) on delete cascade,
  package_id uuid not null references public.packages(id) on delete cascade,
  promo_price_ngn integer not null check (promo_price_ngn >= 0),
  created_at timestamptz not null default now(),
  unique (promotion_id, package_id)
);

create index if not exists promotions_status_window_idx
  on public.promotions (status, starts_at, ends_at);
create index if not exists promotion_packages_package_id_idx
  on public.promotion_packages (package_id);

drop trigger if exists promotions_updated_at on public.promotions;
create trigger promotions_updated_at
before update on public.promotions
for each row execute function public.set_updated_at();

alter table public.promotions enable row level security;
alter table public.promotion_packages enable row level security;

drop policy if exists "Public can read current promotions" on public.promotions;
create policy "Public can read current promotions" on public.promotions
for select to anon, authenticated
using (
  status = 'published'
  and starts_at <= now()
  and ends_at > now()
);

drop policy if exists "Admin can manage promotions" on public.promotions;
create policy "Admin can manage promotions" on public.promotions
for all to authenticated
using ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com')
with check ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com');

drop policy if exists "Public can read current promotion prices" on public.promotion_packages;
create policy "Public can read current promotion prices" on public.promotion_packages
for select to anon, authenticated
using (
  exists (
    select 1
    from public.promotions p
    where p.id = promotion_id
      and p.status = 'published'
      and p.starts_at <= now()
      and p.ends_at > now()
  )
);

drop policy if exists "Admin can manage promotion prices" on public.promotion_packages;
create policy "Admin can manage promotion prices" on public.promotion_packages
for all to authenticated
using ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com')
with check ((auth.jwt() ->> 'email') = 'usmankhaleed899@gmail.com');

insert into public.promotions (slug, name, description, status, starts_at, ends_at)
values (
  'november-2026-special',
  'November Special Offer',
  'Get a professional website at a special price. Offer ends November 30, 2026.',
  'published',
  now(),
  timestamptz '2026-12-01 00:00:00+01'
)
on conflict (slug) do nothing;

insert into public.promotion_packages (promotion_id, package_id, promo_price_ngn)
select p.id, pk.id,
  case pk.name
    when 'Starter' then 50000
    when 'Business' then 100000
    when 'Professional' then 150000
  end
from public.promotions p
cross join public.packages pk
where p.slug = 'november-2026-special'
  and pk.name in ('Starter', 'Business', 'Professional')
on conflict (promotion_id, package_id) do update
set promo_price_ngn = excluded.promo_price_ngn;
