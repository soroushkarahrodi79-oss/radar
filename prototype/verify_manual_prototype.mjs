import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workbookPath = "C:/workspace/RADAR/outputs/01a0263b-0738-7ad3-8a4a-470722d14cdc/tourism_signal_radar_manual_prototype.xlsx";
const input = await FileBlob.load(workbookPath);
const wb = await SpreadsheetFile.importXlsx(input);

for (const spec of [
  { kind: "table", range: "Signals!AC1:AD6", include: "values,formulas", tableMaxRows: 8, tableMaxCols: 4, maxChars: 5000 },
  { kind: "table", range: "Project Links!E1:F6", include: "values,formulas", tableMaxRows: 8, tableMaxCols: 4, maxChars: 5000 },
  { kind: "table", range: "Gate Status!A14:F25", include: "values,formulas", tableMaxRows: 20, tableMaxCols: 8, maxChars: 12000 },
  { kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "final formula error scan" },
]) {
  console.log((await wb.inspect(spec)).ndjson);
}
