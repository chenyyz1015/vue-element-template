# Rebuild AI tool symlinks to .agents/skills for Claude / Codex / Cursor.
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

function Remove-SkillSymlink {
  param([string]$LinkPath)

  $item = Get-Item -LiteralPath $LinkPath -Force
  if ($item.LinkType -ne 'SymbolicLink') {
    throw "Path exists and is not a symlink: $LinkPath"
  }

  # Do not use Remove-Item on directory symlinks; it may follow the link.
  $item.Delete()
}

function Ensure-SkillSymlink {
  param(
    [string]$LinkPath,
    [string]$TargetPath
  )

  $resolvedTarget = (Resolve-Path -LiteralPath $TargetPath).Path
  $skillName = Split-Path -Leaf $TargetPath
  $relativeTarget = "..\..\.agents\skills\$skillName"

  if (Test-Path -LiteralPath $LinkPath) {
    $item = Get-Item -LiteralPath $LinkPath -Force
    if ($item.LinkType -eq 'SymbolicLink') {
      $linkTarget = @($item.Target)[0]
      if (-not [System.IO.Path]::IsPathRooted($linkTarget)) {
        $linkTarget = Join-Path (Split-Path -Parent $LinkPath) $linkTarget
      }
      $currentTarget = (Resolve-Path -LiteralPath $linkTarget).Path
      if ($currentTarget -eq $resolvedTarget) {
        Write-Host "OK  $LinkPath"
        return
      }
      Remove-SkillSymlink -LinkPath $LinkPath
    }
    else {
      throw "Path exists and is not a symlink: $LinkPath"
    }
  }

  $linkParent = Split-Path -Parent $LinkPath
  $linkName = Split-Path -Leaf $LinkPath
  Push-Location $linkParent
  try {
    New-Item -ItemType SymbolicLink -Path $linkName -Target $relativeTarget | Out-Null
  }
  finally {
    Pop-Location
  }
  Write-Host "LINK $LinkPath -> $relativeTarget"
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
