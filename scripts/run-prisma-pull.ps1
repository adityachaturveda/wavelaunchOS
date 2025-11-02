$ErrorActionPreference = "Stop"
$Env:DATABASE_URL = "postgresql://postgres:zpeU6WIu7qvnkxKW@db.oadvgumfvnimaqzzxiww.supabase.co:5432/postgres?sslmode=require"
pnpm --filter @studio-os/database prisma db pull
