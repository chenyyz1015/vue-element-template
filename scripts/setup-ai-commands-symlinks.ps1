# Rebuild AI tool symlinks to .agents/commands for Claude / Codex / Cursor.
# Uses relative symlink targets (via mklink) so Git/GitHub show repo paths.
# Requires Windows Developer Mode or elevated shell for symlinks.

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot

$CommandNames = Get-ChildItem -Path (Join-Path $Root '.agents\commands') -File |
  Select-Object -ExpandProperty Name

$AiCommandDirs = @(
  '.claude\commands',
  '.codex\prompts',
  '.cursor\commands'
)

function Normalize-SymlinkTarget {
  param([string]$Target)

  return ($Target -replace '\\', '/').TrimEnd('/')
}

function Remove-CommandSymlink {
  param([string]$LinkPath)

  $item = Get-Item -LiteralPath $LinkPath -Force
  if ($item.LinkType -ne 'SymbolicLink') {
    throw "Path exists and is not a symlink: $LinkPath"
  }

  $item.Delete()
}

function Get-ResolvedSymlinkTarget {
  param(
    [string]$LinkPath,
    [string]$LinkTarget
  )

  if (-not [System.IO.Path]::IsPathRooted($LinkTarget)) {
    $LinkTarget = Join-Path (Split-Path -Parent $LinkPath) $LinkTarget
  }

  return (Resolve-Path -LiteralPath $LinkTarget).Path
}

function New-RelativeFileSymlink {
  param(
    [string]$LinkPath,
    [string]$RelativeTarget
  )

  $linkParent = Split-Path -Parent $LinkPath
  $linkName = Split-Path -Leaf $LinkPath
  Push-Location $linkParent
  try {
    cmd /c mklink $linkName $RelativeTarget | Out-Null
    if ($LASTEXITCODE -ne 0) {
      throw "mklink failed for $LinkPath"
    }
  }
  finally {
    Pop-Location
  }
}

function Ensure-CommandSymlink {
  param(
    [string]$LinkPath,
    [string]$TargetPath
  )

  $resolvedTarget = (Resolve-Path -LiteralPath $TargetPath).Path
  $commandName = Split-Path -Leaf $TargetPath
  $relativeTarget = "..\..\.agents\commands\$commandName"
  $expectedTarget = "../../.agents/commands/$commandName"

  if (Test-Path -LiteralPath $LinkPath) {
    $item = Get-Item -LiteralPath $LinkPath -Force
    if ($item.LinkType -eq 'SymbolicLink') {
      $linkTarget = @($item.Target)[0]
      $normalizedLinkTarget = Normalize-SymlinkTarget $linkTarget
      $currentTarget = Get-ResolvedSymlinkTarget -LinkPath $LinkPath -LinkTarget $linkTarget
      if ($normalizedLinkTarget -eq $expectedTarget -and $currentTarget -eq $resolvedTarget) {
        Write-Host "OK  $LinkPath"
        return
      }
      Remove-CommandSymlink -LinkPath $LinkPath
    }
    else {
      Write-Warning "SKIP $LinkPath (exists and is not a symlink)"
      return
    }
  }

  New-RelativeFileSymlink -LinkPath $LinkPath -RelativeTarget $relativeTarget
  Write-Host "LINK $LinkPath -> $expectedTarget"
}

foreach ($commandDir in $AiCommandDirs) {
  $parent = Join-Path $Root $commandDir
  if (-not (Test-Path -LiteralPath $parent)) {
    New-Item -ItemType Directory -Path $parent -Force | Out-Null
  }

  foreach ($commandName in $CommandNames) {
    $link = Join-Path $parent $commandName
    $target = Join-Path $Root (Join-Path '.agents\commands' $commandName)
    Ensure-CommandSymlink -LinkPath $link -TargetPath $target
  }
}

Write-Host "Done. Linked $($CommandNames.Count) command(s) into $($AiCommandDirs.Count) AI tool directories."
