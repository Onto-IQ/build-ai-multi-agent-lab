#Requires -Version 5.1
<#
.SYNOPSIS
  Preflight checks for Build AI Multi-Agent Lab V4 (single-repo template).
#>
$ErrorActionPreference = 'Continue'
$fail = 0
$root = Split-Path -Parent $PSScriptRoot
if (-not $root) { $root = Get-Location }

function Ok($m) { Write-Host "[OK] $m" -ForegroundColor Green }
function Bad($m) { Write-Host "[FAIL] $m" -ForegroundColor Red; $script:fail++ }
function Info($m) { Write-Host "[..] $m" -ForegroundColor Yellow }

Write-Host "=== Course V4 preflight (single repo) ===" -ForegroundColor Cyan
Info "root: $root"

$tools = @(
  @{ Name = 'node'; Args = @('-v') },
  @{ Name = 'git'; Args = @('--version') },
  @{ Name = 'gh'; Args = @('--version') },
  @{ Name = 'claude'; Args = @('--version') },
  @{ Name = 'opencode'; Args = @('--version') },
  @{ Name = 'bun'; Args = @('--version') }
)
foreach ($t in $tools) {
  try {
    $out = & $t.Name @($t.Args) 2>&1 | Select-Object -First 1
    Ok "$($t.Name): $out"
  } catch { Bad "$($t.Name) not found in PATH" }
}

try {
  $auth = gh auth status 2>&1 | Out-String
  if ($auth -match 'Logged in') { Ok 'gh authenticated' } else { Bad 'gh not logged in' }
} catch { Bad 'gh auth status failed' }

foreach ($f in @('package.json','SETUP.md','AGENTS.md','CLAUDE.md','docs\PROFILE.md','labs\README.md','astro.config.mjs')) {
  if (Test-Path (Join-Path $root $f)) { Ok $f } else { Bad "missing $f" }
}

Push-Location $root
try {
  if (Test-Path '.\node_modules') {
    $test = npm test 2>&1 | Out-String
    if ($LASTEXITCODE -eq 0) { Ok 'npm test passed' } else { Bad 'npm test failed' }
  } else {
    Info 'node_modules missing — run npm install then re-run preflight'
  }
  if (Test-Path '.\.env') {
    $ignored = git check-ignore -v .env 2>&1 | Out-String
    if ($ignored -match '\.env') { Ok '.env is gitignored' } else { Bad '.env is NOT ignored' }
  } else {
    Info '.env not created yet (copy from .env.example)'
  }
} finally { Pop-Location }

if ($fail -gt 0) {
  Write-Host "Preflight FAILED ($fail)" -ForegroundColor Red
  exit 1
}
Write-Host 'Preflight PASSED' -ForegroundColor Green
exit 0
