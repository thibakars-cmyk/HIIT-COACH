-- Supabase schema for HIIT Workout App
create extension if not exists pgcrypto;
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text unique,
  name text,
  email text,
  height numeric,
  weight numeric,
  units text default 'lbs',
  created_at timestamptz default now()
);
create table if not exists groups (
  id uuid primary key default gen_random_uuid(),
  name text,
  code text unique,
  created_by uuid references users(id),
  created_at timestamptz default now()
);
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references groups(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  joined_at timestamptz default now()
);
create table if not exists workout_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  exercise_id text,
  date date,
  sets_completed int,
  reps jsonb,
  weight jsonb,
  notes text,
  created_at timestamptz default now()
);
create table if not exists weekly_stats (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references groups(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  week text,
  weight_snapshot numeric,
  workouts_completed int,
  rank int,
  created_at timestamptz default now()
);
