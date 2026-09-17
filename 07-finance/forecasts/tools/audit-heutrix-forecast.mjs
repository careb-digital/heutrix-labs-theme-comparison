import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const here = path.dirname(fileURLToPath(import.meta.url));
const workbookPath = path.resolve(here, "../analysis-output/Heutrix-Labs-3-Year-Growth-Forecast.xlsx");
const blob = await FileBlob.load(workbookPath);
const wb = await SpreadsheetFile.importXlsx(blob);

const ranges = [
  ["Forecast", "A24:D39"],
  ["Base Quarterly", "A5:M12"],
  ["Pricing Gap", "A14:F18"],
  ["Market Evidence", "A17:H23"],
  ["Checks", "A3:G15"],
];

for (const [sheetId, range] of ranges) {
  const result = await wb.inspect({ kind: "table", sheetId, range, include: "values,formulas", tableMaxRows: 30, tableMaxCols: 14, maxChars: 12000 });
  console.log(`AUDIT ${sheetId}!${range}`);
  console.log(result.ndjson);
}

const sheetList = await wb.inspect({ kind: "sheet", include: "id,name", maxChars: 4000 });
console.log("SHEETS");
console.log(sheetList.ndjson);
