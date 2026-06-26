# Rebuild AI tool symlinks to .agents/commands for Claude / Codex / Cursor.
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

function Remove-CommandSymlink {
  param([string]$LinkPath)

  $item = Get-Item -LiteralPath $LinkPath -Force
  if ($item.LinkType -ne 'SymbolicLink') {
    throw "Path exists and is not a symlink: $LinkPath"
  }

  $item.Delete()
}

function Ensure-CommandSymlink {
  param(
    [string]$LinkPath,
    [string]$TargetPath
  )

  $resolvedTarget = (Resolve-Path -LiteralPath $TargetPath).Path
  $commandName = Split-Path -Leaf $TargetPath
  $relativeTarget = "..\..\.agents\commands\$commandName"

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
      Remove-CommandSymlink -LinkPath $LinkPath
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
