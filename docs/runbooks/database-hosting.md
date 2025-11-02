# Database Hosting Runbook

## Current Instance
- Provider: Supabase
- Project reference: `oadvgumfvnimaqzzxiww`
- Host: `db.oadvgumfvnimaqzzxiww.supabase.co`
- Region: (refer to Supabase dashboard; recorded during provisioning)
- Plan: Free tier (no paid upgrade planned)

## Provisioning
1. Create a Supabase project (preferred) or Neon database under the Studio OS account.
2. Ensure PostgreSQL version 15+ (Supabase defaults to 15).
3. Record project reference ID, region, and plan tier.

## Connection Strings
- Primary connection (app + migrations):
  `postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres?sslmode=require`
- Migration connection (if Supabase provides dedicated host): use migration URL from dashboard.

## Environment Configuration
1. Update root `.env.local` (developer machines) with DATABASE_URL.
2. Update Vercel project environment variables:
   - `DATABASE_URL` for Production, Preview, Development.
   - Use Supabase service role key only if needed for admin scripts.
3. Keep secrets out of version control; reference `.env.example` for placeholders.
4. Status (2025-10-31): Local `.env.local` updated; Vercel variables pending platform update—coordinate manual update when new credentials issued (no automated rotation tooling on Free tier).

## SSL Enforcement
- Supabase: append `?sslmode=require` (default certificates trusted).
- Neon: use provided pooled/direct URLs with `sslmode=require` or `verify-full` and download CA cert if required.

## Access Controls
- Restrict IP access if plan supports allowlists (not available on Supabase Free tier).
- Supabase Free tier does **not** provide IP allowlists; rely on strong credentials and audit logging.
- Rotate passwords when team members change; update env vars accordingly.

## Backups & Recovery
- Supabase Free tier: **no automatic backups or PITR**. Reliability depends entirely on manual exports; treat the hosted database as ephemeral without these exports.
- Export critical data weekly via SQL export and archive to secure storage (e.g., encrypted S3 bucket). Document export timestamp in this runbook.
- Neon: configure branches/time-travel; schedule backups if plan supports (not used currently).
- Maintain manual backup log (date, storage location, operator). Set calendar reminders for exports.
- Preferred export workflow: run `scripts/export-supabase-backup.ps1` with `DATABASE_URL` set. The script stores dumps under `backups/exports/<timestamp>/`, supports optional off-site URI notes, and appends entries to `backups/backup-log.md`.

### Weekly Export Procedure
1. Ensure `pg_dump` CLI is installed and available on PATH (`pg_dump --version`).
2. In a PowerShell terminal, set `DATABASE_URL` to the Supabase connection string (service role recommended for full export).
3. Execute:
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/export-supabase-backup.ps1 -OutputDir "backups\exports" -StorageUri "s3://secure-bucket/studio-os/db/"
   ```
   - Omit `-StorageUri` to log the local path instead.
4. Upload the generated `.dump` file to encrypted off-site storage (e.g., S3 bucket with server-side encryption) and record the final URI in the prompt or by re-running the script with `-SkipLog` set to `$false` and `-StorageUri` pointing at the remote location.
5. Commit only the updated `backups/backup-log.md` (binary dumps remain gitignored). Ensure log entries include operator name (auto captured via `$Env:USERNAME`).
6. Update the "Manual Backup Log" subsection below with summary notes if needed.

### Manual Backup Verification
1. Weekly: confirm the latest export exists in off-site storage and that `backups/backup-log.md` contains the entry.
2. Monthly: audit the log to ensure no weeks were missed; add a `LogAudit` note with findings.
3. Quarterly spot-restore drill:
   - Provision temporary database (e.g., local Postgres).
   - Restore using `pg_restore --clean --create --dbname=<tmp-connection> <dump-file>`.
   - Validate restored schema with `pnpm --filter @studio-os/database prisma migrate status --schema prisma/schema.prisma` against temporary DB.
   - Record results in `backups/backup-log.md` as `RestoreDrill`.
4. If any export/restore step fails, escalate immediately and re-run export.

## Verification Steps
1. `pnpm --filter @studio-os/database prisma db pull` – confirm connectivity.
2. `pnpm --filter @studio-os/database prisma migrate status` – check migration alignment.
3. `pnpm --filter @studio-os/database run seed` – optional data load.
4. Run basic SQL query via Supabase SQL editor to confirm access.

## Rotation Procedure
- For credential rotation, generate new DB password in Supabase.
- Update `.env.local`, Vercel env vars, and any automation scripts (`scripts/run-prisma-*.ps1`).
- Re-run verification steps.

## Incident Response
1. If database unreachable: check Supabase status, verify SSL settings, test `Test-NetConnection`.
2. If data loss suspected: initiate PITR restore to new branch, validate, then promote.
3. Document incident in runbook change log with remediation steps.

## Change Log
- 2025-10-30: Initial hosting runbook drafted (Story 1.3).
- 2025-10-31: Added environment status notes, access control constraints, and backup requirements (Story 1.3).
- 2025-10-31: Updated to reflect Supabase Free tier usage; added manual backup process and clarified lack of allowlists/PITR.
- 2025-10-31: Documented `export-supabase-backup.ps1`, weekly export workflow, and snapshot verification process.
