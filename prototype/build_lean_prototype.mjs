/**
 * Tourism Signal Radar — lean manual prototype builder.
 *
 * Produces a 5-sheet Excel workbook for the ~2-week Phase-0 validation test
 * (see ../VALIDATION.md). Self-contained: `npm install && npm run build`.
 *
 * Sheets: Radar (guide + triage queue) · Signals · Sources · Evidence Links · Projects.
 * Deliberately trimmed from the old 12-sheet instrument — no Field Audit,
 * Daily Sessions, Review Log, Gate Status or Rubrics sheets. The rubric and
 * priority gates live compactly on the Radar sheet so the reference travels
 * with the tool without a separate sheet.
 */
import ExcelJS from "exceljs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.join(__dirname, "output", "tourism_signal_radar_lean_prototype.xlsx");
const MAXROWS = 300; // rows that get dropdown validation

/* ---------- controlled vocabularies (mirror docs/p0-schema.md) ---------- */
const V = {
  PRIORITY: ["P1", "P2", "P3"],
  QUALITY: ["HIGH", "MEDIUM", "LOW"],
  DISPOSITION: ["UNDECIDED", "MONITOR", "TEST", "ADOPT", "DISMISS"],
  STATUS: ["OPEN", "CLOSED"],
  CLOSURE: ["RESOLVED", "DISMISSED", "SUPERSEDED", "NO_LONGER_RELEVANT"],
  SOURCE_TYPE: ["SCIENTIFIC_STUDY", "OFFICIAL_ANNOUNCEMENT", "POLICY_OR_REGULATION", "DATASET_OR_DOCUMENTATION", "TECHNICAL_REPORT", "INDUSTRY_REPORT", "JOURNALISM", "EXPERT_COMMENTARY", "OTHER"],
  ORIGIN: ["PRIMARY", "SECONDARY"],
  PEER: ["YES", "NO", "NOT_APPLICABLE"],
  METHOD: ["CLEAR", "PARTIAL", "OPAQUE", "NOT_APPLICABLE"],
  RELATIONSHIP: ["SUPPORTS", "CONTRADICTS", "CONTEXTUALIZES"],
  SCOPE: ["DIRECT", "INDIRECT"],
  CONFIRM: ["DRAFT", "CONFIRMED"],
  EXEC: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
  PROJECT_STATUS: ["ACTIVE", "INACTIVE"],
  USEFUL: ["yes", "no", "n/a"],
  ACTED: ["acted", "scheduled", "rejected", "ignored"],
};

const NAVY = "FF14213D";
const HEADFILL = "FFD9E2F2";
const EXAMPLE = "FFFFF4CC";
const GUIDEFILL = "FFEAF1FB";

const wb = new ExcelJS.Workbook();
wb.creator = "Tourism Signal Radar";
wb.created = new Date();

/* helpers ---------------------------------------------------------------- */
const styleHeaderRow = (ws, rowNumber, cols) => {
  const row = ws.getRow(rowNumber);
  for (let c = 1; c <= cols; c++) {
    const cell = row.getCell(c);
    cell.font = { bold: true, color: { argb: NAVY }, size: 10 };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: HEADFILL } };
    cell.alignment = { vertical: "middle", wrapText: true };
    cell.border = { bottom: { style: "thin", color: { argb: "FFAAB7CC" } } };
  }
  row.height = 30;
};
const listVal = (ws, colIndex, values, fromRow = 2) => {
  for (let r = fromRow; r <= MAXROWS; r++) {
    ws.getCell(r, colIndex).dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: [`"${values.join(",")}"`],
      showErrorMessage: true,
      errorStyle: "warning",
      error: `Use one of: ${values.join(", ")}`,
    };
  }
};
const markExample = (ws, rowNumber, cols) => {
  const row = ws.getRow(rowNumber);
  for (let c = 1; c <= cols; c++) {
    row.getCell(c).fill = { type: "pattern", pattern: "solid", fgColor: { argb: EXAMPLE } };
  }
};

/* ====================================================================== */
/* Sheet 1 — RADAR (guide + morning triage queue)                          */
/* ====================================================================== */
const radar = wb.addWorksheet("Radar", { properties: { tabColor: { argb: NAVY } } });
radar.columns = [
  { width: 16 }, { width: 12 }, { width: 40 }, { width: 12 },
  { width: 14 }, { width: 44 }, { width: 30 }, { width: 10 },
];
const guide = [
  ["TOURISM SIGNAL RADAR — Lean Manual Prototype"],
  ["HOW TO RUN (~2 weeks): use this on your REAL signals as they occur (aim 10–15). One line per signal. Author full records in the Signals sheet; scan here each morning."],
  ["ANSWER AT WEEK 2 — the 3 questions that greenlight or kill the build:"],
  ["  1) Do several sources fold into one Signal, and do some sources feed >1 Signal — or does it collapse to one-note-per-article (RSS)?  If RSS → KILL."],
  ["  2) Is THE MOVE more useful than a 'why it matters' line — does it change/confirm what you actually do?  If generic → KILL."],
  ["  3) Could a Notion/notes template do this with less friction?  If yes → ship a template, not software."],
  ["EVIDENCE QUALITY (set by you, with a rationale — never a number):"],
  ["  HIGH: competent primary source directly establishes the claim, inspectable, corroborated OR a directly verifiable event, no live contradiction."],
  ["  MEDIUM: plausible & decision-relevant but one material limitation (single chain, indirect scope, partial method, mixed findings, aging evidence)."],
  ["  LOW: only commentary/unattributed, materially indirect, opaque method, unresolved credible contradiction, or too stale."],
  ["PRIORITY (review order only — not importance):"],
  ["  P1 decide/contain now · P2 review & monitor · P3 keep as context.  Force at least once: a multi-source signal, a contradiction, and a signal with NO move."],
  ["MORNING TRIAGE QUEUE  (sort by Priority; open the full record in the Signals sheet)"],
];
guide.forEach((line, i) => {
  const r = i + 1;
  radar.mergeCells(r, 1, r, 8);
  const cell = radar.getCell(r, 1);
  cell.value = line[0];
  cell.alignment = { vertical: "middle", wrapText: true };
  if (i === 0) {
    cell.font = { bold: true, size: 16, color: { argb: "FFFFFFFF" } };
    radar.getRow(r).fill = { type: "pattern", pattern: "solid", fgColor: { argb: NAVY } };
    radar.getRow(r).height = 26;
  } else {
    cell.font = { size: 10, color: { argb: "FF172033" }, bold: /^[A-Z0-9 ]+:/.test(line[0]) || i === 12 };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GUIDEFILL } };
    radar.getRow(r).height = line[0].length > 90 ? 26 : 16;
  }
});
const rHead = guide.length + 1; // triage header row
const radarCols = ["Signal ID", "Priority", "Title", "Evidence", "Disposition", "THE MOVE", "Review trigger", "Status"];
radar.getRow(rHead).values = radarCols;
styleHeaderRow(radar, rHead, radarCols.length);
radar.views = [{ state: "frozen", ySplit: rHead }];
// example triage rows
radar.getRow(rHead + 1).values = ["sig_alphaearth", "P1", "AlphaEarth embeddings testable for destination monitoring", "HIGH", "TEST", "Compare AlphaEarth vs current NDVI on 2 sites before changing pipeline", "When 2-site comparison + cost estimate done", "OPEN"];
radar.getRow(rHead + 2).values = ["sig_heat_capacity", "P2", "Heat thresholds entering urban visitor-capacity decisions", "MEDIUM", "MONITOR", "Watch for a 3rd independent destination adopting heat limits", "Next guidance release", "OPEN"];
markExample(radar, rHead + 1, 8);
markExample(radar, rHead + 2, 8);
listVal(radar, 2, V.PRIORITY, rHead + 1);
listVal(radar, 4, V.QUALITY, rHead + 1);
listVal(radar, 5, V.DISPOSITION, rHead + 1);
listVal(radar, 8, V.STATUS, rHead + 1);

/* ====================================================================== */
/* Sheet 2 — SIGNALS (full record; lean log folded in)                     */
/* ====================================================================== */
const signals = wb.addWorksheet("Signals");
const sigCols = [
  ["Signal ID", 16], ["Title", 34], ["Claim (2–4 sentences)", 46], ["Domain", 16],
  ["Detected", 12], ["As-of date", 12], ["Evidence quality", 14], ["Evidence rationale", 40],
  ["Priority (rule)", 12], ["Priority (effective)", 14], ["Override reason", 26],
  ["Why it matters (optional)", 30], ["Uncertainties (optional)", 30],
  ["Project(s)", 18], ["Relevance reason", 34],
  ["Disposition", 14], ["Status", 10], ["Closure reason", 18], ["Superseded by", 14],
  ["MOVE: text", 40], ["MOVE: rationale", 34], ["MOVE: basis as-of", 14],
  ["MOVE: review trigger", 30], ["MOVE: confirmation", 14], ["MOVE: execution", 16],
  ["MOVE: due", 12], ["MOVE: outcome", 30],
  ["LOG: move useful?", 14], ["LOG: acted?", 12],
];
signals.columns = sigCols.map(([header, width]) => ({ header, width }));
styleHeaderRow(signals, 1, sigCols.length);
signals.views = [{ state: "frozen", xSplit: 2, ySplit: 1 }];
// dropdowns
listVal(signals, 7, V.QUALITY);
listVal(signals, 9, V.PRIORITY);
listVal(signals, 10, V.PRIORITY);
listVal(signals, 16, V.DISPOSITION);
listVal(signals, 17, V.STATUS);
listVal(signals, 18, V.CLOSURE);
listVal(signals, 24, V.CONFIRM);
listVal(signals, 25, V.EXEC);
listVal(signals, 28, V.USEFUL);
listVal(signals, 29, V.ACTED);
// seeded examples (multi-source signal + contradiction signal)
signals.addRow({});
signals.getRow(2).values = [
  "sig_alphaearth", "AlphaEarth embeddings testable for destination monitoring",
  "AlphaEarth satellite embeddings are now accessible via Earth Engine. Availability lowers the access barrier, but no reviewed evidence yet shows they improve this project's visitor-pressure indicators.",
  "REMOTE_SENSING", "2026-08-18", "2026-08-20", "HIGH",
  "Official availability is confirmed (verifiable event); fitness for the tourism use is unvalidated.",
  "P1", "P1", "",
  "", "Incremental value over current NDVI anomaly indicators",
  "proj_tfm", "May change the remote-sensing inputs used for anomaly monitoring.",
  "TEST", "OPEN", "", "",
  "Compare AlphaEarth and the current NDVI indicator on two known sites before changing the monitoring pipeline.",
  "A bounded parity test resolves the project-specific uncertainty without committing to integration.",
  "2026-08-20", "When the two-site comparison and cost estimate are complete.", "CONFIRMED", "NOT_STARTED", "", "",
  "", "",
];
signals.getRow(3).values = [
  "sig_heat_capacity", "Heat thresholds entering urban visitor-capacity decisions",
  "Two destination guidance documents now include heat exposure in operational visitor limits. A local observational study reports weaker behavioural response, so generalisation beyond those destinations is uncertain.",
  "CLIMATE", "2026-08-15", "2026-08-19", "MEDIUM",
  "Direct policy evidence supports two contexts; empirical tourism effects are mixed and not broadly corroborated.",
  "P2", "P2", "",
  "", "Whether heat limits transfer to this destination's profile",
  "proj_tfm", "Could change assumed visitor-capacity thresholds under heat.",
  "MONITOR", "OPEN", "", "",
  "", "", "", "Watch for a third independent destination adopting heat limits.", "DRAFT", "NOT_STARTED", "", "",
  "", "",
];
markExample(signals, 2, sigCols.length);
markExample(signals, 3, sigCols.length);

/* ====================================================================== */
/* Sheet 3 — SOURCES                                                       */
/* ====================================================================== */
const sources = wb.addWorksheet("Sources");
const srcCols = [
  ["Source ID", 18], ["Title", 40], ["Type", 24], ["Publisher", 24],
  ["Publication date", 14], ["Locator (URL/DOI/id)", 34], ["Origin", 12],
  ["Peer review", 14], ["Method transparency", 18], ["Notes (bibliographic only)", 30],
];
sources.columns = srcCols.map(([header, width]) => ({ header, width }));
styleHeaderRow(sources, 1, srcCols.length);
sources.views = [{ state: "frozen", ySplit: 1 }];
listVal(sources, 3, V.SOURCE_TYPE);
listVal(sources, 7, V.ORIGIN);
listVal(sources, 8, V.PEER);
listVal(sources, 9, V.METHOD);
sources.getRow(2).values = ["src_gee", "AlphaEarth Foundations in Google Earth Engine", "OFFICIAL_ANNOUNCEMENT", "Google Earth Engine", "2026-08-17", "https://example.invalid/announcement", "PRIMARY", "NOT_APPLICABLE", "PARTIAL", "Confirms availability, not fitness."];
sources.getRow(3).values = ["src_ndvi_study", "NDVI anomaly detection for visitor pressure", "SCIENTIFIC_STUDY", "Journal of Sustainable Tourism", "2025-11-02", "https://example.invalid/ndvi", "PRIMARY", "YES", "CLEAR", "Baseline method context."];
sources.getRow(4).values = ["src_local_report", "Local visits fell less than heat guidance predicted", "JOURNALISM", "Regional outlet", "2026-07-30", "https://example.invalid/local", "SECONDARY", "NOT_APPLICABLE", "OPAQUE", "Single-site observation."];
[2, 3, 4].forEach((r) => markExample(sources, r, srcCols.length));

/* ====================================================================== */
/* Sheet 4 — EVIDENCE LINKS (the many-to-many join = the product)          */
/* ====================================================================== */
const links = wb.addWorksheet("Evidence Links");
const linkCols = [
  ["Signal ID", 18], ["Source ID", 18], ["Relationship", 16], ["Scope match", 14],
  ["Evidence note (REQUIRED for CONTRADICTS)", 50],
];
links.columns = linkCols.map(([header, width]) => ({ header, width }));
styleHeaderRow(links, 1, linkCols.length);
links.views = [{ state: "frozen", ySplit: 1 }];
links.getCell("C1").note = "SUPPORTS / CONTRADICTS / CONTEXTUALIZES. CONTEXTUALIZES never counts as support. Repeated syndication of one primary source is ONE chain, not corroboration.";
listVal(links, 3, V.RELATIONSHIP);
listVal(links, 4, V.SCOPE);
links.getRow(2).values = ["sig_alphaearth", "src_gee", "SUPPORTS", "DIRECT", "Confirms service availability, not fitness for the project's indicators."];
links.getRow(3).values = ["sig_alphaearth", "src_ndvi_study", "CONTEXTUALIZES", "INDIRECT", "Provides the current-baseline method the parity test compares against."];
links.getRow(4).values = ["sig_heat_capacity", "src_local_report", "CONTRADICTS", "INDIRECT", "Observed visits declined less than the guidance assumptions predict."];
[2, 3, 4].forEach((r) => markExample(links, r, linkCols.length));

/* ====================================================================== */
/* Sheet 5 — PROJECTS                                                      */
/* ====================================================================== */
const projects = wb.addWorksheet("Projects");
const projCols = [
  ["Project ID", 16], ["Name", 30], ["Description", 50], ["Status", 12], ["Decision questions", 44],
];
projects.columns = projCols.map(([header, width]) => ({ header, width }));
styleHeaderRow(projects, 1, projCols.length);
projects.views = [{ state: "frozen", ySplit: 1 }];
listVal(projects, 4, V.PROJECT_STATUS);
projects.getRow(2).values = ["proj_tfm", "TFM — Visitor pressure monitoring", "Master's thesis work on monitoring visitor pressure at protected sites using remote-sensing indicators.", "ACTIVE", "Which remote-sensing indicator best flags anomalous visitor pressure? When do heat limits change capacity?"];
markExample(projects, 2, projCols.length);

/* ---------- wrap-text on long body columns ---------- */
for (const ws of [signals, sources, links, projects]) {
  ws.eachRow((row, n) => {
    if (n === 1) return;
    row.alignment = { vertical: "top", wrapText: true };
  });
}

await wb.xlsx.writeFile(outFile);
console.log(`Wrote ${outFile}`);
console.log(`Sheets: ${wb.worksheets.map((w) => w.name).join(" · ")}`);
