import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "C:/workspace/RADAR/prototype/output";
const previewDir = "C:/workspace/RADAR/prototype/previews";
await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const wb = Workbook.create();
const readme = wb.worksheets.add("README");
const gate = wb.worksheets.add("Gate Status");
const radar = wb.worksheets.add("Radar");
const signalsSheet = wb.worksheets.add("Signals");
const sourcesSheet = wb.worksheets.add("Sources");
const evidenceSheet = wb.worksheets.add("Evidence Links");
const projectsSheet = wb.worksheets.add("Projects");
const projectLinksSheet = wb.worksheets.add("Project Links");
const sessionsSheet = wb.worksheets.add("Daily Sessions");
const reviewSheet = wb.worksheets.add("Review Log");
const fieldSheet = wb.worksheets.add("Field Audit");
const rubricsSheet = wb.worksheets.add("Rubrics");

const colors = {
  ink: "#172033",
  navy: "#14213D",
  blue: "#2F6BFF",
  teal: "#147D73",
  tealLight: "#E7F5F2",
  amber: "#A56600",
  amberLight: "#FFF4CC",
  red: "#B42318",
  redLight: "#FDECEA",
  green: "#217A4A",
  greenLight: "#E8F5EC",
  gray900: "#2B3445",
  gray600: "#667085",
  gray400: "#98A2B3",
  gray200: "#D9DEE7",
  gray100: "#F4F6F8",
  white: "#FFFFFF",
};

const date = (iso) => new Date(`${iso}T00:00:00Z`);
const styleTitle = (range) => {
  range.format = {
    fill: colors.navy,
    font: { bold: true, color: colors.white, size: 18 },
    verticalAlignment: "center",
  };
};
const styleHeader = (range) => {
  range.format = {
    fill: "#D9E2F2",
    font: { bold: true, color: colors.navy, size: 10 },
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "inside", style: "thin", color: "#AAB7CC" },
  };
};
const styleSection = (range) => {
  range.format = {
    fill: "#E8ECF4",
    font: { bold: true, color: colors.navy, size: 11 },
    verticalAlignment: "center",
  };
};
const styleInput = (range) => {
  range.format.fill = colors.amberLight;
  range.format.font = { color: colors.ink };
};
const addStatusFormatting = (range) => {
  range.conditionalFormats.add("containsText", { text: "PASS", format: { fill: colors.greenLight, font: { color: colors.green, bold: true } } });
  range.conditionalFormats.add("containsText", { text: "FAIL", format: { fill: colors.redLight, font: { color: colors.red, bold: true } } });
  range.conditionalFormats.add("containsText", { text: "PENDING", format: { fill: colors.amberLight, font: { color: colors.amber, bold: true } } });
  range.conditionalFormats.add("containsText", { text: "VALIDATE", format: { fill: colors.amberLight, font: { color: colors.amber, bold: true } } });
};

const sources = [
  ["SRC001", "AlphaEarth Foundations helps map our planet in unprecedented detail", "OFFICIAL_ANNOUNCEMENT", "Google DeepMind", date("2025-07-30"), "https://deepmind.google/blog/alphaearth-foundations-helps-map-our-planet-in-unprecedented-detail/", "PRIMARY", "NO", "PARTIAL", "Confirms model and Earth Engine dataset release; does not establish tourism use performance."],
  ["SRC002", "AlphaEarth Foundations GCS data", "DATASET_OR_DOCUMENTATION", "Google Earth Engine", date("2026-07-01"), "https://developers.google.com/earth-engine/guides/aef_on_gcs_readme", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "July 2026 month precision. Documents annual embeddings for 2017–2025 and provider-pays GCS access."],
  ["SRC003", "Guidelines on transparency obligations for providers and deployers of AI systems", "POLICY_OR_REGULATION", "European Commission", date("2026-07-20"), "https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "Article 50 transparency obligations apply from 2 August 2026."],
  ["SRC004", "Commission starts enforcing AI Act rules and new transparency requirements on 2 August", "OFFICIAL_ANNOUNCEMENT", "European Commission", date("2026-07-31"), "https://digital-strategy.ec.europa.eu/en/news/commission-starts-enforcing-ai-act-rules-and-new-transparency-requirements-2-august", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "Confirms enforcement start and labeling duties for certain AI interactions/content."],
  ["SRC005", "New rules bring increased transparency to the short-term rentals sector", "OFFICIAL_ANNOUNCEMENT", "European Commission", date("2026-05-20"), "https://single-market-economy.ec.europa.eu/news/new-rules-bring-increased-transparency-short-term-rentals-sector-2026-05-20_en", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "Explains registration numbers, platform verification, monthly data and Single Digital Entry Points."],
  ["SRC006", "Regulation (EU) 2024/1028 on short-term accommodation rental data", "POLICY_OR_REGULATION", "Official Journal of the European Union", date("2024-04-11"), "https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401028", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "Legal text; application began 20 May 2026."],
  ["SRC007", "Booking must now comply with the Digital Markets Act", "OFFICIAL_ANNOUNCEMENT", "European Commission", date("2024-11-14"), "https://digital-strategy.ec.europa.eu/en/news/booking-must-now-comply-digital-markets-act", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "Confirms parity-clause prohibition and business-user data access rights."],
  ["SRC008", "Booking Holdings Digital Markets Act compliance report", "TECHNICAL_REPORT", "Booking Holdings", date("2024-11-14"), "https://www.bookingholdings.com/wp-content/uploads/2024/11/DMA-Compliance-Report.pdf", "PRIMARY", "NO", "PARTIAL", "Self-reported compliance; direct for measures claimed, not independent evidence of outcomes."],
  ["SRC009", "Draft European Parliament resolution on DMA implementation", "POLICY_OR_REGULATION", "European Parliament IMCO Committee", date("2026-03-23"), "https://www.europarl.europa.eu/meetdocs/2024_2029/plmrep/COMMITTEES/IMCO/DV/2026/03-23/9-DraftDMAresolution_EN.pdf", "PRIMARY", "NO", "PARTIAL", "Draft scrutiny material; raises concern about measures equivalent to prohibited parity clauses."],
  ["SRC010", "How will the Entry/Exit System work?", "DATASET_OR_DOCUMENTATION", "European Union — Travel Europe", date("2026-04-10"), "https://travel-europe.europa.eu/ees/ltr/how-will-ees-work-what-new-during-border-checks.html", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "Living guidance; date records full implementation milestone, not page publication date."],
  ["SRC011", "Commission brings clarity on ReFuelEU Aviation implementation", "OFFICIAL_ANNOUNCEMENT", "European Commission", date("2025-02-28"), "https://transport.ec.europa.eu/news-events/news/commission-brings-clarity-refueleu-aviation-implementation-2025-02-28_en", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "Confirms 2% SAF mandate and implementation guidance."],
  ["SRC012", "New report shows progress in sustainable aviation fuel uptake across the EU", "TECHNICAL_REPORT", "European Commission / EASA", date("2025-10-22"), "https://transport.ec.europa.eu/news-events/news/new-report-shows-progress-sustainable-aviation-fuel-uptake-across-eu-2025-10-22_en", "PRIMARY", "NO", "CLEAR", "Reports supply concentration and early stage of synthetic fuels."],
  ["SRC013", "The EU becomes more accessible for all", "OFFICIAL_ANNOUNCEMENT", "European Commission", date("2025-07-31"), "https://commission.europa.eu/news-and-media/news/eu-becomes-more-accessible-all-2025-07-31_en", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "Summarizes European Accessibility Act coverage after June 2025 application."],
  ["SRC014", "Nature Restoration Regulation", "POLICY_OR_REGULATION", "European Commission", date("2024-08-18"), "https://environment.ec.europa.eu/topics/nature-and-biodiversity/nature-restoration-regulation_en", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "Living policy page; date records entry into force. National plans due September 2026."],
  ["SRC015", "Commission adopts planning tool for the Nature Restoration Regulation", "OFFICIAL_ANNOUNCEMENT", "European Commission", date("2025-05-20"), "https://environment.ec.europa.eu/news/commission-adopts-user-friendly-planning-tool-support-member-states-implementing-nature-restoration-2025-05-20_en", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "Confirms uniform plan format and 1 September 2026 draft submission date."],
  ["SRC016", "European State of the Climate 2025", "SCIENTIFIC_STUDY", "Copernicus Climate Change Service and WMO", date("2026-04-29"), "https://climate.copernicus.eu/esotc/2025", "PRIMARY", "YES", "CLEAR", "Scientific synthesis with open charts/data; documents increasing heat stress."],
  ["SRC017", "European Climate Risk Assessment", "TECHNICAL_REPORT", "European Environment Agency", date("2024-03-11"), "https://www.eea.europa.eu/en/analysis/publications/european-climate-risk-assessment", "PRIMARY", "NO", "CLEAR", "Synthesizes 36 climate risks and identifies southern European tourism exposure."],
  ["SRC018", "Another record year for EU tourism in 2025", "DATASET_OR_DOCUMENTATION", "Eurostat", date("2026-03-04"), "https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260304-1", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "3.1 billion accommodation nights in 2025, up 2.2%. Aggregate data do not resolve local displacement."],
  ["SRC019", "2025 was EU's most destructive wildfire season on record", "TECHNICAL_REPORT", "European Commission Joint Research Centre", date("2026-03-31"), "https://joint-research-centre.ec.europa.eu/jrc-news-and-updates/2025-was-eus-most-destructive-wildfire-season-record-2026-03-31_en", "PRIMARY", "NO", "CLEAR", "EFFIS satellite analysis: 1,079,538 ha burnt in EU; about 39% within Natura 2000."],
  ["SRC020", "Current wildfire situation in Europe", "DATASET_OR_DOCUMENTATION", "European Commission Joint Research Centre", date("2026-07-01"), "https://joint-research-centre.ec.europa.eu/projects-and-activities/natural-and-man-made-hazards/forest-fires/current-wildfire-situation-europe_en", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "2026 year-to-date burnt area below 2025 but fires above the 20-year average."],
  ["SRC021", "European Water Resilience Strategy", "POLICY_OR_REGULATION", "European Commission", date("2025-06-04"), "https://op.europa.eu/en/publication-detail/-/publication/02d416a9-41c2-11f0-b9f2-01aa75ed71a1", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "Sets EU objective to improve water efficiency by at least 10% by 2030."],
  ["SRC022", "Water savings for a water-resilient Europe", "TECHNICAL_REPORT", "European Environment Agency", date("2025-12-02"), "https://www.eea.europa.eu/en/analysis/publications/water-savings-for-a-water-resilient-europe", "PRIMARY", "NO", "CLEAR", "Date follows EEA 2025 briefing release context. Estimates 10–30% tourism water-saving potential with explicit uncertainty."],
  ["SRC023", "Tourism nights booked via platforms hit nearly 1 billion", "DATASET_OR_DOCUMENTATION", "Eurostat", date("2026-04-01"), "https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260401-1", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "951.6 million platform-booked short-stay nights in 2025, up 11.4%."],
  ["SRC024", "EU Data Act gives users control over data from connected devices", "OFFICIAL_ANNOUNCEMENT", "European Commission", date("2025-09-12"), "https://digital-strategy.ec.europa.eu/en/news/eu-data-act-gives-users-control-over-data-connected-devices", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "Confirms application and user access/share rights for connected-product data."],
  ["SRC025", "Guidance on vehicle data accompanying the Data Act", "POLICY_OR_REGULATION", "European Commission", date("2025-09-12"), "https://digital-strategy.ec.europa.eu/en/library/guidance-vehicle-data-accompanying-data-act", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "Vehicle-specific guidance explicitly warns against automatic extrapolation to other industries/public sector."],
  ["SRC026", "Mobile Network Operator data for Official Statistics", "TECHNICAL_REPORT", "Eurostat CROS", date("2024-09-03"), "https://cros.ec.europa.eu/MNOdata4OS", "PRIMARY", "NO", "CLEAR", "Living resource; date anchors latest listed 2024 presentation. States capability plus privacy, access and methodology barriers."],
  ["SRC027", "Conference: Integrating MNO Data into Official Statistics", "EXPERT_COMMENTARY", "Eurostat CROS", date("2025-09-23"), "https://cros.ec.europa.eu/system/files/2025-10/Agenda_Conference%2023-25sept2025_v3.pdf", "PRIMARY", "NO", "CLEAR", "Agenda documents tourism use cases in Spain, Italy and Venice; not outcome evidence."],
  ["SRC028", "One country, multiple portraits: representativeness in GPS-based mobility data is source-specific", "SCIENTIFIC_STUDY", "arXiv preprint", date("2026-06-30"), "https://arxiv.org/abs/2606.23616", "PRIMARY", "NO", "CLEAR", "June 2026 month precision. Preprint warns coverage bias is source-specific and spatially dependent."],
  ["SRC029", "Common European data spaces — rollout status", "DATASET_OR_DOCUMENTATION", "European Commission", date("2026-06-22"), "https://digital-strategy.ec.europa.eu/en/policies/data-spaces", "PRIMARY", "NOT_APPLICABLE", "PARTIAL", "Lists Tourism: DeployTour and DATES; does not demonstrate production-ready APIs or datasets."],
  ["SRC030", "Towards a Common European Tourism Data Space", "POLICY_OR_REGULATION", "European Commission", date("2023-07-20"), "https://single-market-economy.ec.europa.eu/publications/communication-commission-towards-common-european-tourism-data-space_en", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "Sets policy journey and intended capabilities; not operational proof."],
  ["SRC031", "Water scarcity conditions in Europe", "DATASET_OR_DOCUMENTATION", "European Environment Agency", date("2025-12-02"), "https://www.eea.europa.eu/en/analysis/indicators/use-of-freshwater-resources-in-europe-1", "PRIMARY", "NOT_APPLICABLE", "CLEAR", "Seasonal water stress affects southern Europe; tourism is identified as a pressure."],
];

const signals = [
  ["S001", "Remote Sensing", date("2025-07-30"), date("2026-08-21"), "AlphaEarth embeddings are accessible, but tourism-monitoring value is unvalidated", "Google released annual AlphaEarth satellite embeddings in Earth Engine/GCS, with layers covering 2017–2025. Availability is established; incremental value for visitor-pressure or destination indicators is not.", "The access barrier has fallen, but integrating embeddings before a baseline comparison could add opaque complexity without better decisions.", "HIGH", "Direct provider documentation confirms release and coverage; no evidence in the reviewed Sources validates the intended tourism use.", "P1", "Active monitoring projects can run a bounded comparison now; evidence supports testing, not adoption.", "TEST", "OPEN", "Compare AlphaEarth with the current NDVI/anomaly baseline on two known sites before changing the monitoring pipeline.", "Review when accuracy, interpretability and processing-cost results are recorded.", "NOT_STARTED", "Y", null, null, null, null, date("2026-08-24"), null, null, null, null, null, null, ""],
  ["S002", "AI", date("2026-07-20"), date("2026-08-21"), "EU AI transparency duties now apply to tourism-facing AI interactions", "Article 50 AI Act transparency obligations began applying on 2 August 2026, with Commission guidance and enforcement channels now active. Certain AI interactions and generated or altered content must be disclosed or marked.", "Tourism chatbots, itinerary tools and public-information content need a compliance boundary that distinguishes AI output from evidence and human decisions.", "HIGH", "Two direct Commission Sources establish the applicable date and transparency duties; system-specific legal scope still requires case review.", "P1", "The rule is newly enforceable and a bounded product-content audit is possible now.", "TEST", "OPEN", "Audit one tourism chatbot flow and one public-information content flow against Article 50 before releasing AI-assisted features.", "Review when each flow has a documented in-scope/out-of-scope decision and labeling requirement.", "NOT_STARTED", "Y", null, null, null, null, date("2026-08-24"), null, null, null, null, null, null, ""],
  ["S003", "Governance", date("2026-05-20"), date("2026-08-21"), "EU short-term-rental data rules now create a monthly evidence channel", "Regulation (EU) 2024/1028 applies from 20 May 2026 where Member States operate relevant registration/data schemes. It standardizes registration identifiers, platform checks and monthly data delivery through national Single Digital Entry Points.", "Destination managers may gain more systematic supply and nights data, but local availability and implementation remain jurisdiction-specific.", "HIGH", "The legal text and Commission implementation notice directly establish the framework; local operational availability is not established.", "P1", "The data channel can affect current visitor-pressure monitoring and can be verified locally now.", "TEST", "OPEN", "Map the local registration scheme, Single Digital Entry Point and fields available before redesigning short-term-rental indicators.", "Review when one jurisdiction's access path, update cadence and usable fields are verified.", "NOT_STARTED", "Y", null, null, null, null, date("2026-08-24"), null, null, null, null, null, null, ""],
  ["S004", "Tourism Technology", date("2024-11-14"), date("2026-08-21"), "Booking DMA rules create formal direct-channel leverage, but realized benefit remains contested", "Booking.com must permit differentiated direct-channel prices and provide business users access to generated data under the DMA. Booking reports compliance, while 2026 parliamentary scrutiny raises concern about measures with equivalent effects; measurable hotel-level benefit is not established here.", "Local tourism businesses should not assume that a legal entitlement automatically changes price dispersion, data usability or platform dependence.", "MEDIUM", "The legal obligation is direct and credible; implementation outcomes rely on self-report and contested oversight evidence.", "P1", "An active local-business decision is affected and a small market audit can test realized leverage.", "TEST", "OPEN", "Compare direct and Booking.com prices plus available business-user exports for 20 local properties before recommending channel changes.", "Review when the 20-property audit records price gaps, export fields and any access barriers.", "NOT_STARTED", "Y", null, null, null, null, date("2026-08-24"), null, null, null, null, null, null, ""],
  ["S005", "Mobility", date("2026-04-10"), date("2026-08-21"), "The EU Entry/Exit System is fully operational at external borders", "The Entry/Exit System completed progressive implementation on 10 April 2026 for short-stay non-EU travelers at participating European external borders. First entries involve biometric and personal-data capture rather than passport stamping.", "Border-process changes may alter perceived friction and arrival distributions, but no reviewed Source establishes a destination-level tourism effect.", "HIGH", "Official operational guidance directly establishes implementation and process; outcome evidence is absent.", "P2", "Relevant to mobility monitoring, but there is no immediate project decision or verified impact.", "MONITOR", "OPEN", "Track comparable wait-time or traveler-friction evidence at two relevant gateways before changing arrival assumptions.", "Review when a responsible authority publishes comparable post-rollout performance data.", "NOT_STARTED", "Y", null, null, null, null, date("2026-08-24"), null, null, null, null, null, null, ""],
  ["S006", "Mobility", date("2025-02-28"), date("2026-08-21"), "The 2% SAF mandate is operating, while supply remains geographically concentrated", "ReFuelEU Aviation requires a 2% sustainable aviation fuel share from 2025. Early reporting says supply is concentrated in a small group of Member States and synthetic-fuel availability remains immature.", "The policy floor belongs in transport scenarios, but it does not justify a destination-specific fare or emissions assumption without route-level evidence.", "HIGH", "Direct Commission/EASA material establishes the mandate and early supply structure.", "P3", "Credible background constraint with no current review window or bounded project decision.", "MONITOR", "OPEN", "", "Review at the next EASA annual implementation report or when route-level cost data become available.", "NOT_STARTED", "N", null, null, null, null, date("2026-08-24"), null, null, null, null, null, null, ""],
  ["S007", "Accessibility", date("2025-07-31"), date("2026-08-21"), "EU accessibility requirements now cover tourism e-commerce and transport interfaces", "The European Accessibility Act has applied since June 2025 to covered services including e-commerce and public transport information. Tourism booking and information journeys may therefore have enforceable accessibility obligations.", "Accessibility is both a compliance constraint and a visitor-experience requirement; generic WCAG claims may not cover the full service journey.", "HIGH", "A direct Commission Source establishes application and service categories; exact product scope needs legal/product review.", "P1", "A live digital journey can be audited now and non-compliance is costly to defer.", "TEST", "OPEN", "Audit one end-to-end booking journey—including transport information and payment—against applicable EAA requirements.", "Review when blockers, owners and remediation decisions are recorded.", "NOT_STARTED", "Y", null, null, null, null, date("2026-08-24"), null, null, null, null, null, null, ""],
  ["S008", "Protected Areas", date("2025-05-20"), date("2026-08-21"), "The national restoration-plan deadline creates an immediate tourism input window", "EU Member States are expected to submit draft National Restoration Plans by 1 September 2026 under the Nature Restoration Regulation. A uniform planning format is available, making the policy window concrete rather than aspirational.", "Protected-area access, restoration works and visitor management assumptions may be affected before plans harden.", "HIGH", "Regulation and implementation-tool Sources directly establish the plan requirement and deadline.", "P1", "A near-term deadline could close an input opportunity for active protected-area work.", "ADOPT", "OPEN", "Review the relevant draft national plan and log every tourism-access, visitor-management or monitoring implication before 1 September.", "Review when the draft is checked and each material implication is linked to a project decision.", "NOT_STARTED", "Y", null, null, null, null, date("2026-08-24"), null, null, null, null, null, null, ""],
  ["S009", "Climate", date("2026-04-29"), date("2026-08-21"), "Heat stress is intensifying even as aggregate EU tourism nights continue to grow", "The 2025 European climate assessment reports increasing heat-stress days and severe heatwaves, while Eurostat reports record aggregate accommodation nights. Heat is an operational exposure, but aggregate growth does not establish local demand collapse or adaptation success.", "Capacity and mobility models need heat-response evidence at destination/time scale rather than an assumed Europe-wide demand effect.", "HIGH", "Authoritative climate and tourism datasets establish both trends; causal local tourism response remains unresolved.", "P1", "Active heat/capacity decisions are affected and a bounded local comparison is available.", "TEST", "OPEN", "Compare daily UTCI and visitor/mobility counts across two documented heatwave periods before changing capacity thresholds.", "Review when effect direction, lag and data limitations are documented for both periods.", "NOT_STARTED", "Y", null, null, null, null, date("2026-08-24"), null, null, null, null, null, null, ""],
  ["S010", "Wildfire", date("2026-03-31"), date("2026-08-21"), "Record wildfire exposure raises a protected-area capacity question, not an automatic threshold", "EFFIS recorded the EU's largest burnt area in 2025, including substantial Natura 2000 exposure. By 1 July 2026 burnt area was below 2025 but fire counts remained above the 20-year average, so simple year-on-year escalation is not supported.", "Visitor/vehicle capacity should reflect actual restriction and response rules, not burnt-area headlines alone.", "HIGH", "Direct EFFIS/JRC reporting supports the historical record and 2026 comparison; local access effects are unvalidated.", "P1", "Active protected-area decisions are exposed and a bounded restriction-threshold test can be run.", "TEST", "OPEN", "Overlay closures/fire-danger levels with admissible visitor and vehicle thresholds for two protected sites before revising the capacity model.", "Review when the two-site analysis shows whether restrictions change the binding threshold.", "NOT_STARTED", "Y", null, null, null, null, date("2026-08-24"), null, null, null, null, null, null, ""],
  ["S011", "Water", date("2025-06-04"), date("2026-08-21"), "The EU water-efficiency target makes tourism water use an operational benchmark", "The EU Water Resilience Strategy targets at least 10% greater water efficiency by 2030. EEA evidence identifies tourism pressure in water-scarce areas and estimates 10–30% sectoral savings potential, while noting substantial data uncertainty.", "Destinations need measured facility/basin baselines before converting an EU target into visitor or accommodation constraints.", "MEDIUM", "Policy direction and regional pressure are credible; tourism saving ranges are broad and local transferability is uncertain.", "P2", "Relevant and testable, but no immediate deadline or verified project threshold exists.", "TEST", "OPEN", "Run a one-site water audit and compare feasible savings with the 10% policy benchmark before adding a capacity constraint.", "Review when baseline use, seasonal peak and feasible interventions are documented.", "NOT_STARTED", "Y", null, null, null, null, date("2026-08-24"), null, null, null, null, null, null, ""],
  ["S012", "Tourism Data", date("2026-04-01"), date("2026-08-21"), "Platform-booked short stays grew far faster than total accommodation nights in 2025", "Eurostat reports platform-booked short-stay nights up 11.4% in 2025, versus 2.2% growth in total tourist-accommodation nights. Different scopes prevent direct subtraction, but the divergence is large enough to test locally.", "Aggregate totals may understate the speed and spatial concentration of platform-mediated visitor pressure.", "HIGH", "Two transparent Eurostat series directly establish their respective growth rates; matched local comparability remains to be tested.", "P1", "The divergence can change active visitor-pressure indicators and a local comparison is available.", "TEST", "OPEN", "Calculate the local platform-versus-total nights growth using matched geography and definitions before changing pressure indicators.", "Review when scope differences, coverage and local growth rates are reconciled.", "NOT_STARTED", "Y", null, null, null, null, date("2026-08-24"), null, null, null, null, null, null, ""],
  ["S013", "Mobility Data", date("2025-09-12"), date("2026-08-21"), "The Data Act opens connected-vehicle data access, not automatic destination access", "The EU Data Act now gives users access/share rights for raw data from connected products, and the Commission has vehicle-specific guidance. Those rights depend on user/data-holder roles and do not automatically grant destinations access to fleet mobility data.", "A legal opening may support new mobility indicators, but governance and availability must be proven before architecture changes.", "MEDIUM", "Direct legal guidance supports access rights; public-sector destination transferability is explicitly limited.", "P2", "Potentially relevant with a bounded data-holder inquiry, but no immediate decision window.", "TEST", "OPEN", "Ask one fleet or vehicle data holder for the exact available fields, user rights and lawful sharing path before designing an indicator.", "Review when a sample schema, access decision and legal basis are documented.", "NOT_STARTED", "Y", null, null, null, null, date("2026-08-24"), null, null, null, null, null, null, ""],
  ["S014", "Tourism Data", date("2025-09-23"), date("2026-08-21"), "MNO mobility data is promising but not decision-grade without bias validation", "European statistical bodies document tourism use cases for mobile-network data, but also unresolved privacy, access and methodological barriers. Recent mobility-data research shows coverage bias can vary by source and place.", "Visitor-pressure decisions could become precise-looking but systematically biased if representativeness is not tested against ground truth.", "MEDIUM", "Official use cases support feasibility; methodological guidance and a recent unreviewed preprint challenge unqualified representativeness.", "P1", "An active visitor-pressure decision is affected and a small validation can prevent false precision.", "TEST", "OPEN", "Benchmark one MNO-derived series against counters or official counts across resident-heavy and visitor-heavy zones before using it operationally.", "Review when bias by zone/time and missing-population limitations are quantified.", "NOT_STARTED", "Y", null, null, null, null, date("2026-08-24"), null, null, null, null, null, null, ""],
  ["S015", "Data Governance", date("2026-06-22"), date("2026-08-21"), "Tourism data-space rollout remains an integration watch, not a production dependency", "The Commission continues to list DeployTour and the earlier DATES action under the tourism data-space rollout. The reviewed material describes policy intent and named initiatives but does not establish a stable API catalogue, governance contract or production dataset for this user's projects.", "Designing around a data space before verifying usable assets risks architecture for hypothetical availability.", "MEDIUM", "Official policy Sources establish the initiative; operational readiness is not evidenced.", "P3", "Worth monitoring, but no verified asset or current project decision justifies work now.", "MONITOR", "OPEN", "", "Review when DeployTour publishes an accessible catalogue, governance terms and at least two project-relevant datasets.", "NOT_STARTED", "N", null, null, null, null, date("2026-08-24"), null, null, null, null, null, null, ""],
];

const evidenceLinks = [
  ["S001", "SRC001", "SUPPORTS", "DIRECT", "Confirms model and Earth Engine release; not tourism performance."],
  ["S001", "SRC002", "SUPPORTS", "DIRECT", "Confirms annual coverage, format and access conditions."],
  ["S002", "SRC003", "SUPPORTS", "DIRECT", "Defines Article 50 scope and 2 August 2026 application."],
  ["S002", "SRC004", "SUPPORTS", "DIRECT", "Confirms enforcement start and disclosure examples."],
  ["S003", "SRC005", "SUPPORTS", "DIRECT", "Explains operational data-sharing framework."],
  ["S003", "SRC006", "SUPPORTS", "DIRECT", "Primary legal basis and conditions."],
  ["S004", "SRC007", "SUPPORTS", "DIRECT", "Establishes formal parity and data-access obligations."],
  ["S004", "SRC008", "SUPPORTS", "DIRECT", "Reports measures taken, but is self-reported."],
  ["S004", "SRC009", "CONTRADICTS", "INDIRECT", "Challenges an inference of complete realized benefit by raising equivalent-effect/circumvention concerns; draft status limits weight."],
  ["S005", "SRC010", "SUPPORTS", "DIRECT", "Official implementation and process guidance."],
  ["S006", "SRC011", "SUPPORTS", "DIRECT", "Confirms mandate and implementation."],
  ["S006", "SRC012", "CONTEXTUALIZES", "DIRECT", "Bounds readiness through supply concentration and immature eSAF."],
  ["S007", "SRC013", "SUPPORTS", "DIRECT", "Confirms service categories and application."],
  ["S008", "SRC014", "SUPPORTS", "DIRECT", "Establishes regulation and plan requirement."],
  ["S008", "SRC015", "SUPPORTS", "DIRECT", "Confirms format and 1 September 2026 deadline."],
  ["S009", "SRC016", "SUPPORTS", "DIRECT", "Establishes increasing heat-stress exposure."],
  ["S009", "SRC017", "SUPPORTS", "DIRECT", "Establishes southern-European tourism risk context."],
  ["S009", "SRC018", "CONTRADICTS", "INDIRECT", "Contradicts a broad inference that heat has already reduced aggregate EU nights; cannot resolve local substitution."],
  ["S010", "SRC019", "SUPPORTS", "DIRECT", "Establishes 2025 record and Natura 2000 exposure."],
  ["S010", "SRC020", "CONTRADICTS", "DIRECT", "Challenges a simple continued-record narrative: 2026 YTD is below 2025 though fire counts remain above average."],
  ["S011", "SRC021", "SUPPORTS", "DIRECT", "Establishes EU-wide 10% efficiency objective."],
  ["S011", "SRC022", "SUPPORTS", "DIRECT", "Provides tourism saving range and explicit uncertainty."],
  ["S011", "SRC031", "CONTEXTUALIZES", "DIRECT", "Places tourism pressure within seasonal southern-European scarcity."],
  ["S012", "SRC023", "SUPPORTS", "DIRECT", "Establishes platform nights and 11.4% growth."],
  ["S012", "SRC018", "SUPPORTS", "DIRECT", "Establishes total nights and 2.2% growth for comparison."],
  ["S013", "SRC024", "SUPPORTS", "DIRECT", "Establishes connected-product access/share rights."],
  ["S013", "SRC025", "CONTEXTUALIZES", "DIRECT", "Vehicle guidance states limits on extrapolation to other sectors/public bodies."],
  ["S014", "SRC026", "SUPPORTS", "DIRECT", "Documents capability plus privacy, access and methodology barriers."],
  ["S014", "SRC027", "SUPPORTS", "INDIRECT", "Documents current tourism applications, not their decision accuracy."],
  ["S014", "SRC028", "CONTRADICTS", "INDIRECT", "Challenges unqualified representativeness; preprint and GPS data are adjacent rather than identical to MNO data."],
  ["S015", "SRC029", "SUPPORTS", "DIRECT", "Establishes current named initiatives without production detail."],
  ["S015", "SRC030", "CONTEXTUALIZES", "DIRECT", "Policy intent is evidence of direction, not operational readiness."],
];

const projects = [
  ["P001", "TFM", "Research on tourism carrying capacity, visitor pressure and defensible threshold design.", "Which external changes should alter visitor or vehicle capacity assumptions?", "Visitor Management; Protected Areas; Climate; Tourism Data", "ACTIVE"],
  ["P002", "SNTO", "Smart tourism observatory prototype for traceable destination intelligence.", "Which data or governance changes improve reliable destination monitoring?", "Tourism Data; AI; Remote Sensing; Governance", "ACTIVE"],
  ["P003", "HATI", "Heat adaptation and tourism intelligence research context.", "When should heat, wildfire or water constraints alter tourism operations?", "Climate; Wildfire; Water; Protected Areas", "ACTIVE"],
  ["P004", "LocalFlow", "Local tourism-business, accessibility and mobility decision context.", "Which platform, border or mobility changes affect local operators and visitor journeys?", "Tourism Technology; Mobility; Accessibility; Governance", "ACTIVE"],
];

const projectLinks = [
  ["S001", "P001", "May change remote-sensing inputs used in capacity monitoring.", "Requires parity testing before method change.", "HIGH", "YES"],
  ["S001", "P002", "Adds a candidate destination-monitoring feature set.", "Could simplify multi-sensor inputs if validated.", "NORMAL", "YES"],
  ["S002", "P002", "Affects how AI-generated intelligence is labeled and reviewed.", "Requires explicit provenance and human confirmation patterns.", "HIGH", "YES"],
  ["S002", "P004", "Affects tourism-facing chatbot and content interactions.", "May require disclosures and machine-readable marking.", "HIGH", "YES"],
  ["S003", "P001", "May provide more timely short-term-rental supply/usage inputs.", "Could change visitor-pressure denominator and spatial coverage.", "HIGH", "YES"],
  ["S003", "P002", "Creates a public data channel for destination monitoring.", "Verify local implementation before data-model changes.", "HIGH", "YES"],
  ["S004", "P004", "Changes formal pricing freedom and business-user data rights.", "Test actual direct-channel leverage before advice to businesses.", "HIGH", "YES"],
  ["S005", "P004", "May alter international visitor arrival friction.", "Monitor gateway performance before changing journey assumptions.", "NORMAL", "YES"],
  ["S005", "P002", "Could create a mobility change worth tracking.", "No destination-level effect established yet.", "NORMAL", "YES"],
  ["S006", "P003", "Creates a policy floor for aviation decarbonisation scenarios.", "Do not infer local emissions or price changes without route data.", "NORMAL", "YES"],
  ["S006", "P004", "May affect aviation cost and product claims later.", "Retain as context only.", "NORMAL", "YES"],
  ["S007", "P004", "Directly affects digital booking and transport-information journeys.", "Audit and remediate accessibility blockers.", "HIGH", "YES"],
  ["S007", "P002", "Affects observatory interface requirements.", "Accessibility must be acceptance criteria, not a later enhancement.", "HIGH", "YES"],
  ["S008", "P001", "Restoration measures may affect protected-area access/capacity.", "Input window closes soon.", "HIGH", "YES"],
  ["S008", "P003", "Restoration plans intersect biodiversity and climate adaptation.", "Map tourism implications before plan submission.", "HIGH", "YES"],
  ["S009", "P001", "May change heat-sensitive visitor thresholds.", "Needs local response validation.", "HIGH", "YES"],
  ["S009", "P003", "Central heat-exposure evidence for adaptation decisions.", "Separate hazard growth from observed visitor response.", "HIGH", "YES"],
  ["S010", "P001", "Fire restrictions may become the binding capacity constraint.", "Test actual closure/threshold rules.", "HIGH", "YES"],
  ["S010", "P003", "Wildfire exposure affects adaptation scenarios.", "Do not equate burnt area with visitor impact.", "HIGH", "YES"],
  ["S011", "P003", "Water scarcity can constrain destination operations.", "Use measured baselines before capacity rules.", "NORMAL", "YES"],
  ["S011", "P004", "Local tourism businesses may face efficiency requirements.", "One-site audit can bound feasible action.", "NORMAL", "YES"],
  ["S012", "P001", "Platform growth may change local pressure concentration.", "Reconcile definitions and geography.", "HIGH", "YES"],
  ["S012", "P002", "Shows need to monitor platform and establishment series separately.", "Avoid combining incompatible scopes.", "HIGH", "YES"],
  ["S013", "P004", "Connected-vehicle rights may enable mobility services.", "Verify user/data-holder roles first.", "NORMAL", "YES"],
  ["S013", "P002", "Potential new source for destination mobility indicators.", "No automatic public-sector access.", "NORMAL", "YES"],
  ["S014", "P001", "Could provide timely visitor-pressure input.", "Bias validation is required before thresholds.", "HIGH", "YES"],
  ["S014", "P002", "Material candidate data source for observatory monitoring.", "Benchmark against ground truth and document missing populations.", "HIGH", "YES"],
  ["S015", "P002", "Possible future interoperability and data-source layer.", "Do not create a dependency until assets and governance are inspectable.", "NORMAL", "YES"],
];

// README
readme.mergeCells("A1:H2");
readme.getRange("A1").values = [["Tourism Signal Radar — 10-working-day manual prototype"]];
styleTitle(readme.getRange("A1:H2"));
readme.getRange("A3:H3").merge();
readme.getRange("A3").values = [["ACTIVE TEST · 24 August–4 September 2026 · Documentation and workbook only"]];
readme.getRange("A3:H3").format = { fill: colors.tealLight, font: { bold: true, color: colors.teal, size: 11 }, verticalAlignment: "center" };
readme.getRange("A5:B5").values = [["Test property", "Value"]];
styleHeader(readme.getRange("A5:B5"));
readme.getRange("A6:B12").values = [
  ["Corpus", "15 real cross-domain Signals; 31 traceable Sources"],
  ["Domains", "AI, Remote Sensing, Governance, Tourism Technology, Mobility, Accessibility, Protected Areas, Climate, Wildfire, Water, Tourism Data, Data Governance"],
  ["Stress cases", "Multi-source synthesis; contradictory evidence; urgent-low-certainty boundaries; multi-project relevance; two background/no-immediate-move Signals"],
  ["User-entered cells", "Pale yellow cells only"],
  ["Current decision", "VALIDATE BEFORE BUILD — outcome thresholds are not yet observable"],
  ["Authority", "Source fact ≠ interpretation ≠ recommendation ≠ human decision"],
  ["No fabrication rule", "Do not backfill opens, ratings, timings or outcomes from memory. All seeded judgments are Codex drafts until Human confirmation = CONFIRMED."],
];
readme.getRange("A14:H14").merge();
readme.getRange("A14").values = [["Daily procedure (10–15 minutes)"]];
styleSection(readme.getRange("A14:H14"));
readme.getRange("A15:H21").merge(true);
readme.getRange("A15:H21").values = [
  ["1. Open Radar and review only the finite queue; do not browse Sources chronologically."],
  ["2. Choose one or two Signals. Inspect claim, project reason, evidence rationale and contradictions."],
  ["3. Record actual time and comprehension in Review Log. Blank is better than guessed."],
  ["4. Confirm, edit, schedule, execute or reject THE MOVE; record rating/outcome in Signals."],
  ["5. Complete one row in Daily Sessions. Mark Voluntary = YES only if no reminder caused the open."],
  ["6. On Days 5 and 10, answer whether Signal and Source are genuinely distinct and audit field friction."],
  ["7. Read Gate Status. Do not reinterpret a failing threshold after seeing the result."],
];
readme.getRange("A23:H23").merge();
readme.getRange("A23").values = [["Sheet map"]];
styleSection(readme.getRange("A23:H23"));
readme.getRange("A24:B34").values = [
  ["Gate Status", "Formula-driven go/kill thresholds and current verdict"],
  ["Radar", "Finite Day-1 review queue"],
  ["Signals", "Interpretations, decisions, THE MOVE and user outcomes"],
  ["Sources", "Retrievable evidence with URLs"],
  ["Evidence Links", "Supports / Contradicts / Contextualizes relationships"],
  ["Projects", "Editable project contexts"],
  ["Project Links", "Signal-to-project reasons and implications"],
  ["Daily Sessions", "Return behavior and daily decision effect"],
  ["Review Log", "Actual time, comprehension and friction"],
  ["Field Audit", "Skipped/redundant-field bureaucracy test"],
  ["Rubrics", "Visible evidence, priority, disposition and Move rules"],
];
readme.getRange("A5:B34").format.wrapText = true;
readme.getRange("A:A").format.columnWidth = 26;
readme.getRange("B:B").format.columnWidth = 80;
readme.getRange("C:H").format.columnWidth = 12;
readme.getRange("A1:H34").format.font = { name: "Aptos", color: colors.ink };
readme.getRange("A1:H34").format.verticalAlignment = "top";
readme.getRange("A1:H34").format.autofitRows();
readme.showGridLines = false;
readme.freezePanes.freezeRows(3);

// Sources
const sourceHeaders = ["Source ID", "Title", "Source type", "Publisher", "Publication date", "URL / identifier", "Origin", "Peer reviewed?", "Method transparency", "Evidence note"];
sourcesSheet.getRange("A1:J1").values = [sourceHeaders];
sourcesSheet.getRange(`A2:J${sources.length + 1}`).values = sources;
styleHeader(sourcesSheet.getRange("A1:J1"));
sourcesSheet.tables.add(`A1:J${sources.length + 1}`, true, "SourcesTable");
sourcesSheet.getRange(`E2:E${sources.length + 1}`).format.numberFormat = "yyyy-mm-dd";
sourcesSheet.getRange(`A1:J${sources.length + 1}`).format.wrapText = true;
sourcesSheet.getRange("A:A").format.columnWidth = 12;
sourcesSheet.getRange("B:B").format.columnWidth = 44;
sourcesSheet.getRange("C:C").format.columnWidth = 24;
sourcesSheet.getRange("D:D").format.columnWidth = 28;
sourcesSheet.getRange("E:E").format.columnWidth = 14;
sourcesSheet.getRange("F:F").format.columnWidth = 54;
sourcesSheet.getRange("G:I").format.columnWidth = 17;
sourcesSheet.getRange("J:J").format.columnWidth = 48;
sourcesSheet.getRange(`A2:J${sources.length + 1}`).format.rowHeight = 54;
sourcesSheet.freezePanes.freezeRows(1);
sourcesSheet.showGridLines = false;

// Evidence links
evidenceSheet.getRange("A1:E1").values = [["Signal ID", "Source ID", "Relationship", "Scope match", "Evidence note"]];
evidenceSheet.getRange(`A2:E${evidenceLinks.length + 1}`).values = evidenceLinks;
styleHeader(evidenceSheet.getRange("A1:E1"));
evidenceSheet.tables.add(`A1:E${evidenceLinks.length + 1}`, true, "EvidenceLinksTable");
evidenceSheet.getRange(`C2:C100`).dataValidation = { rule: { type: "list", values: ["SUPPORTS", "CONTRADICTS", "CONTEXTUALIZES"] } };
evidenceSheet.getRange(`D2:D100`).dataValidation = { rule: { type: "list", values: ["DIRECT", "INDIRECT"] } };
evidenceSheet.getRange(`A1:E${evidenceLinks.length + 1}`).format.wrapText = true;
evidenceSheet.getRange("A:B").format.columnWidth = 14;
evidenceSheet.getRange("C:D").format.columnWidth = 18;
evidenceSheet.getRange("E:E").format.columnWidth = 80;
evidenceSheet.getRange(`A2:E${evidenceLinks.length + 1}`).format.rowHeight = 42;
evidenceSheet.getRange(`C2:C${evidenceLinks.length + 1}`).conditionalFormats.add("containsText", { text: "CONTRADICTS", format: { fill: colors.redLight, font: { color: colors.red, bold: true } } });
evidenceSheet.freezePanes.freezeRows(1);
evidenceSheet.showGridLines = false;

// Projects and project links
projectsSheet.getRange("A1:F1").values = [["Project ID", "Name", "Description", "Decision question", "Domains", "Status"]];
projectsSheet.getRange(`A2:F${projects.length + 1}`).values = projects;
styleHeader(projectsSheet.getRange("A1:F1"));
projectsSheet.tables.add(`A1:F${projects.length + 1}`, true, "ProjectsTable");
projectsSheet.getRange("F2:F100").dataValidation = { rule: { type: "list", values: ["ACTIVE", "INACTIVE"] } };
projectsSheet.getRange(`A2:F${projects.length + 1}`).format.fill = colors.amberLight;
projectsSheet.getRange(`A1:F${projects.length + 1}`).format.wrapText = true;
projectsSheet.getRange("A:A").format.columnWidth = 12;
projectsSheet.getRange("B:B").format.columnWidth = 18;
projectsSheet.getRange("C:D").format.columnWidth = 52;
projectsSheet.getRange("E:E").format.columnWidth = 44;
projectsSheet.getRange("F:F").format.columnWidth = 14;
projectsSheet.getRange(`A2:F${projects.length + 1}`).format.rowHeight = 58;
projectsSheet.freezePanes.freezeRows(1);
projectsSheet.showGridLines = false;

projectLinksSheet.getRange("A1:F1").values = [["Signal ID", "Project ID", "Relevance reason", "Possible implication", "Attention", "Confirmed by user?"]];
projectLinksSheet.getRange(`A2:F${projectLinks.length + 1}`).values = projectLinks.map((row) => row.slice(0, 5).concat(["NO"]));
styleHeader(projectLinksSheet.getRange("A1:F1"));
projectLinksSheet.tables.add(`A1:F${projectLinks.length + 1}`, true, "ProjectLinksTable");
projectLinksSheet.getRange("E2:E100").dataValidation = { rule: { type: "list", values: ["HIGH", "NORMAL"] } };
projectLinksSheet.getRange("F2:F100").dataValidation = { rule: { type: "list", values: ["YES", "NO"] } };
styleInput(projectLinksSheet.getRange(`C2:F${projectLinks.length + 1}`));
projectLinksSheet.getRange(`A1:F${projectLinks.length + 1}`).format.wrapText = true;
projectLinksSheet.getRange("A:B").format.columnWidth = 14;
projectLinksSheet.getRange("C:D").format.columnWidth = 62;
projectLinksSheet.getRange("E:F").format.columnWidth = 18;
projectLinksSheet.getRange(`A2:F${projectLinks.length + 1}`).format.rowHeight = 50;
projectLinksSheet.freezePanes.freezeRows(1);
projectLinksSheet.showGridLines = false;

// Signals
const signalHeaders = ["Signal ID", "Domain", "Detected", "Evidence as-of", "Title", "Claim / what changed", "Why it matters", "Evidence quality", "Evidence rationale", "Priority", "Priority rationale", "Disposition", "Workflow", "THE MOVE", "Review trigger", "Move state", "Actionable?", "Source count", "Supports", "Contradicts", "Context", "Added to Radar", "Reviewed date", "P1 reviewed ≤1 day?", "Later background?", "Move useful (1–5)", "Outcome", "Outcome note", "Reviewer notes", "Human confirmation"];
signalsSheet.getRange("A1:AD1").values = [signalHeaders];
const signalRows = signals.map((r) => r.slice(0, 17).concat([null, null, null, null]).concat(r.slice(21)));
signalsSheet.getRange(`A2:AC${signals.length + 1}`).values = signalRows;
signalsSheet.getRange(`AC2:AC${signals.length + 1}`).values = signals.map(() => ["CODEX DRAFT — confirm claim, evidence quality, priority, disposition and THE MOVE."]);
signalsSheet.getRange(`AD2:AD${signals.length + 1}`).values = signals.map(() => ["PENDING"]);
for (let i = 2; i <= signals.length + 1; i++) {
  signalsSheet.getRange(`R${i}`).formulas = [[`=COUNTIF('Evidence Links'!$A$2:$A$100,A${i})`]];
  signalsSheet.getRange(`S${i}`).formulas = [[`=COUNTIFS('Evidence Links'!$A$2:$A$100,A${i},'Evidence Links'!$C$2:$C$100,"SUPPORTS")`]];
  signalsSheet.getRange(`T${i}`).formulas = [[`=COUNTIFS('Evidence Links'!$A$2:$A$100,A${i},'Evidence Links'!$C$2:$C$100,"CONTRADICTS")`]];
  signalsSheet.getRange(`U${i}`).formulas = [[`=COUNTIFS('Evidence Links'!$A$2:$A$100,A${i},'Evidence Links'!$C$2:$C$100,"CONTEXTUALIZES")`]];
  signalsSheet.getRange(`X${i}`).formulas = [[`=IF(J${i}<>"P1","N/A",IF(W${i}="","PENDING",IF(W${i}<=V${i}+1,"YES","NO")))`]];
}
styleHeader(signalsSheet.getRange("A1:AD1"));
signalsSheet.tables.add(`A1:AD${signals.length + 1}`, true, "SignalsTable");
signalsSheet.getRange("H2:H100").dataValidation = { rule: { type: "list", values: ["HIGH", "MEDIUM", "LOW"] } };
signalsSheet.getRange("J2:J100").dataValidation = { rule: { type: "list", values: ["P1", "P2", "P3"] } };
signalsSheet.getRange("L2:L100").dataValidation = { rule: { type: "list", values: ["UNDECIDED", "MONITOR", "TEST", "ADOPT", "DISMISS"] } };
signalsSheet.getRange("M2:M100").dataValidation = { rule: { type: "list", values: ["OPEN", "CLOSED"] } };
signalsSheet.getRange("P2:P100").dataValidation = { rule: { type: "list", values: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"] } };
signalsSheet.getRange("Q2:Q100").dataValidation = { rule: { type: "list", values: ["Y", "N"] } };
signalsSheet.getRange("Y2:Y100").dataValidation = { rule: { type: "list", values: ["YES", "NO"] } };
signalsSheet.getRange("Z2:Z100").dataValidation = { rule: { type: "whole", operator: "between", formula1: 1, formula2: 5 } };
signalsSheet.getRange("AA2:AA100").dataValidation = { rule: { type: "list", values: ["EXECUTED", "SCHEDULED", "EDITED", "REJECTED", "FORGOTTEN"] } };
signalsSheet.getRange("AD2:AD100").dataValidation = { rule: { type: "list", values: ["PENDING", "CONFIRMED"] } };
signalsSheet.getRange("C2:D100").format.numberFormat = "yyyy-mm-dd";
signalsSheet.getRange("V2:W100").format.numberFormat = "yyyy-mm-dd";
styleInput(signalsSheet.getRange(`W2:W${signals.length + 1}`));
styleInput(signalsSheet.getRange(`Y2:AC${signals.length + 1}`));
styleInput(signalsSheet.getRange(`AD2:AD${signals.length + 1}`));
signalsSheet.getRange(`A1:AD${signals.length + 1}`).format.wrapText = true;
signalsSheet.getRange("A:A").format.columnWidth = 11;
signalsSheet.getRange("B:B").format.columnWidth = 20;
signalsSheet.getRange("C:D").format.columnWidth = 13;
signalsSheet.getRange("E:E").format.columnWidth = 46;
signalsSheet.getRange("F:G").format.columnWidth = 64;
signalsSheet.getRange("H:H").format.columnWidth = 15;
signalsSheet.getRange("I:K").format.columnWidth = 52;
signalsSheet.getRange("L:M").format.columnWidth = 14;
signalsSheet.getRange("N:O").format.columnWidth = 62;
signalsSheet.getRange("P:Q").format.columnWidth = 15;
signalsSheet.getRange("R:U").format.columnWidth = 12;
signalsSheet.getRange("V:W").format.columnWidth = 14;
signalsSheet.getRange("X:AA").format.columnWidth = 18;
signalsSheet.getRange("AB:AC").format.columnWidth = 46;
signalsSheet.getRange("AD:AD").format.columnWidth = 20;
signalsSheet.getRange(`A2:AD${signals.length + 1}`).format.rowHeight = 92;
signalsSheet.getRange(`J2:J${signals.length + 1}`).conditionalFormats.add("containsText", { text: "P1", format: { fill: "#FFE3B3", font: { bold: true, color: "#7A3E00" } } });
signalsSheet.getRange(`T2:T${signals.length + 1}`).conditionalFormats.add("cellIs", { operator: "greaterThan", formula: 0, format: { fill: colors.redLight, font: { color: colors.red, bold: true } } });
signalsSheet.freezePanes.freezeRows(1);
signalsSheet.freezePanes.freezeColumns(5);
signalsSheet.showGridLines = false;

// Radar
radar.mergeCells("A1:H2");
radar.getRange("A1").values = [["RADAR · Day 1 · Monday 24 August 2026"]];
styleTitle(radar.getRange("A1:H2"));
radar.getRange("A3:H3").merge();
radar.getRange("A3").values = [["10 Signals need decision or containment. Ordered by deadline, enforcement recency, high-attention project link and contradiction/evidence change."]];
radar.getRange("A3:H3").format = { fill: colors.gray100, font: { color: colors.gray600, italic: true }, wrapText: true };
radar.getRange("A5:H5").values = [["Order", "Priority", "Signal ID", "Signal", "Evidence", "Projects", "Disposition", "THE MOVE / next trigger"]];
styleHeader(radar.getRange("A5:H5"));
const radarIds = ["S008", "S002", "S010", "S009", "S003", "S007", "S004", "S012", "S014", "S001"];
const signalById = Object.fromEntries(signals.map((s) => [s[0], s]));
const radarRows = radarIds.map((id, index) => {
  const s = signalById[id];
  const linkedProjects = projectLinks.filter((p) => p[0] === id).map((p) => projects.find((x) => x[0] === p[1])?.[1]).join(", ");
  return [index + 1, s[9], id, s[4], s[7], linkedProjects, s[11], s[13] || s[14]];
});
radar.getRange("A6:H15").values = radarRows;
radar.tables.add("A5:H15", true, "RadarTable");
radar.getRange("A6:H15").format.wrapText = true;
radar.getRange("A:A").format.columnWidth = 9;
radar.getRange("B:C").format.columnWidth = 11;
radar.getRange("D:D").format.columnWidth = 52;
radar.getRange("E:E").format.columnWidth = 14;
radar.getRange("F:G").format.columnWidth = 20;
radar.getRange("H:H").format.columnWidth = 76;
radar.getRange("A6:H15").format.rowHeight = 66;
radar.getRange("B6:B15").format = { fill: "#FFE3B3", font: { bold: true, color: "#7A3E00" }, horizontalAlignment: "center" };
radar.getRange("E6:E15").format = { fill: colors.tealLight, font: { bold: true, color: colors.teal }, horizontalAlignment: "center" };
radar.getRange("A17:H17").merge();
radar.getRange("A17").values = [["End of Radar · P2/P3 context remains in Signals; it is intentionally excluded from today's finite queue."]];
radar.getRange("A17:H17").format = { fill: colors.gray100, font: { color: colors.gray600, italic: true }, horizontalAlignment: "center" };
radar.showGridLines = false;
radar.freezePanes.freezeRows(5);

// Daily sessions
sessionsSheet.getRange("A1:K1").values = [["Date", "Day", "Opened?", "Voluntary?", "Session minutes", "Signals reviewed", "Decision changed/confirmed?", "Decision note", "Traceability check seconds", "Session notes", "Signal/Source distinction useful?"]];
const sessionDates = ["2026-08-24", "2026-08-25", "2026-08-26", "2026-08-27", "2026-08-28", "2026-08-31", "2026-09-01", "2026-09-02", "2026-09-03", "2026-09-04"];
sessionsSheet.getRange("A2:K11").values = sessionDates.map((d, i) => [date(d), i + 1, null, null, null, null, null, null, null, i === 4 ? "Day 5: define Evidence, Priority, Disposition, Status and THE MOVE without prompts." : i === 9 ? "Day 10: compare against current alerts/notes and give final Signal/Source response." : "", null]);
styleHeader(sessionsSheet.getRange("A1:K1"));
sessionsSheet.tables.add("A1:K11", true, "DailySessionsTable");
sessionsSheet.getRange("A2:A11").format.numberFormat = "yyyy-mm-dd";
sessionsSheet.getRange("C2:D11").dataValidation = { rule: { type: "list", values: ["YES", "NO"] } };
sessionsSheet.getRange("G2:G11").dataValidation = { rule: { type: "list", values: ["YES", "NO"] } };
sessionsSheet.getRange("K2:K11").dataValidation = { rule: { type: "list", values: ["YES", "NO"] } };
styleInput(sessionsSheet.getRange("C2:I11"));
styleInput(sessionsSheet.getRange("K2:K11"));
sessionsSheet.getRange("A1:K11").format.wrapText = true;
sessionsSheet.getRange("A:B").format.columnWidth = 12;
sessionsSheet.getRange("C:D").format.columnWidth = 14;
sessionsSheet.getRange("E:G").format.columnWidth = 20;
sessionsSheet.getRange("H:H").format.columnWidth = 56;
sessionsSheet.getRange("I:I").format.columnWidth = 22;
sessionsSheet.getRange("J:J").format.columnWidth = 66;
sessionsSheet.getRange("K:K").format.columnWidth = 26;
sessionsSheet.getRange("A2:K11").format.rowHeight = 56;
sessionsSheet.freezePanes.freezeRows(1);
sessionsSheet.showGridLines = false;

// Review log
reviewSheet.getRange("A1:J1").values = [["Planned date", "Signal ID", "Source capture min", "Signal review min", "Evidence rationale explained correctly?", "Priority useful?", "Field friction / ignored fields", "Move handling", "Notes / observed confusion", "Week-2 review min (formula)"]];
const schedule = [
  ["2026-08-24", "S008"], ["2026-08-24", "S002"], ["2026-08-25", "S010"], ["2026-08-25", "S009"],
  ["2026-08-26", "S003"], ["2026-08-26", "S007"], ["2026-08-27", "S004"], ["2026-08-27", "S012"],
  ["2026-08-28", "S014"], ["2026-08-28", "S001"], ["2026-08-31", "S005"], ["2026-09-01", "S011"],
  ["2026-09-02", "S013"], ["2026-09-03", "S006"], ["2026-09-04", "S015"],
];
reviewSheet.getRange("A2:J16").values = schedule.map(([d, id]) => [date(d), id, null, null, null, null, null, null, null, null]);
for (let i = 2; i <= 16; i++) reviewSheet.getRange(`J${i}`).formulas = [[`=IF(AND(A${i}>=DATE(2026,8,31),D${i}<>""),D${i},"")`]];
styleHeader(reviewSheet.getRange("A1:J1"));
reviewSheet.tables.add("A1:J16", true, "ReviewLogTable");
reviewSheet.getRange("A2:A16").format.numberFormat = "yyyy-mm-dd";
reviewSheet.getRange("E2:F100").dataValidation = { rule: { type: "list", values: ["YES", "NO"] } };
reviewSheet.getRange("H2:H100").dataValidation = { rule: { type: "list", values: ["EXECUTED", "SCHEDULED", "EDITED", "REJECTED", "FORGOTTEN", "NO MOVE"] } };
styleInput(reviewSheet.getRange("C2:I16"));
reviewSheet.getRange("A1:J16").format.wrapText = true;
reviewSheet.getRange("A:B").format.columnWidth = 14;
reviewSheet.getRange("C:D").format.columnWidth = 18;
reviewSheet.getRange("E:F").format.columnWidth = 26;
reviewSheet.getRange("G:G").format.columnWidth = 46;
reviewSheet.getRange("H:H").format.columnWidth = 18;
reviewSheet.getRange("I:I").format.columnWidth = 56;
reviewSheet.getRange("J:J").format.columnWidth = 22;
reviewSheet.getRange("A2:J16").format.rowHeight = 46;
reviewSheet.freezePanes.freezeRows(1);
reviewSheet.showGridLines = false;

// Field audit
fieldSheet.getRange("A1:G1").values = [["Required field", "Times exposed", "Times skipped", "Times judged redundant", "Worst friction rate", "Threshold status", "Notes"]];
const auditFields = ["Claim / what changed", "Why it matters", "Evidence quality + rationale", "Project relevance reason", "Priority + rationale", "Disposition", "Workflow status", "THE MOVE", "Review trigger", "Uncertainties / limitations"];
fieldSheet.getRange("A2:G11").values = auditFields.map((f) => [f, null, null, null, null, null, null]);
for (let i = 2; i <= 11; i++) {
  fieldSheet.getRange(`E${i}`).formulas = [[`=IF(B${i}=0,"",MAX(C${i},D${i})/B${i})`]];
  fieldSheet.getRange(`F${i}`).formulas = [[`=IF(E${i}="","PENDING",IF(E${i}<=40%,"PASS","FAIL"))`]];
}
styleHeader(fieldSheet.getRange("A1:G1"));
fieldSheet.tables.add("A1:G11", true, "FieldAuditTable");
styleInput(fieldSheet.getRange("B2:D11"));
styleInput(fieldSheet.getRange("G2:G11"));
fieldSheet.getRange("E2:E11").format.numberFormat = "0%";
addStatusFormatting(fieldSheet.getRange("F2:F11"));
fieldSheet.getRange("A1:G11").format.wrapText = true;
fieldSheet.getRange("A:A").format.columnWidth = 34;
fieldSheet.getRange("B:D").format.columnWidth = 18;
fieldSheet.getRange("E:F").format.columnWidth = 20;
fieldSheet.getRange("G:G").format.columnWidth = 62;
fieldSheet.getRange("A2:G11").format.rowHeight = 42;
fieldSheet.freezePanes.freezeRows(1);
fieldSheet.showGridLines = false;

// Rubrics
rubricsSheet.mergeCells("A1:F2");
rubricsSheet.getRange("A1").values = [["Transparent decision rubrics"]];
styleTitle(rubricsSheet.getRange("A1:F2"));
rubricsSheet.getRange("A4:F4").merge();
rubricsSheet.getRange("A4").values = [["Evidence quality — claim-specific, never an AI confidence score"]];
styleSection(rubricsSheet.getRange("A4:F4"));
rubricsSheet.getRange("A5:C8").values = [
  ["Category", "Deterministic rule", "Never means"],
  ["HIGH", "Direct competent evidence; inspectable enough; corroborated or directly verifiable event; no central unresolved contradiction; current enough.", "Important, certain in every context, or ready to adopt."],
  ["MEDIUM", "Plausible and relevant, with one material limitation: single chain, indirect scope, partial method, mixed findings or transferability gap.", "50% confidence."],
  ["LOW", "Unverifiable/indirect/opaque/stale evidence or credible unresolved contradiction attacks the central claim.", "False or unimportant."],
];
styleHeader(rubricsSheet.getRange("A5:C5"));
rubricsSheet.getRange("A10:F10").merge();
rubricsSheet.getRange("A10").values = [["Priority — review order, not truth or abstract importance"]];
styleSection(rubricsSheet.getRange("A10:F10"));
rubricsSheet.getRange("A11:C14").values = [
  ["Category", "Rule", "Default response"],
  ["P1", "Material change + active implication + decision window or bounded action + evidence supports at least that response.", "Decide or contain now."],
  ["P2", "Credible and relevant, but no immediate window, unclear action or more evidence required.", "Review and monitor."],
  ["P3", "Indirect/prospective relevance; no current project decision changes.", "Retain as context."],
];
styleHeader(rubricsSheet.getRange("A11:C11"));
rubricsSheet.getRange("A16:F16").merge();
rubricsSheet.getRange("A16").values = [["Human disposition and lifecycle"]];
styleSection(rubricsSheet.getRange("A16:F16"));
rubricsSheet.getRange("A17:C22").values = [
  ["Disposition", "Meaning", "Constraint"],
  ["UNDECIDED", "No human decision yet.", "Temporary; P1 cannot drift past its window."],
  ["MONITOR", "Wait for meaningful change or stronger evidence.", "Requires named review trigger."],
  ["TEST", "Run bounded validation.", "Requires THE MOVE."],
  ["ADOPT", "Apply to a project/method.", "Requires evidence-context fit and THE MOVE."],
  ["DISMISS", "Deliberately take no further action.", "Requires reason; not accidental ignoring."],
];
styleHeader(rubricsSheet.getRange("A17:C17"));
rubricsSheet.getRange("A24:F24").merge();
rubricsSheet.getRange("A24").values = [["THE MOVE lint"]];
styleSection(rubricsSheet.getRange("A24:F24"));
rubricsSheet.getRange("A25:F30").merge(true);
rubricsSheet.getRange("A25:F30").values = [
  ["Begin with a concrete verb; name object and boundary."],
  ["Use the lowest sufficient rung: verify → compare → pilot → adopt → scale."],
  ["State a result, condition or date that triggers the next decision."],
  ["Do not repeat Why it matters or merely say Read."],
  ["Do not prescribe adoption while transferability is untested."],
  ["AI may draft; only the user confirms the decision and Move."],
];
rubricsSheet.getRange("A1:F30").format.wrapText = true;
rubricsSheet.getRange("A:A").format.columnWidth = 23;
rubricsSheet.getRange("B:B").format.columnWidth = 86;
rubricsSheet.getRange("C:C").format.columnWidth = 46;
rubricsSheet.getRange("D:F").format.columnWidth = 12;
rubricsSheet.getRange("A1:F30").format.autofitRows();
rubricsSheet.showGridLines = false;
rubricsSheet.freezePanes.freezeRows(2);

// Gate Status helpers and formulas
gate.mergeCells("A1:F2");
gate.getRange("A1").values = [["PHASE 0 · Manual prototype gate status"]];
styleTitle(gate.getRange("A1:F2"));
gate.getRange("A3:F3").merge();
gate.getRange("A3").values = [["Current verdict: VALIDATE BEFORE BUILD — behavioral evidence is pending. Yellow cells in input sheets must be completed over 10 working days."]];
gate.getRange("A3:F3").format = { fill: colors.amberLight, font: { bold: true, color: colors.amber }, wrapText: true };
gate.getRange("A5:C5").values = [["Preflight metric", "Current", "Setup threshold"]];
styleHeader(gate.getRange("A5:C5"));
gate.getRange("A6:A11").values = [["Signal count"], ["Distinct represented domains"], ["Signals with ≥2 Sources"], ["Multi-source Signal rate"], ["Signals with contradictory evidence"], ["Source count"]];
gate.getRange("B6").formulas = [["=COUNTA('Signals'!$A$2:$A$100)"]];
gate.getRange("B7").formulas = [["=SUM(J6:J17)"]];
gate.getRange("B8").formulas = [["=COUNTIF('Signals'!$R$2:$R$100,\">=2\")"]];
gate.getRange("B9").formulas = [["=IF(B6=0,0,B8/B6)"]];
gate.getRange("B10").formulas = [["=COUNTIF('Signals'!$T$2:$T$100,\">0\")"]];
gate.getRange("B11").formulas = [["=COUNTA('Sources'!$A$2:$A$100)"]];
gate.getRange("C6:C11").values = [["12–18"], ["≥6"], ["≥4"], ["≥30%"], ["≥2 stress cases"], ["Traceable, no quota"]];
gate.getRange("B9").format.numberFormat = "0%";
gate.getRange("A5:C11").format.wrapText = true;

const domains = ["AI", "Remote Sensing", "Governance", "Tourism Technology", "Mobility", "Accessibility", "Protected Areas", "Climate", "Wildfire", "Water", "Tourism Data", "Data Governance"];
gate.getRange("H5:J5").values = [["Domain helper", "Signal count", "Present"]];
styleHeader(gate.getRange("H5:J5"));
gate.getRange("H6:H17").values = domains.map((d) => [d]);
for (let i = 6; i <= 17; i++) {
  gate.getRange(`I${i}`).formulas = [[`=COUNTIF('Signals'!$B$2:$B$100,H${i})`]];
  gate.getRange(`J${i}`).formulas = [[`=IF(I${i}>0,1,0)`]];
}

gate.getRange("A14:F14").values = [["Contract criterion", "Measured value", "Threshold", "Status", "Interpretation", "What remains"]];
styleHeader(gate.getRange("A14:F14"));
const criteriaLabels = [
  "Signal / Source separation",
  "THE MOVE utility + follow-through",
  "Evidence comprehension",
  "Priority usefulness",
  "Field economy",
  "Processing cost",
  "Return behavior",
  "Traceability",
];
gate.getRange("A15:A22").values = criteriaLabels.map((x) => [x]);
gate.getRange("C15:C22").values = [
  ["≥30% multi-source + 2/2 qualitative confirmations"],
  ["≥70% ratings 4–5 + ≥50% executed/scheduled/rejected"],
  ["≥80% correct explanations across ≥10 reviews"],
  ["≥80% P1 reviewed in 1 day; ≤20% later background"],
  ["No required field skipped/redundant >40%"],
  ["Week-2 median review ≤8 min; source capture ≤2 min"],
  ["≥6 voluntary opens; ≥3 visits affect a decision"],
  ["All sampled acted-Signal rationales found in <60 sec"],
];
gate.getRange("B15").formulas = [["=TEXT(B9,\"0%\")&\" multi-source; \"&COUNTIF('Daily Sessions'!$K$2:$K$11,\"YES\")&\" useful confirmations\""]];
gate.getRange("D15").formulas = [["=IF(COUNTIF('Daily Sessions'!$K$2:$K$11,\"<>\")<2,\"PENDING\",IF(AND(B9>=30%,COUNTIF('Daily Sessions'!$K$2:$K$11,\"YES\")=2),\"PASS\",\"FAIL\"))"]];
gate.getRange("E15").values = [["Structural requirement is already met; usefulness cannot be inferred from corpus design."]];
gate.getRange("F15").values = [["Day-5 and Day-10 user confirmation."]];

gate.getRange("B16").formulas = [["=COUNTIF('Signals'!$Z$2:$Z$100,\">=4\")&\"/\"&COUNT('Signals'!$Z$2:$Z$100)&\" useful; \"&(COUNTIF('Signals'!$AA$2:$AA$100,\"EXECUTED\")+COUNTIF('Signals'!$AA$2:$AA$100,\"SCHEDULED\")+COUNTIF('Signals'!$AA$2:$AA$100,\"REJECTED\"))&\" follow-through\""]];
gate.getRange("D16").formulas = [["=IF(COUNT('Signals'!$Z$2:$Z$100)<COUNTIF('Signals'!$Q$2:$Q$100,\"Y\"),\"PENDING\",IF(AND(COUNTIF('Signals'!$Z$2:$Z$100,\">=4\")/COUNT('Signals'!$Z$2:$Z$100)>=70%,(COUNTIF('Signals'!$AA$2:$AA$100,\"EXECUTED\")+COUNTIF('Signals'!$AA$2:$AA$100,\"SCHEDULED\")+COUNTIF('Signals'!$AA$2:$AA$100,\"REJECTED\"))/COUNTIF('Signals'!$Q$2:$Q$100,\"Y\")>=50%),\"PASS\",\"FAIL\"))"]];
gate.getRange("E16").values = [["No ratings/outcomes are prefilled."]];
gate.getRange("F16").values = [["Rate all actionable Moves and record outcomes."]];

gate.getRange("B17").formulas = [["=COUNTIF('Review Log'!$E$2:$E$100,\"YES\")&\"/\"&(COUNTIF('Review Log'!$E$2:$E$100,\"YES\")+COUNTIF('Review Log'!$E$2:$E$100,\"NO\"))"]];
gate.getRange("D17").formulas = [["=IF(COUNTIF('Review Log'!$E$2:$E$100,\"YES\")+COUNTIF('Review Log'!$E$2:$E$100,\"NO\")<10,\"PENDING\",IF(COUNTIF('Review Log'!$E$2:$E$100,\"YES\")/(COUNTIF('Review Log'!$E$2:$E$100,\"YES\")+COUNTIF('Review Log'!$E$2:$E$100,\"NO\"))>=80%,\"PASS\",\"FAIL\"))"]];
gate.getRange("E17").values = [["Evidence labels show rationales and contradiction counts."]];
gate.getRange("F17").values = [["Observe unaided explanations during reviews."]];

gate.getRange("B18").formulas = [["=COUNTIF('Signals'!$X$2:$X$100,\"YES\")&\" P1 timely; \"&COUNTIF('Signals'!$Y$2:$Y$100,\"YES\")&\" background\""]];
gate.getRange("D18").formulas = [["=IF(OR(COUNTIF('Signals'!$X$2:$X$100,\"YES\")+COUNTIF('Signals'!$X$2:$X$100,\"NO\")<COUNTIF('Signals'!$J$2:$J$100,\"P1\"),COUNTIF('Signals'!$Y$2:$Y$100,\"YES\")+COUNTIF('Signals'!$Y$2:$Y$100,\"NO\")<COUNTIF('Signals'!$J$2:$J$100,\"P1\")),\"PENDING\",IF(AND(COUNTIF('Signals'!$X$2:$X$100,\"YES\")/COUNTIF('Signals'!$J$2:$J$100,\"P1\")>=80%,COUNTIF('Signals'!$Y$2:$Y$100,\"YES\")/COUNTIF('Signals'!$J$2:$J$100,\"P1\")<=20%),\"PASS\",\"FAIL\"))"]];
gate.getRange("E18").values = [["Day-1 Radar has exactly 10 P1 items and an explicit end."]];
gate.getRange("F18").values = [["Record review dates and later background judgment."]];

gate.getRange("B19").formulas = [["=IF(COUNT('Field Audit'!$E$2:$E$11)=0,\"No observations\",TEXT(MAX('Field Audit'!$E$2:$E$11),\"0%\")&\" worst friction\")"]];
gate.getRange("D19").formulas = [["=IF(MIN('Field Audit'!$B$2:$B$11)<10,\"PENDING\",IF(MAX('Field Audit'!$E$2:$E$11)<=40%,\"PASS\",\"FAIL\"))"]];
gate.getRange("E19").values = [["Ten candidate required fields are isolated for removal testing."]];
gate.getRange("F19").values = [["Record exposure, skips and redundancy after reviews."]];

gate.getRange("B20").formulas = [["=IF(COUNT('Review Log'!$J$2:$J$100)=0,\"No week-2 reviews\",TEXT(MEDIAN('Review Log'!$J$2:$J$100),\"0.0\")&\" min review; \"&TEXT(MEDIAN('Review Log'!$C$2:$C$100),\"0.0\")&\" min capture\")"]];
gate.getRange("D20").formulas = [["=IF(OR(COUNT('Review Log'!$J$2:$J$100)<5,COUNT('Review Log'!$C$2:$C$100)<10),\"PENDING\",IF(AND(MEDIAN('Review Log'!$J$2:$J$100)<=8,MEDIAN('Review Log'!$C$2:$C$100)<=2),\"PASS\",\"FAIL\"))"]];
gate.getRange("E20").values = [["Authoring time is deliberately not estimated from Codex research time."]];
gate.getRange("F20").values = [["Enter actual capture/review minutes; ≥5 week-2 reviews."]];

gate.getRange("B21").formulas = [["=COUNTIF('Daily Sessions'!$D$2:$D$11,\"YES\")&\" voluntary; \"&COUNTIF('Daily Sessions'!$G$2:$G$11,\"YES\")&\" decision visits\""]];
gate.getRange("D21").formulas = [["=IF(COUNTIF('Daily Sessions'!$C$2:$C$11,\"YES\")+COUNTIF('Daily Sessions'!$C$2:$C$11,\"NO\")<10,\"PENDING\",IF(AND(COUNTIF('Daily Sessions'!$D$2:$D$11,\"YES\")>=6,COUNTIF('Daily Sessions'!$G$2:$G$11,\"YES\")>=3),\"PASS\",\"FAIL\"))"]];
gate.getRange("E21").values = [["Behavior cannot be simulated or inferred from workbook completion."]];
gate.getRange("F21").values = [["Complete all ten daily rows truthfully."]];

gate.getRange("B22").formulas = [["=IF(COUNT('Daily Sessions'!$I$2:$I$11)=0,\"No checks\",TEXT(MAX('Daily Sessions'!$I$2:$I$11),\"0\")&\" sec maximum\")"]];
gate.getRange("D22").formulas = [["=IF(COUNT('Daily Sessions'!$I$2:$I$11)<3,\"PENDING\",IF(MAX('Daily Sessions'!$I$2:$I$11)<60,\"PASS\",\"FAIL\"))"]];
gate.getRange("E22").values = [["All source URLs and relationships are present structurally."]];
gate.getRange("F22").values = [["Time ≥3 unaided rationale-recovery checks."]];

gate.getRange("A25:C25").merge();
gate.getRange("A25").values = [["Overall gate"]];
styleSection(gate.getRange("A25:C25"));
gate.getRange("D25:F25").merge();
gate.getRange("D25").formulas = [["=IF(COUNTIF(D15:D22,\"FAIL\")>0,\"DO NOT BUILD / REDESIGN\",IF(OR(COUNTIF(D15:D22,\"PENDING\")>0,COUNTIF('Signals'!$AD$2:$AD$100,\"CONFIRMED\")<COUNTA('Signals'!$A$2:$A$100)),\"VALIDATE BEFORE BUILD\",\"PROCEED WITH CHANGES\"))"]];
gate.getRange("D25:F25").format = { font: { bold: true, size: 14 }, horizontalAlignment: "center", verticalAlignment: "center", borders: { preset: "outside", style: "medium", color: colors.navy } };
addStatusFormatting(gate.getRange("D15:D22"));
addStatusFormatting(gate.getRange("D25:F25"));
gate.getRange("A14:F22").format.wrapText = true;
gate.getRange("A:A").format.columnWidth = 34;
gate.getRange("B:B").format.columnWidth = 30;
gate.getRange("C:C").format.columnWidth = 42;
gate.getRange("D:D").format.columnWidth = 22;
gate.getRange("E:F").format.columnWidth = 54;
gate.getRange("H:H").format.columnWidth = 24;
gate.getRange("I:J").format.columnWidth = 14;
gate.getRange("A6:F11").format.rowHeight = 30;
gate.getRange("A15:F22").format.rowHeight = 64;
gate.getRange("A25:F25").format.rowHeight = 40;
gate.showGridLines = false;
gate.freezePanes.freezeRows(3);

// Workbook-wide body defaults and table header reinforcement.
for (const sheet of wb.worksheets.items) {
  const used = sheet.getUsedRange();
  if (used) {
    used.format.font = { name: "Aptos", color: colors.ink, size: 10 };
    used.format.verticalAlignment = "top";
  }
}
// Re-apply title/header formatting after body defaults.
styleTitle(readme.getRange("A1:H2"));
styleTitle(radar.getRange("A1:H2"));
styleTitle(gate.getRange("A1:F2"));
styleTitle(rubricsSheet.getRange("A1:F2"));
styleHeader(readme.getRange("A5:B5"));
styleHeader(gate.getRange("A5:C5"));
styleHeader(gate.getRange("H5:J5"));
styleHeader(gate.getRange("A14:F14"));
styleHeader(radar.getRange("A5:H5"));
styleHeader(sourcesSheet.getRange("A1:J1"));
styleHeader(evidenceSheet.getRange("A1:E1"));
styleHeader(projectsSheet.getRange("A1:F1"));
styleHeader(projectLinksSheet.getRange("A1:F1"));
styleHeader(signalsSheet.getRange("A1:AD1"));
styleHeader(sessionsSheet.getRange("A1:K1"));
styleHeader(reviewSheet.getRange("A1:J1"));
styleHeader(fieldSheet.getRange("A1:G1"));
styleHeader(rubricsSheet.getRange("A5:C5"));
styleHeader(rubricsSheet.getRange("A11:C11"));
styleHeader(rubricsSheet.getRange("A17:C17"));
styleSection(readme.getRange("A14:H14"));
styleSection(readme.getRange("A23:H23"));
styleSection(rubricsSheet.getRange("A4:F4"));
styleSection(rubricsSheet.getRange("A10:F10"));
styleSection(rubricsSheet.getRange("A16:F16"));
styleSection(rubricsSheet.getRange("A24:F24"));

// Compact verification output.
console.log((await wb.inspect({ kind: "table", range: "Gate Status!A1:F25", include: "values,formulas", tableMaxRows: 30, tableMaxCols: 8, maxChars: 12000 })).ndjson);
console.log((await wb.inspect({ kind: "table", range: "Signals!A1:U6", include: "values,formulas", tableMaxRows: 8, tableMaxCols: 24, maxChars: 12000 })).ndjson);
console.log((await wb.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "final formula error scan" })).ndjson);

const previewSpecs = [
  ["README", "A1:H34"], ["Gate Status", "A1:F25"], ["Radar", "A1:H17"],
  ["Signals", "A1:Q6"], ["Sources", "A1:J8"], ["Evidence Links", "A1:E12"],
  ["Projects", "A1:F5"], ["Project Links", "A1:F10"], ["Daily Sessions", "A1:K11"],
  ["Review Log", "A1:J16"], ["Field Audit", "A1:G11"], ["Rubrics", "A1:F30"],
];
for (const [sheetName, range] of previewSpecs) {
  const blob = await wb.render({ sheetName, range, scale: 1, format: "png" });
  const safe = sheetName.toLowerCase().replaceAll(" ", "_");
  await fs.writeFile(path.join(previewDir, `${safe}.png`), new Uint8Array(await blob.arrayBuffer()));
}

const xlsx = await SpreadsheetFile.exportXlsx(wb);
const outputPath = path.join(outputDir, "tourism_signal_radar_manual_prototype.xlsx");
await xlsx.save(outputPath);
console.log(`OUTPUT=${outputPath}`);
