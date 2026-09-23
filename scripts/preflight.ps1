#Requires -Version 5.1
<#
.SYNOPSIS
  Preflight checks for Build AI Multi-Agent Lab V4 (Windows).
#>
$ErrorActionPreference = 'Continue'
$fail = 0

function Ok($m) { Write-Host "[OK] $m" -ForegroundColor Green }
function Bad($m) { Write-Host "[FAIL] $m" -ForegroundColor Red; $script:fail++ }
function Info($m) { Write-Host "[..] $m" -ForegroundColor Yellow }

Write-Host "=== Course V4 preflight ===" -ForegroundColor Cyan

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
    if ($LASTEXITCODE -gt 1) { Bad "$($t.Name) exit=$LASTEXITCODE" } else { Ok "$($t.Name): $out" }
  } catch {
    Bad "$($t.Name) not found in PATH"
  }
}

try {
  $auth = gh auth status 2>&1 | Out-String
  if ($auth -match 'Logged in') { Ok 'gh authenticated' } else { Bad 'gh not logged in' }
} catch { Bad 'gh auth status failed' }

$labRoot = Split-Path -Parent $PSScriptRoot
if (-not $labRoot) { $labRoot = Get-Location }
Info "lab root: $labRoot"
if (Test-Path (Join-Path $labRoot 'SETUP.md')) { Ok 'SETUP.md present' } else { Bad 'SETUP.md missing' }
if (Test-Path (Join-Path $labRoot 'labs')) { Ok 'labs/ present' } else { Bad 'labs/ missing' }

Info 'Product repo checks are manual: cd into your course-personal-site clone and run npm test'

if ($fail -gt 0) {
  Write-Host "Preflight FAILED ($fail)" -ForegroundColor Red
  exit 1
}
Write-Host 'Preflight PASSED' -ForegroundColor Green
exit 0
