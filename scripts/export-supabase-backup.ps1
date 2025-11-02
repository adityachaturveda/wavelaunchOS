param(
    [string]$OutputDir = "backups\\exports",
    [string]$StorageUri = "",
    [string]$LogFile = "backups\\backup-log.md",
    [switch]$SkipLog
)

$ErrorActionPreference = "Stop"

if (-not $Env:DATABASE_URL) {
    throw "DATABASE_URL environment variable is required."
}

$pgDump = Get-Command pg_dump -ErrorAction SilentlyContinue
if (-not $pgDump) {
    throw "pg_dump executable not found. Install PostgreSQL client tools and ensure pg_dump is on PATH."
}

$timestampFolder = (Get-Date -Format "yyyyMMdd-HHmmss")
$isoTimestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$resolvedOutputDir = Join-Path $OutputDir $timestampFolder

New-Item -ItemType Directory -Path $resolvedOutputDir -Force | Out-Null

$dumpFile = Join-Path $resolvedOutputDir "supabase-backup-$timestampFolder.dump"

Write-Host "Creating dump: $dumpFile"

& $pgDump.Path "--dbname=$($Env:DATABASE_URL)" "--format=custom" "--file=$dumpFile" "--no-owner" "--no-acl"

if ($LASTEXITCODE -ne 0) {
    throw "pg_dump failed with exit code $LASTEXITCODE."
}

if (-not $SkipLog) {
    $storageLocation = if ($StorageUri) { $StorageUri } else { (Resolve-Path $dumpFile).Path }
    if (-not (Test-Path $LogFile)) {
        $header = @(
            "# Backup Log",
            "",
            "| Date (UTC) | Storage Location | Operator |",
            "| --- | --- | --- |"
        )
        New-Item -ItemType File -Path $LogFile -Force -Value ($header -join [Environment]::NewLine) | Out-Null
    }
    $logEntry = "| $isoTimestamp | $storageLocation | $($Env:USERNAME) |"
    Add-Content -Path $LogFile -Value $logEntry
    Write-Host "Logged backup entry to $LogFile"
} else {
    Write-Host "SkipLog specified; no log entry recorded."
}

Write-Host "Backup complete."
