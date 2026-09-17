param()
$ErrorActionPreference = 'Stop'
$repoRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../..'))
$failures = [Collections.Generic.List[string]]::new()
$folders = @('01-company','02-market-and-offers','03-sales','04-delivery','05-legal-privacy-risk','06-marketing','07-finance')
$files = @('README.md','AGENTS.md','00-control/README.md','00-control/CONTENT-MAP.md','00-control/COLLABORATION.md','00-control/DEPENDENCIES.md','00-control/FILE-EDIT-REGISTER.md','00-control/COLLABORATION-SETUP.md','00-control/templates/CHANGE-BRIEF.md','00-control/templates/MERGE-CHECKLIST.md','00-control/templates/CODEOWNERS.example','00-control/DECISIONS.md','00-control/LAUNCH-BOARD.md','00-control/RISKS-AND-BLOCKERS.md','00-control/MOVE-MANIFEST.md','00-control/IMPLEMENTATION-COMPARISON.md','01-company/founders-and-roles/ROLE-REGISTER.md','03-sales/fit-call/README.md','03-sales/fit-call/SALES-PROCESS-SPECIFICATION.md','06-marketing/website-copy/README.md','06-marketing/website-copy/see-where-heutrix-can-help-and-sales-process.md','08-client-project-template/README.md','apps/README.md','.github/README.md','.github/pull_request_template.md','tools/README.md','tools/collaboration/README.md')
foreach ($folder in $folders) {
    $files += "$folder/README.md"
    $files += "$folder/changes/README.md"
    $changesPath = Join-Path $repoRoot "$folder/changes"
    if (Test-Path -LiteralPath $changesPath) {
        foreach ($brief in Get-ChildItem -LiteralPath $changesPath -Filter '*.md' -File) { $files += "$folder/changes/$($brief.Name)" }
    }
}
$files = @($files | Sort-Object -Unique)
$localLinks = 0
function Get-HeadingAnchors([string]$body) {
    $body = [regex]::Replace($body, '(?ms)^```[^\r\n]*\r?\n.*?^```[^\r\n]*', '')
    $seen = @{}
    foreach ($heading in [regex]::Matches($body, '(?m)^#{1,6}\s+(.+?)\s*#*\s*$')) {
        $slug = $heading.Groups[1].Value.ToLowerInvariant()
        $slug = [regex]::Replace($slug, '[^\p{L}\p{N}\p{M}_\- ]', '') -replace ' ', '-'
        if ($seen.ContainsKey($slug)) { $seen[$slug]++; "$slug-$($seen[$slug])" } else { $seen[$slug] = 0; $slug }
    }
}
foreach ($file in $files) {
    $path = Join-Path $repoRoot $file
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { $failures.Add("Missing file: $file"); continue }
    if (-not $file.EndsWith('.md')) { continue }
    $body = [IO.File]::ReadAllText($path)
    $body = [regex]::Replace($body, '(?ms)^```[^\r\n]*\r?\n.*?^```[^\r\n]*', '')
    foreach ($match in [regex]::Matches($body, '\]\(([^)]+)\)')) {
        $link = $match.Groups[1].Value.Trim('<','>')
        if ($link -match '^[a-zA-Z][a-zA-Z0-9+.-]*:') { continue }
        $parts = $link.Split('#',2)
        $target = if ($parts[0]) { [IO.Path]::GetFullPath((Join-Path (Split-Path $path) ([Uri]::UnescapeDataString($parts[0])))) } else { $path }
        $localLinks++
        if (-not (Test-Path -LiteralPath $target)) { $failures.Add("Broken link in ${file}: $link"); continue }
        if ($parts.Count -eq 2 -and $parts[1] -and $target.EndsWith('.md')) {
            $anchors = @(Get-HeadingAnchors ([IO.File]::ReadAllText($target)))
            if ([Uri]::UnescapeDataString($parts[1]) -notin $anchors) { $failures.Add("Missing heading in ${file}: $link") }
        }
    }
}
foreach ($folder in $folders) {
    $guidePath = Join-Path $repoRoot "$folder/README.md"
    if (-not (Test-Path -LiteralPath $guidePath)) { continue }
    $guide = [IO.File]::ReadAllText($guidePath)
    foreach ($label in @('Founder working guide','Central folder ownership register','Working scope:','Current sources:','Dependencies and review:','Complete when:','changes/README.md')) {
        if (-not $guide.Contains($label)) { $failures.Add("Incomplete guide ${folder}: $label") }
    }
}
$roles = [IO.File]::ReadAllText((Join-Path $repoRoot '01-company/founders-and-roles/ROLE-REGISTER.md'))
if ($roles -notmatch '\| Shared integration and merge coordination \| Janith \|') { $failures.Add('Janith merge coordination not recorded') }
foreach ($folder in $folders) { if ($roles -notmatch ('\| ' + [regex]::Escape($folder) + ' \|')) { $failures.Add("Missing assignment row: $folder") } }
$pendingOwners = ([regex]::Matches($roles, '\| 0[1-7]-[^|]+\| To assign \|')).Count
$pointer = [IO.File]::ReadAllText((Join-Path $repoRoot '06-marketing/website-copy/see-where-heutrix-can-help-and-sales-process.md'))
if (-not $pointer.Contains('../../03-sales/fit-call/SALES-PROCESS-SPECIFICATION.md') -or $pointer.Length -gt 2000) { $failures.Add('Former Marketing source is not a concise Sales pointer') }
if ($failures.Count) { $failures | ForEach-Object { Write-Output "FAIL: $_" }; throw "$($failures.Count) collaboration check(s) failed" }
Write-Output "PASS: $($folders.Count) workstream guides and indexes; $($files.Count) required files; $localLinks local links and referenced Markdown headings."
Write-Output "Assignments: Janith coordinates merges; $pendingOwners of 7 folder owners remain To assign."
Write-Output 'Scope: local structure only. Remote activation, review evidence and founder pilot are separate rollout checks.'
