# Gram Bangla One - Next.js + Supabase Demo
## Run
1. npm install
2. cp .env.example .env.local -> fill NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
3. npm run dev -> http://localhost:3000
4. Admin: http://localhost:3000/admin

## Supabase Table (SQL)
create table leads (
  id bigint generated always as identity primary key,
  name text not null,
  mobile text not null,
  district text not null,
  interest text not null,
  source text default 'Website',
  status text default 'New',
  created_at timestamptz default now()
);
-- Enable RLS and allow insert for public, select for authenticated, or disable RLS for demo.

## Demo without Supabase
If env not set, app uses localStorage demo data automatically.
