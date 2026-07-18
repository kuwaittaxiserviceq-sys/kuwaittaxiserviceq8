-- ============================================================
-- Kuwait Taxi Service — Admin Panel database setup
-- Run this once in the Supabase SQL editor (safe to re-run).
--
-- Auth model: the admin signs in with the Supabase account whose
-- email equals the ADMIN_GMAIL env var. Server API routes use the
-- service-role key; admin pages read/write directly with the
-- authenticated session.
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- Bookings (core) ----------
create table if not exists bookings (
    id               uuid primary key default gen_random_uuid(),
    created_at       timestamptz not null default now(),
    pickup_location  text,
    destination      text,
    pickup_date      date,
    pickup_time      text,
    vehicle_type     text,
    passengers       int,
    luggage          int,
    customer_name    text,
    customer_phone   text,
    customer_email   text,
    status           text not null default 'pending',
    special_requests text,
    total_price      numeric,
    currency         text default 'KWD',
    payment_status   text,
    payment_method   text,
    driver_name      text,
    driver_phone     text,
    driver_plate     text,
    actual_vehicle   text,
    flight_number    text,
    tags             text,
    internal_notes   text,
    has_return_trip  boolean default false,
    child_seats      int,
    deleted_at       timestamptz
);

create table if not exists booking_audit_logs (
    id           uuid primary key default gen_random_uuid(),
    booking_id   uuid,
    admin_email  text,
    action       text,
    field_name   text,
    old_value    text,
    new_value    text,
    created_at   timestamptz not null default now()
);

-- ---------- Pricing / promo ----------
create table if not exists pricing_rules (
    route      text not null,
    vehicle    text not null,
    price      integer not null default 0,
    updated_at timestamptz default now(),
    primary key (route, vehicle)
);

create table if not exists promo_codes (
    id             uuid primary key default gen_random_uuid(),
    code           text not null unique,
    discount_type  text not null default 'fixed',      -- 'fixed' (KWD) | 'percentage'
    discount_value numeric not null default 0,
    max_uses       int,
    used_count     int not null default 0,
    expires_at     timestamptz,
    is_active      boolean not null default true,
    created_at     timestamptz not null default now()
);

-- ---------- Fleet / locations / templates ----------
create table if not exists fleet (
    id          uuid primary key default gen_random_uuid(),
    name        text not null,
    type        text,
    passengers  int,
    luggage     int,
    status      text not null default 'Active',
    price_label text,
    created_at  timestamptz not null default now()
);

create table if not exists locations (
    id         uuid primary key default gen_random_uuid(),
    name       text not null,
    type       text,
    status     text not null default 'Active',
    created_at timestamptz not null default now()
);

create table if not exists whatsapp_templates (
    id         uuid primary key default gen_random_uuid(),
    title      text not null,
    category   text,
    body       text not null,
    created_at timestamptz not null default now()
);

-- ---------- Customers / support ----------
create table if not exists customer_notes (
    phone      text primary key,
    notes      text,
    updated_at timestamptz default now()
);

create table if not exists support_inquiries (
    id          uuid primary key default gen_random_uuid(),
    name        text not null,
    email       text,
    phone       text,
    subject     text,
    message     text,
    status      text not null default 'open',           -- 'open' | 'resolved'
    booking_ref text,
    admin_notes text,
    created_at  timestamptz not null default now()
);

-- ---------- Blog / community ----------
create table if not exists blogs (
    id              uuid primary key default gen_random_uuid(),
    title           text not null,
    slug            text not null unique,
    excerpt         text,
    content         text,
    category        text,
    tags            text[] default '{}',
    status          text not null default 'draft',      -- 'draft' | 'published' | 'scheduled'
    author          text default 'Kuwait Taxi Service',
    seo_title       text,
    seo_description text,
    seo_keywords    text[] default '{}',
    featured_image  text,
    views           int not null default 0,
    published_at    timestamptz,
    created_at      timestamptz not null default now(),
    updated_at      timestamptz not null default now()
);

create table if not exists blog_comments (
    id          uuid primary key default gen_random_uuid(),
    blog_slug   text not null,
    name        text not null,
    email       text,
    comment     text not null,
    status      text not null default 'pending',        -- 'pending' | 'approved' | 'rejected'
    admin_reply text,
    created_at  timestamptz not null default now()
);

create table if not exists reviews (
    id             uuid primary key default gen_random_uuid(),
    name           text not null,
    email          text,
    location       text,
    rating         int not null default 5,
    title          text,
    review         text not null,
    service        text,
    route          text,
    travel_date    text,
    status         text not null default 'pending',     -- 'pending' | 'approved' | 'rejected'
    admin_response text,
    created_at     timestamptz not null default now()
);

create table if not exists customer_questions (
    id          uuid primary key default gen_random_uuid(),
    name        text not null,
    email       text,
    location    text,
    category    text default 'General',
    service     text,
    question    text not null,
    answer      text,
    answered_by text,
    answered_at timestamptz,
    status      text not null default 'pending',        -- 'pending' | 'answered' | 'rejected'
    created_at  timestamptz not null default now()
);

-- ---------- Drivers ----------
create table if not exists driver_applications (
    id            uuid primary key default gen_random_uuid(),
    full_name     text not null,
    email         text,
    phone_number  text not null,
    city          text,
    vehicle_model text,
    status        text not null default 'pending',      -- 'pending' | 'approved' | 'rejected'
    admin_notes   text,
    created_at    timestamptz not null default now()
);

-- ---------- Row Level Security ----------
-- Any signed-in (authenticated) user gets full access. Create ONLY the
-- admin account in Supabase Auth — email must match the ADMIN_GMAIL env var.
do $$
declare
    t text;
begin
    foreach t in array array[
        'bookings','booking_audit_logs','pricing_rules','promo_codes','fleet',
        'locations','whatsapp_templates','customer_notes','support_inquiries',
        'blogs','blog_comments','reviews','customer_questions','driver_applications'
    ]
    loop
        execute format('alter table %I enable row level security', t);
        execute format('drop policy if exists admin_all on %I', t);
        execute format(
            'create policy admin_all on %I for all to authenticated using (true) with check (true)', t
        );
    end loop;
end $$;

-- Public (anon) read access where the website may need it later.
drop policy if exists public_read_blogs on blogs;
create policy public_read_blogs on blogs
    for select to anon using (status = 'published');

drop policy if exists public_read_comments on blog_comments;
create policy public_read_comments on blog_comments
    for select to anon using (status = 'approved');

drop policy if exists public_read_reviews on reviews;
create policy public_read_reviews on reviews
    for select to anon using (status = 'approved');

-- Public form submissions from the website (booking/review/question/comment/driver/support).
drop policy if exists public_insert_bookings on bookings;
create policy public_insert_bookings on bookings for insert to anon with check (true);

drop policy if exists public_insert_reviews on reviews;
create policy public_insert_reviews on reviews for insert to anon with check (true);

drop policy if exists public_insert_questions on customer_questions;
create policy public_insert_questions on customer_questions for insert to anon with check (true);

drop policy if exists public_insert_comments on blog_comments;
create policy public_insert_comments on blog_comments for insert to anon with check (true);

drop policy if exists public_insert_drivers on driver_applications;
create policy public_insert_drivers on driver_applications for insert to anon with check (true);

drop policy if exists public_insert_support on support_inquiries;
create policy public_insert_support on support_inquiries for insert to anon with check (true);

-- ---------- Storage ----------
-- Create a PUBLIC storage bucket named  blog-images  (Dashboard → Storage →
-- New bucket) so the blog editor can upload featured images.
