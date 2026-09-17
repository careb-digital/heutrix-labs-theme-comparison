$ErrorActionPreference = 'Stop'
$packPath = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../05-legal-privacy-risk/legal-masters/client-legal-pack-v2-2-review'))
$wordApp = New-Object -ComObject Word.Application
$wordApp.Visible = $false
$wordApp.DisplayAlerts = 0
$wordApp.AutomationSecurity = 3
try {
    foreach ($file in Get-ChildItem -LiteralPath (Join-Path $packPath 'Word') -Filter '*.docx') {
        if ($file.Name.StartsWith('._') -or $file.Name.StartsWith('~$')) { continue }
        $doc = $wordApp.Documents.Open($file.FullName, $false, $true, $false)
        try {
            $targetPdf = Join-Path $packPath ('PDF/' + $file.BaseName + '.pdf')
            $doc.ExportAsFixedFormat($targetPdf, 17)
            Write-Output $file.Name
        } finally { $doc.Close(0) }
    }
} finally { $wordApp.Quit(); [void][Runtime.InteropServices.Marshal]::ReleaseComObject($wordApp) }
