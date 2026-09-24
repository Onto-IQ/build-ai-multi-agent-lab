<#
.SYNOPSIS
  Lab 00 one-shot installer/repair for the Build AI Multi-Agent course (Windows 10/11).

.DESCRIPTION
  Installs or repairs every tool the course needs:
    Git, GitHub CLI (gh), Node.js 22 LTS (+npm), Bun, Claude Code, OpenCode, VS Code.

  - Claude Code and Bun come from native installers that ship real .exe binaries.
    OpenCode v2 comes from npm (@opencode/cli) - its official Windows channel;
    winget and the GitHub releases carry only the old v1 line whose TUI is broken
    on Windows ARM64 (TinyCC disabled).
  - Repairs common broken states left by previous installs:
      * tool folders missing from the user PATH
      * dead or conflicting npm global shims for claude/opencode
      * commands that exist but whose version check fails
      * Node.js older than v22
  - Idempotent: healthy tools are skipped, so it is safe to re-run until everything passes.
  - Architecture-agnostic: winget and the official install scripts pick the right binary
    for the machine (x64 on the course image; arm64/emulated also works).

.PARAMETER Force
  Reinstall every tool even if a healthy version is already present.

.PARAMETER NoElevate
  Do not request Administrator (UAC). Machine-scope installs (Git, gh, Node) may then
  fail; user-scope tools (Bun, Claude Code, OpenCode) still install.

.PARAMETER SkipVSCode
  Skip VS Code (e.g. you use Cursor).

.PARAMETER DryRun
  Detect and report only; do not change PATH and do not install or repair anything.

.PARAMETER ElevatedPause
  Internal: pause before closing the elevated window so results stay readable.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .\setup-windows.ps1
#>
[CmdletBinding()]
param(
    [switch]$Force,
    [switch]$NoElevate,
    [switch]$SkipVSCode,
    [switch]$DryRun,
    [switch]$ElevatedPause
)

# ---------------------------------------------------------------------------
# Setup
# ---------------------------------------------------------------------------
$ErrorActionPreference = 'Stop'
try { [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 } catch { }

$script:DryRun  = [bool]$DryRun
$script:Repairs = New-Object System.Collections.Generic.List[string]
$script:Results = New-Object System.Collections.Generic.List[object]

function Write-Step([string]$m) { Write-Host ("==> " + $m) -ForegroundColor Cyan }
function Write-Ok([string]$m)   { Write-Host ("  [ok] " + $m) -ForegroundColor Green }
function Write-Info([string]$m) { Write-Host ("  [!]  " + $m) -ForegroundColor Yellow }
function Write-Bad([string]$m)  { Write-Host ("  [X]  " + $m) -ForegroundColor Red }

function Test-IsAdmin {
    $id = [Security.Principal.WindowsIdentity]::GetCurrent()
    return (New-Object Security.Principal.WindowsPrincipal($id)).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# ---------------------------------------------------------------------------
# PATH plumbing (registry-safe: keeps REG_EXPAND_SZ so %VAR% entries survive)
# ---------------------------------------------------------------------------
function Get-UserPathRaw {
    try {
        $lines = & reg.exe query HKCU\Environment /v Path 2>$null
        if ($LASTEXITCODE -eq 0 -and $lines) {
            foreach ($ln in $lines) {
                if ($ln -match '^\s*Path\s+REG_\w+\s+(.*)$') { return $Matches[1] }
            }
        }
    } catch { }
    return [Environment]::GetEnvironmentVariable('Path', 'User')
}

function Broadcast-EnvChange {
    try {
        if (-not ('Win32.NativeMethods' -as [type])) {
            Add-Type -Namespace Win32 -Name NativeMethods -MemberDefinition @"
[DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Auto)]
public static extern IntPtr SendMessageTimeout(IntPtr hWnd, uint Msg, UIntPtr wParam, string lParam, uint fuFlags, uint uTimeout, out UIntPtr lpdwResult);
"@ | Out-Null
        }
        $result = [UIntPtr]::Zero
        [void][Win32.NativeMethods]::SendMessageTimeout([IntPtr]0xffff, 0x1a, [UIntPtr]::Zero, 'Environment', 2, 5000, [ref]$result)
    } catch { }
}

function Set-UserPathRaw([string]$Value) {
    $done = $false
    try {
        & reg.exe add HKCU\Environment /v Path /t REG_EXPAND_SZ /d $Value /f | Out-Null
        $done = ($LASTEXITCODE -eq 0)
    } catch { $done = $false }
    if (-not $done) {
        [Environment]::SetEnvironmentVariable('Path', $Value, 'User')
    }
    Broadcast-EnvChange
}

function Add-UserPath([string]$Dir) {
    if ([string]::IsNullOrWhiteSpace($Dir) -or -not (Test-Path $Dir)) { return $false }
    # Skip when the session PATH (machine + user) already covers it - no redundant write
    if (($env:Path -split ';') -contains $Dir) { return $false }
    $raw = Get-UserPathRaw
    $parts = @()
    if ($raw) { $parts = @($raw -split ';' | Where-Object { $_ }) }
    if ($parts -contains $Dir) {
        if (($env:Path -split ';') -notcontains $Dir) { $env:Path = "$env:Path;$Dir" }
        return $false
    }
    if ($script:DryRun) { Write-Info "DryRun: would add to user PATH: $Dir"; return $true }
    if ($parts.Count -gt 0) { Set-UserPathRaw (($parts -join ';') + ';' + $Dir) }
    else { Set-UserPathRaw $Dir }
    if (($env:Path -split ';') -notcontains $Dir) { $env:Path = "$env:Path;$Dir" }
    $script:Repairs.Add("Added to user PATH: $Dir")
    Write-Ok "Added to user PATH: $Dir"
    return $true
}

function Refresh-SessionPath {
    $m = [Environment]::GetEnvironmentVariable('Path', 'Machine')
    $u = [Environment]::GetEnvironmentVariable('Path', 'User')
    if (-not $m) { $m = '' }
    if (-not $u) { $u = '' }
    $env:Path = ($m + ';' + $u)
}

# ---------------------------------------------------------------------------
# Tool health
# ---------------------------------------------------------------------------
function Get-VersionOutput([string]$Exe, [string]$VerArg) {
    try {
        $out = & $Exe $VerArg 2>&1 | ForEach-Object { $_.ToString() }
        $joined = (@($out) -join ' ').Trim()
        if ($LASTEXITCODE -and $LASTEXITCODE -ne 0) { return $null }
        if (-not $joined) { return $null }
        return $joined
    } catch { return $null }
}

function Get-Major([string]$Text) {
    if ($Text -match '(\d+)\.(\d+)') { return [int]$Matches[1] }
    return -1
}

function Test-NpmShimSource([string]$Source) {
    return ($Source -and $Source -like (Join-Path $env:APPDATA 'npm*'))
}

function Get-ToolHealth([hashtable]$Spec) {
    $cmd = Get-Command $Spec.Exe -ErrorAction SilentlyContinue | Select-Object -First 1
    $src = $null
    $ver = $null
    $ok  = $false
    if ($cmd) {
        $src = $cmd.Source
        $ver = Get-VersionOutput $Spec.Exe $Spec.VerArg
        if ($ver) {
            $ok = $true
            if ($Spec.MinMajor -and (Get-Major $ver) -lt [int]$Spec.MinMajor) { $ok = $false }
            if ($ok -and $Spec.RejectNpmShim -and (Test-NpmShimSource $src)) { $ok = $false }
            if ($ok -and $Spec.RequireFile -and -not (Test-Path $Spec.RequireFile)) { $ok = $false }
        }
    }
    return [pscustomobject]@{ Found = [bool]$cmd; Version = $ver; Source = $src; Ok = $ok }
}

# ---------------------------------------------------------------------------
# Installers
# ---------------------------------------------------------------------------
function Resolve-Winget {
    $wg = Get-Command winget.exe -ErrorAction SilentlyContinue
    if ($wg) { return $wg.Source }
    $p = Join-Path $env:LOCALAPPDATA 'Microsoft\WindowsApps\winget.exe'
    if (Test-Path $p) { return $p }
    return $null
}

function Install-FromNpm([string]$Package) {
    $npm = Get-Command npm -ErrorAction SilentlyContinue
    if (-not $npm) {
        Write-Bad "npm not found - install Node.js first (this script does that before this step)"
        return $false
    }
    Write-Step "npm install -g $Package (this can take a few minutes)"
    try {
        & npm install -g $Package 2>&1 | Out-Null
        return ($LASTEXITCODE -eq 0)
    } catch {
        Write-Bad "npm install failed for ${Package}: $($_.Exception.Message)"
        return $false
    }
}


function Install-FromWinget([string]$Id) {
    $wg = Resolve-Winget
    if (-not $wg) {
        Write-Info "winget not available - install 'App Installer' from the Microsoft Store, then re-run."
        return $false
    }
    Write-Step "winget install --id $Id (this can take a few minutes)"
    try {
        $out = & $wg install --id $Id -e --silent --accept-package-agreements --accept-source-agreements 2>&1
        $c1 = $LASTEXITCODE
        if ($c1 -ne 0) {
            Write-Info "winget install returned $c1 - trying winget upgrade"
            $out2 = & $wg upgrade --id $Id -e --silent --accept-package-agreements --accept-source-agreements 2>&1
            $c2 = $LASTEXITCODE
            if ($c2 -ne 0) {
                $tail = @($out2 | ForEach-Object { $_.ToString() }) | Select-Object -Last 4
                Write-Bad ("winget failed for $Id (install=$c1, upgrade=$c2): " + ($tail -join ' | '))
                return $false
            }
        }
        return $true
    } catch {
        Write-Bad "winget error for ${Id}: $($_.Exception.Message)"
        return $false
    }
}

function Install-FromScript([string]$Url, [string]$Label) {
    Write-Step "Installing $Label via official installer script"
    try {
        $setup = Invoke-RestMethod -Uri $Url -UseBasicParsing
        Invoke-Expression $setup
        return $true
    } catch {
        Write-Bad "Installer for ${Label} failed: $($_.Exception.Message)"
        return $false
    }
}

# ---------------------------------------------------------------------------
# Shim / broken-install repair
# ---------------------------------------------------------------------------
function Remove-NpmGlobal([string[]]$Pkgs) {
    $npm = Get-Command npm -ErrorAction SilentlyContinue
    if (-not $npm) { return $false }
    foreach ($p in $Pkgs) {
        Write-Step "npm uninstall -g $p (removing shim install)"
        try { & npm uninstall -g $p 2>&1 | Out-Null } catch { }
    }
    return $true
}

function Remove-DeadShims([string]$Exe) {
    $dir = Join-Path $env:APPDATA 'npm'
    $removed = @()
    foreach ($f in @($Exe, "$Exe.ps1", "$Exe.cmd")) {
        $p = Join-Path $dir $f
        if (Test-Path $p) {
            try { Remove-Item $p -Force; $removed += $f } catch { }
        }
    }
    if ($removed.Count -gt 0) {
        $script:Repairs.Add("Removed dead npm shims from ${dir}: " + ($removed -join ', '))
        Write-Ok ("Removed dead npm shims: " + ($removed -join ', '))
        return $true
    }
    return $false
}

function Add-Result([string]$Name, [string]$Status, [string]$Version, [string]$Source, [string]$Note) {
    $script:Results.Add([pscustomobject]@{
        Name = $Name; Status = $Status; Version = $Version; Source = $Source; Note = $Note
    })
}

function Ensure-Tool([hashtable]$Spec) {
    $name = $Spec.Name
    Write-Host ""
    Write-Step "Checking $name"

    if ($Spec.Optional -and $SkipVSCode) {
        Add-Result $name 'SKIPPED' '' '' 'user asked to skip'
        Write-Info "$name skipped (-SkipVSCode)"
        return
    }

    $h = Get-ToolHealth $Spec
    if ($h.Ok -and -not $Force) {
        Add-Result $name 'OK' $h.Version $h.Source 'already healthy'
        Write-Ok "$name already installed ($($h.Version))"
        return
    }

    $src = (Get-Command $Spec.Exe -ErrorAction SilentlyContinue | Select-Object -First 1).Source

    if ($src -and $Spec.ShimPkgs -and (Test-NpmShimSource $src)) {
        Write-Info "$name resolves to an npm shim: $src"
        Write-Info "npm shims (.ps1/.cmd) are the usual cause of 'command not mapped' errors."
        if (-not $script:DryRun) {
            if (-not (Remove-NpmGlobal $Spec.ShimPkgs)) { [void](Remove-DeadShims $Spec.Exe) }
            Refresh-SessionPath
            $script:Repairs.Add("Replaced npm shim with native install for $name")
        } else {
            Write-Info "DryRun: would remove npm shim package(s) $($Spec.ShimPkgs -join ', ') and install native"
        }
    }
    elseif ($src -and -not $h.Version) {
        Write-Info "$name found at $src but its version check failed -> reinstalling"
        if (-not $script:DryRun) { $script:Repairs.Add("Reinstalled broken $name") }
    }
    elseif ($src -and $Spec.MinMajor) {
        Write-Info "$name version ($($h.Version)) is older than the required v$($Spec.MinMajor) -> upgrading"
        if (-not $script:DryRun) { $script:Repairs.Add("Upgraded $name to current stable") }
    }
    elseif ($Force) {
        Write-Step "-Force: reinstalling $name"
    }

    if (-not $script:DryRun) {
        $installed = $false
        if ($Spec.NpmPkg) { $installed = Install-FromNpm $Spec.NpmPkg }
        if (-not $installed -and $Spec.Winget) { $installed = Install-FromWinget $Spec.Winget }
        if (-not $installed -and $Spec.ScriptUrl) { $installed = Install-FromScript $Spec.ScriptUrl $name }
        if (-not $installed) { Write-Info "Install step for $name did not complete cleanly; verifying actual state anyway" }
    } else {
        $how = $Spec.Winget
        if ($Spec.NpmPkg) { $how = "npm -g $($Spec.NpmPkg)" }
        elseif (-not $how) { $how = $Spec.ScriptUrl }
        Write-Info "DryRun: would install $name via $how"
    }

    foreach ($d in $Spec.Probe) { [void](Add-UserPath $d) }
    if (-not $script:DryRun) { Refresh-SessionPath }

    $h2 = Get-ToolHealth $Spec
    if ($h2.Ok) {
        $status = 'INSTALLED'
        if ($src) { $status = 'FIXED' }
        Add-Result $name $status $h2.Version $h2.Source ''
        Write-Ok "$name ready: $($h2.Version)  [$($h2.Source)]"
    } else {
        $note = 'not working after install/repair'
        if ($script:DryRun) { $note = 'not installed (DryRun made no changes)' }
        elseif ($h2.Found) { $note = "found at $($h2.Source) but version check fails" }
        Add-Result $name 'FAIL' $h2.Version $h2.Source $note
        Write-Bad "$name still not working ($note)"
    }
}

# ---------------------------------------------------------------------------
# Tool definitions (order matters: git first, node before npm-dependent steps)
# ---------------------------------------------------------------------------
function Get-ToolSpecs {
    $userBin   = Join-Path $env:USERPROFILE '.local\bin'
    $bunBin    = Join-Path $env:USERPROFILE '.bun\bin'
    $ocBin     = Join-Path $env:USERPROFILE '.opencode\bin'
    $nodejsDir = Join-Path $env:ProgramFiles 'nodejs'
    $gitDir    = Join-Path $env:ProgramFiles 'Git\cmd'
    $ghDir     = Join-Path $env:ProgramFiles 'GitHub CLI'
    $vscodeBin = Join-Path $env:LOCALAPPDATA 'Programs\Microsoft VS Code\bin'

    return @(
        @{ Name = 'git';     Exe = 'git';      VerArg = '--version'; Probe = @($gitDir, $vscodeBin); Winget = 'Git.Git' },
        @{ Name = 'gh';      Exe = 'gh';       VerArg = '--version'; Probe = @($ghDir); Winget = 'GitHub.cli' },
        @{ Name = 'node';    Exe = 'node';     VerArg = '-v';        Probe = @($nodejsDir); Winget = 'OpenJS.NodeJS.LTS'; MinMajor = 22 },
        @{ Name = 'npm';     Exe = 'npm';      VerArg = '-v';        Probe = @($nodejsDir); Winget = '' },
        @{ Name = 'bun';     Exe = 'bun';      VerArg = '-v';        Probe = @($bunBin); ScriptUrl = 'https://bun.sh/install.ps1' },
        @{ Name = 'claude';  Exe = 'claude';   VerArg = '--version'; Probe = @($userBin); ScriptUrl = 'https://claude.ai/install.ps1';
           ShimPkgs = @('@anthropic-ai/claude-code'); RejectNpmShim = $true; RequireFile = (Join-Path $userBin 'claude.exe') },
        # OpenCode v2: npm distribution only (GitHub releases/winget carry the old
        # v1 line, whose TUI is broken on Windows ARM64 - TinyCC disabled).
        # MinMajor=2 flags any leftover v1 as broken and upgrades via npm.
        @{ Name = 'opencode'; Exe = 'opencode'; VerArg = '--version'; Probe = @($ocBin, $userBin, (Join-Path $env:APPDATA 'npm')); ShimPkgs = @('opencode-ai');
           NpmPkg = '@opencode/cli'; MinMajor = 2 },
        @{ Name = 'code';    Exe = 'code';     VerArg = '--version'; Probe = @($vscodeBin); Winget = 'Microsoft.VisualStudioCode'; Optional = $true }
    )
}

# ---------------------------------------------------------------------------
# Elevation
# ---------------------------------------------------------------------------
$isAdmin = Test-IsAdmin
if (-not $isAdmin -and -not $NoElevate -and -not $DryRun -and $PSCommandPath) {
    Write-Step "Requesting Administrator rights (UAC) for machine-scope installs (Git, gh, Node)"
    $argList = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', ('"{0}"' -f $PSCommandPath))
    if ($Force)       { $argList += '-Force' }
    if ($SkipVSCode)  { $argList += '-SkipVSCode' }
    $argList += '-ElevatedPause'
    try {
        Start-Process -FilePath 'powershell.exe' -ArgumentList $argList -Verb RunAs | Out-Null
        Write-Host ""
        Write-Host "Setup continues in the elevated window. You can close this one." -ForegroundColor Green
        exit 0
    } catch {
        Write-Info "UAC was declined or failed ($($_.Exception.Message))."
        Write-Info "Continuing WITHOUT admin: user-scope tools (Bun, Claude Code, OpenCode) can still install;"
        Write-Info "winget machine installs (Git, gh, Node) may fail. Re-run as Administrator for a full install."
    }
}

# ---------------------------------------------------------------------------
# Banner
# ---------------------------------------------------------------------------
$arch = $env:PROCESSOR_ARCHITECTURE
if ($env:PROCESSOR_ARCHITEW6432) { $arch = "$arch (host: $($env:PROCESSOR_ARCHITEW6432))" }
$mode = 'fix'
if ($DryRun) { $mode = 'DRY-RUN (no changes)' }
elseif ($Force) { $mode = 'force reinstall' }
$adminTxt = 'yes'; if (-not (Test-IsAdmin)) { $adminTxt = 'no (user scope only)' }

Write-Host ""
Write-Host "============================================================" -ForegroundColor White
Write-Host " Build AI Multi-Agent - Windows tool installer / repair"      -ForegroundColor White
Write-Host " Target: Windows 10/11 (course image: Windows 11 x64)"        -ForegroundColor White
Write-Host (" Arch: {0} | Admin: {1} | Mode: {2}" -f $arch, $adminTxt, $mode) -ForegroundColor White
Write-Host "============================================================" -ForegroundColor White
Write-Host ""
Write-Info "Existing healthy tools are skipped. Re-run as often as needed."
if (-not $DryRun) { Write-Info "An elevated (new) window may open via UAC - keep it open until the summary." }

# ---------------------------------------------------------------------------
# Pass 1: PATH repair for every known tool folder (fixes 'command not found')
# ---------------------------------------------------------------------------
Write-Host ""
Write-Step "Pass 1: repairing user PATH (known tool folders)"
$specList = Get-ToolSpecs
foreach ($spec in $specList) {
    foreach ($d in $spec.Probe) { [void](Add-UserPath $d) }
}
Refresh-SessionPath

# ---------------------------------------------------------------------------
# Pass 2: per-tool detect -> repair -> install -> verify
# ---------------------------------------------------------------------------
foreach ($spec in $specList) { Ensure-Tool $spec }

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
Write-Host ""
Write-Host "================ SUMMARY ($arch) ================" -ForegroundColor White
$line = "  {0,-10} {1,-9} {2,-44} {3}"
Write-Host ("  {0,-10} {1,-9} {2,-44} {3}" -f 'STATUS', 'TOOL', 'VERSION', 'SOURCE') -ForegroundColor Gray
foreach ($r in $script:Results) {
    $v = $r.Version
    if ($v -and $v.Length -gt 44) { $v = $v.Substring(0, 41) + '...' }
    $s = $r.Source
    if ($s -and $s.StartsWith($env:USERPROFILE)) { $s = '~\' + $s.Substring($env:USERPROFILE.Length + 1) }
    if (-not $s) { $s = '-' }
    $color = 'Gray'
    switch ($r.Status) {
        'OK'        { $color = 'Green' }
        'INSTALLED' { $color = 'Green' }
        'FIXED'     { $color = 'Yellow' }
        'FAIL'      { $color = 'Red' }
        default     { $color = 'Gray' }
    }
    Write-Host ($line -f $r.Status, $r.Name, $v, $s) -ForegroundColor $color
}

$failCount = @($script:Results | Where-Object { $_.Status -eq 'FAIL' }).Count
$repairCount = $script:Repairs.Count
if ($repairCount -gt 0) {
    Write-Host ""
    Write-Host "REPAIRS MADE:" -ForegroundColor Yellow
    foreach ($rep in $script:Repairs) { Write-Host ("  - " + $rep) -ForegroundColor Yellow }
}

Write-Host ""
if ($failCount -gt 0) {
    Write-Bad "$failCount tool(s) still failing. Fix the rows in red above, then re-run this script."
} else {
    Write-Ok "All tools verified."
}

Write-Host ""
Write-Host "NEXT STEPS (interactive logins - run these yourself):" -ForegroundColor White
Write-Host "  1. gh auth login          -> GitHub.com > HTTPS > 'Login with a web browser'"
Write-Host "  2. claude                 -> first run asks you to log in"
Write-Host "  3. opencode auth login    -> pick your provider"
Write-Host ""
Write-Host "Then continue with SETUP.md step 1 (Use this template -> clone your repo)."
Write-Host "If a command above is still 'not found': close and reopen Windows Terminal, then re-run this script."
Write-Host "After cloning the repo, also run: .\scripts\preflight.ps1"

if ($ElevatedPause) {
    Write-Host ""
    [void](Read-Host "Press Enter to close this window")
}
exit ([int]($failCount -gt 0))
