$ErrorActionPreference='Stop'
$excelApp=New-Object -ComObject Excel.Application
$excelApp.Visible=$false
$excelApp.DisplayAlerts=$false
$excelApp.AutomationSecurity=3
try {
    foreach($spec in (Get-Content (Join-Path $PSScriptRoot 'workbooks.json') -Raw | ConvertFrom-Json)) {
        $filename=[IO.Path]::GetFileName($spec.output)
        $file=Join-Path $PSScriptRoot $filename
        $book=$excelApp.Workbooks.Open($file,0,$true)
        try {
            $sheet=$book.Worksheets.Item(1)
            $sheet.PageSetup.PrintArea='$A$1:$L$18'
            $sheet.PageSetup.Orientation=2
            $sheet.PageSetup.Zoom=$false
            $sheet.PageSetup.FitToPagesWide=1
            $sheet.PageSetup.FitToPagesTall=1
            $sheet.ExportAsFixedFormat(0,(Join-Path $PSScriptRoot ($filename+'.pdf')))
            Write-Output ($filename+': shapes='+$sheet.Shapes.Count)
        } finally {$book.Close($false)}
    }
} finally {$excelApp.Quit();[void][Runtime.InteropServices.Marshal]::ReleaseComObject($excelApp)}
