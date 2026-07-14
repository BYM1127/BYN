-- Run in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/nshhnbvpajzczsjnsdln/sql/new
--
-- Prerequisite: enable Clerk third-party auth in Supabase Dashboard
-- (Authentication → Third-party auth → Clerk, domain: modern-fowl-11.clerk.accounts.dev)
--
-- After your first Clerk sign-in, promote the studio owner:
--   update public.customers set role = 'admin' where email = 'bokasyarnmarket@gmail.com';

-- Boka Studio: customers + reviews with Clerk ID auth and single-admin role model.
-- Requires Clerk ↔ Supabase third-party auth (session tokens include `sub` = clerk user id).
-- After your first Clerk sign-in, promote the owner row:
--   update public.customers set role = 'admin' where clerk_id = 'user_xxxxxxxx';

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

create type public.user_role as enum ('user', 'admin');

create type public.review_status as enum ('pending', 'approved', 'rejected');

create type public.review_source as enum ('boutique', 'custom', 'photography', 'other');

-- ---------------------------------------------------------------------------
-- Customers (synced from Clerk on sign-in)
-- ---------------------------------------------------------------------------

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  clerk_id text not null unique,
  email text not null,
  full_name text not null default '',
  phone text,
  avatar_url text,
  role public.user_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.customers is 'BYM customers; clerk_id is the Clerk user id (JWT sub claim).';
comment on column public.customers.role is 'Exactly one admin row is enforced by customers_single_admin_idx.';

-- Only one admin account in the entire system.
create unique index customers_single_admin_idx
  on public.customers (role)
  where role = 'admin';

create index customers_clerk_id_idx on public.customers (clerk_id);
create index customers_email_idx on public.customers (email);

-- ---------------------------------------------------------------------------
-- Reviews (customer testimonials, moderated by admin)
-- ---------------------------------------------------------------------------

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers (id) on delete set null,
  quote text not null check (char_length(trim(quote)) >= 10),
  author_name text not null,
  detail text not null default '',
  rating smallint not null default 5 check (rating between 1 and 5),
  source public.review_source not null default 'other',
  status public.review_status not null default 'pending',
  is_featured boolean not null default false,
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.reviews is 'Customer reviews shown on the marketing site after admin approval.';

create index reviews_status_idx on public.reviews (status);
create index reviews_customer_id_idx on public.reviews (customer_id);
create index reviews_featured_idx on public.reviews (is_featured) where status = 'approved';

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.current_clerk_id()
returns text
language sql
stable
set search_path = public
as $$
  select nullif(auth.jwt() ->> 'sub', '');
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.customers c
    where c.clerk_id = public.current_clerk_id()
      and c.role = 'admin'
  );
$$;

create or replace function public.current_customer_id()
returns uuid
language sql
stable
set search_path = public
as $$
  select c.id
  from public.customers c
  where c.clerk_id = public.current_clerk_id();
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger customers_set_updated_at
  before update on public.customers
  for each row execute function public.set_updated_at();

create trigger reviews_set_updated_at
  before update on public.reviews
  for each row execute function public.set_updated_at();

-- Block non-admins from changing roles (including self-promotion).
create or replace function public.enforce_customer_role_changes()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if old.role is distinct from new.role and not public.is_admin() then
    raise exception 'Only the admin can change customer roles';
  end if;

  return new;
end;
$$;

create trigger customers_enforce_role_changes
  before update on public.customers
  for each row execute function public.enforce_customer_role_changes();

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table public.customers enable row level security;
alter table public.reviews enable row level security;

-- Customers: read own profile
create policy customers_select_own
  on public.customers
  for select
  to authenticated
  using (clerk_id = public.current_clerk_id());

-- Customers: admin reads everyone
create policy customers_select_admin
  on public.customers
  for select
  to authenticated
  using (public.is_admin());

-- Customers: self-register on first Clerk sign-in (always as user)
create policy customers_insert_self
  on public.customers
  for insert
  to authenticated
  with check (
    clerk_id = public.current_clerk_id()
    and role = 'user'
  );

-- Customers: update own non-role fields
create policy customers_update_own
  on public.customers
  for update
  to authenticated
  using (clerk_id = public.current_clerk_id())
  with check (clerk_id = public.current_clerk_id());

-- Customers: admin manages all profiles
create policy customers_update_admin
  on public.customers
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Reviews: public read for approved testimonials (anon + authenticated)
create policy reviews_select_approved
  on public.reviews
  for select
  to anon, authenticated
  using (status = 'approved');

-- Reviews: customers see their own submissions (any status)
create policy reviews_select_own
  on public.reviews
  for select
  to authenticated
  using (customer_id = public.current_customer_id());

-- Reviews: customers submit one review tied to their profile
create policy reviews_insert_own
  on public.reviews
  for insert
  to authenticated
  with check (
    customer_id = public.current_customer_id()
    and status = 'pending'
  );

-- Reviews: admin full access
create policy reviews_select_admin
  on public.reviews
  for select
  to authenticated
  using (public.is_admin());

create policy reviews_insert_admin
  on public.reviews
  for insert
  to authenticated
  with check (public.is_admin());

create policy reviews_update_admin
  on public.reviews
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy reviews_delete_admin
  on public.reviews
  for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Seed approved reviews (from static testimonials)
-- ---------------------------------------------------------------------------

insert into public.reviews (
  quote,
  author_name,
  detail,
  rating,
  source,
  status,
  is_featured
)
values
  (
    'The custom bag was exactly what I described — beautiful quality and the colours were perfect.',
    'Thandi M.',
    'Custom commission',
    5,
    'custom',
    'approved',
    true
  ),
  (
    'You can tell every stitch is made with care. My baby blanket is already a family heirloom.',
    'Sarah K.',
    'Baby blanket',
    5,
    'custom',
    'approved',
    true
  ),
  (
    'Friendly, fast communication and a gorgeous finished piece. Will definitely order again.',
    'Lerato N.',
    'Boutique order',
    5,
    'boutique',
    'approved',
    true
  );

-- ---------------------------------------------------------------------------
-- Orders (migration 20260609130000_orders.sql)
-- ---------------------------------------------------------------------------

create type public.order_status as enum (
  'pending_review',
  'quoted',
  'accepted_pending_deposit',
  'deposit_paid',
  'declined',
  'in_production',
  'ready',
  'shipped',
  'completed'
);

create type public.order_type as enum ('custom', 'boutique');

create type public.quote_channel as enum ('email', 'whatsapp');

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  reordered_from_id uuid references public.orders (id) on delete set null,
  order_number text not null default '' unique,
  order_type public.order_type not null default 'custom',
  builder jsonb not null default '{}',
  live_summary text not null default '',
  inspiration_image_url text,
  sketch_data_url text,
  customer_notes text not null default '',
  status public.order_status not null default 'pending_review',
  quoted_price numeric(10, 2),
  quote_message text,
  quote_channel public.quote_channel,
  rejection_reason text,
  estimated_ready_date date,
  estimated_delivery_date date,
  production_notes text,
  why_timeline_long text,
  deposit_amount numeric(10, 2),
  deposit_paid boolean not null default false,
  deposit_paid_at timestamptz,
  deposit_non_refundable_after timestamptz,
  is_reorderable boolean not null default false,
  reorder_count integer not null default 0 check (reorder_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint orders_reorder_not_self check (reordered_from_id is null or reordered_from_id <> id)
);

comment on table public.orders is 'Custom and boutique orders; each row belongs to one customer.';
comment on column public.orders.reordered_from_id is 'Source order when the customer taps Reorder on a completed piece.';
comment on column public.orders.is_reorderable is 'Set true when status becomes completed; unlocks creating a new order from this config.';
comment on column public.orders.reorder_count is 'How many follow-up orders were created from this order.';

create index orders_customer_id_idx on public.orders (customer_id);
create index orders_status_idx on public.orders (status);
create index orders_reordered_from_id_idx on public.orders (reordered_from_id);
create index orders_reorderable_idx on public.orders (customer_id, is_reorderable)
  where is_reorderable = true;

create table public.order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  from_status public.order_status,
  to_status public.order_status not null,
  note text,
  changed_by_customer_id uuid references public.customers (id) on delete set null,
  created_at timestamptz not null default now()
);

comment on table public.order_status_history is 'Audit trail of order status changes and admin notes.';

create index order_status_history_order_id_idx on public.order_status_history (order_id, created_at desc);

create or replace function public.generate_order_number()
returns text
language plpgsql
set search_path = public
as $$
declare
  candidate text;
begin
  loop
    candidate := 'BOK-' || upper(substring(replace(gen_random_uuid()::text, '-', '') from 1 for 8));
    exit when not exists (select 1 from public.orders o where o.order_number = candidate);
  end loop;

  return candidate;
end;
$$;

create or replace function public.orders_set_order_number()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.order_number is null or btrim(new.order_number) = '' then
    new.order_number := public.generate_order_number();
  end if;

  return new;
end;
$$;

create trigger orders_set_order_number
  before insert on public.orders
  for each row execute function public.orders_set_order_number();

create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

create or replace function public.orders_sync_reorderable()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.status = 'completed' then
    new.is_reorderable := true;
  elsif old.status = 'completed' and new.status is distinct from old.status then
    new.is_reorderable := false;
  end if;

  return new;
end;
$$;

create trigger orders_sync_reorderable
  before update on public.orders
  for each row execute function public.orders_sync_reorderable();

create or replace function public.orders_log_status_history()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.order_status_history (
      order_id,
      from_status,
      to_status,
      note,
      changed_by_customer_id
    )
    values (
      new.id,
      null,
      new.status,
      'Order placed',
      new.customer_id
    );

    if new.reordered_from_id is not null then
      update public.orders
      set reorder_count = reorder_count + 1
      where id = new.reordered_from_id;
    end if;

    return new;
  end if;

  if new.status is distinct from old.status then
    insert into public.order_status_history (
      order_id,
      from_status,
      to_status,
      note,
      changed_by_customer_id
    )
    values (
      new.id,
      old.status,
      new.status,
      null,
      case when public.is_admin() then public.current_customer_id() else null end
    );
  end if;

  return new;
end;
$$;

create trigger orders_log_status_history
  after insert or update of status on public.orders
  for each row execute function public.orders_log_status_history();

alter table public.orders enable row level security;
alter table public.order_status_history enable row level security;

create policy orders_select_own
  on public.orders
  for select
  to authenticated
  using (customer_id = public.current_customer_id());

create policy orders_insert_own
  on public.orders
  for insert
  to authenticated
  with check (
    customer_id = public.current_customer_id()
    and status = 'pending_review'
    and (
      reordered_from_id is null
      or exists (
        select 1
        from public.orders source
        where source.id = reordered_from_id
          and source.customer_id = public.current_customer_id()
          and source.is_reorderable = true
      )
    )
  );

create policy orders_select_admin
  on public.orders
  for select
  to authenticated
  using (public.is_admin());

create policy orders_insert_admin
  on public.orders
  for insert
  to authenticated
  with check (public.is_admin());

create policy orders_update_admin
  on public.orders
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy orders_delete_admin
  on public.orders
  for delete
  to authenticated
  using (public.is_admin());

create policy order_status_history_select_own
  on public.order_status_history
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.orders o
      where o.id = order_id
        and o.customer_id = public.current_customer_id()
    )
  );

create policy order_status_history_select_admin
  on public.order_status_history
  for select
  to authenticated
  using (public.is_admin());
