# Rebuild AI tool symlinks to .agents/skills for Claude / Codex / Cursor.
# Uses relative symlink targets (via mklink) so Git/GitHub show repo paths.
# Requires Windows Developer Mode or elevated shell for directory symlinks.

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot

$SkillNames = Get-ChildItem -Path (Join-Path $Root '.agents\skills') -Directory |
  Select-Object -ExpandProperty Name

$AiSkillDirs = @(
  '.claude\skills',
  '.codex\skills',
  '.cursor\skills'
)

function Normalize-SymlinkTarget {
  param([string]$Target)

  return ($Target -replace '\\', '/').TrimEnd('/')
}

function Remove-SkillSymlink {
  param([string]$LinkPath)

  $item = Get-Item -LiteralPath $LinkPath -Force
  if ($item.LinkType -ne 'SymbolicLink') {
    throw "Path exists and is not a symlink: $LinkPath"
  }

  # Do not use Remove-Item on directory symlinks; it may follow the link.
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

function New-RelativeDirectorySymlink {
  param(
    [string]$LinkPath,
    [string]$RelativeTarget
  )

  $linkParent = Split-Path -Parent $LinkPath
  $linkName = Split-Path -Leaf $LinkPath
  Push-Location $linkParent
  try {
    cmd /c mklink /D $linkName $RelativeTarget | Out-Null
    if ($LASTEXITCODE -ne 0) {
      throw "mklink failed for $LinkPath"
    }
  }
  finally {
    Pop-Location
  }
}

function Ensure-SkillSymlink {
  param(
    [string]$LinkPath,
    [string]$TargetPath
  )

  $resolvedTarget = (Resolve-Path -LiteralPath $TargetPath).Path
  $skillName = Split-Path -Leaf $TargetPath
  $relativeTarget = "..\..\.agents\skills\$skillName"
  $expectedTarget = "../../.agents/skills/$skillName"

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
      Remove-SkillSymlink -LinkPath $LinkPath
    }
    else {
      Write-Warning "SKIP $LinkPath (exists and is not a symlink)"
      return
    }
  }

  New-RelativeDirectorySymlink -LinkPath $LinkPath -RelativeTarget $relativeTarget
  Write-Host "LINK $LinkPath -> $expectedTarget"
}

foreach ($skillDir in $AiSkillDirs) {
  $parent = Join-Path $Root $skillDir
  if (-not (Test-Path -LiteralPath $parent)) {
    New-Item -ItemType Directory -Path $parent -Force | Out-Null
  }

  foreach ($skillName in $SkillNames) {
    $link = Join-Path $parent $skillName
    $target = Join-Path $Root (Join-Path '.agents\skills' $skillName)
    Ensure-SkillSymlink -LinkPath $link -TargetPath $target
  }
}

Write-Host "Done. Linked $($SkillNames.Count) skill(s) into $($AiSkillDirs.Count) AI tool directories."
