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

foreach ($f in @('package.json','SETUP.md','AGENTS.md','CLAUDE.md','docs\PROFILE.md','labs\README.md','astro.config.mjs','labs\lab-00-project-init\README.md','labs\lab-05b-swarm-to-green\README.md')) {
  if (Test-Path (Join-Path $root $f)) { Ok $f } else { Bad "missing $f" }
}

foreach ($ex in @('.claude\settings.json.example','opencode.json.example','.claude\agents\frontend.md','.claude\skills\public-site-safe\SKILL.md','.opencode\agents\backend.md','docs\STATUS.md.example','docs\OPEN_LOOPS.md.example','docs\handoffs\TEMPLATE.md')) {
  if (Test-Path (Join-Path $root $ex)) { Ok $ex } else { Bad "missing $ex" }
}

Push-Location $root
try {
  $trackedNm = @(git ls-files node_modules 2>$null)
  if ($trackedNm.Count -gt 0) {
    Bad "node_modules is tracked in git ($($trackedNm.Count) paths) — remove from index; must not ship in template"
  } else {
    Ok 'node_modules is not tracked in git'
  }

  if (Test-Path '.\node_modules') {
    Ok 'node_modules present (from npm install)'
    $test = npm test 2>&1 | Out-String
    if ($LASTEXITCODE -eq 0) { Ok 'npm test passed' } else { Bad 'npm test failed' }
  } else {
    Info 'node_modules missing — run Lab 00 / npm install then re-run preflight'
  }

  if (Test-Path '.\.claude\settings.json') {
    Ok '.claude/settings.json (Lab 00 project plugins)'
  } else {
    Info '.claude/settings.json missing — complete Lab 00 (project-scope plugins)'
  }

  if (Test-Path '.\opencode.json') {
    Ok 'opencode.json (Lab 00 project plugins)'
  } else {
    Info 'opencode.json missing — complete Lab 00 (or document oh-my fallback)'
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
