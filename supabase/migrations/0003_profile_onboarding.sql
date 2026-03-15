alter table public.profiles
add column if not exists title text,
add column if not exists business_description text,
add column if not exists naics_codes text[] not null default '{}',
add column if not exists certifications text[] not null default '{}',
add column if not exists capabilities text[] not null default '{}',
add column if not exists state_focus text,
add column if not exists onboarding_completed boolean not null default false;
