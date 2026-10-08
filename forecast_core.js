// Inti kalkulasi Forecast (dipakai Add Forecast & Forecast View): data plan SAP (dummy), STD, sapMock, estimasi habis, snapshot.
// Perlu dimuat setelah std_sap_data.js. Tidak menyentuh DOM.

// ─── STD ANALYSIS ─────────────────────────────────────────────────────────
const STD = [
    { d: 1, m: 0.00, v: 100.00, fd: 0.0010 },
    { d: 2, m: 0.10, v: 99.90, fd: 0.0020 },
    { d: 3, m: 0.10, v: 99.80, fd: 0.0030 },
    { d: 4, m: 0.10, v: 99.70, fd: 0.0040 },
    { d: 5, m: 0.10, v: 99.60, fd: 0.0050 },
    { d: 6, m: 0.10, v: 99.50, fd: 0.0060 },
    { d: 7, m: 0.10, v: 99.40, fd: 0.0070 },
    { d: 8, m: 0.20, v: 99.20, fd: 0.0090 },
    { d: 9, m: 0.20, v: 99.00, fd: 0.0120 },
    { d: 10, m: 0.20, v: 98.80, fd: 0.0150 },
    { d: 11, m: 0.20, v: 98.60, fd: 0.0180 },
    { d: 12, m: 0.20, v: 98.40, fd: 0.0220 },
    { d: 13, m: 0.20, v: 98.20, fd: 0.0260 },
    { d: 14, m: 0.20, v: 98.00, fd: 0.0300 },
    { d: 15, m: 0.20, v: 97.80, fd: 0.0350 },
    { d: 16, m: 0.20, v: 97.60, fd: 0.0400 },
    { d: 17, m: 0.20, v: 97.40, fd: 0.0450 },
    { d: 18, m: 0.20, v: 97.20, fd: 0.0500 },
    { d: 19, m: 0.20, v: 97.00, fd: 0.0560 },
    { d: 20, m: 0.20, v: 96.80, fd: 0.0620 },
    { d: 21, m: 0.20, v: 96.60, fd: 0.0680 },
    { d: 22, m: 0.30, v: 96.30, fd: 0.0750 },
    { d: 23, m: 0.30, v: 96.00, fd: 0.0820 },
    { d: 24, m: 0.30, v: 95.70, fd: 0.0890 },
    { d: 25, m: 0.30, v: 95.40, fd: 0.0960 },
    { d: 26, m: 0.30, v: 95.10, fd: 0.1030 },
    { d: 27, m: 0.30, v: 94.80, fd: 0.1100 },
    { d: 28, m: 0.30, v: 94.50, fd: 0.1160 },
    { d: 29, m: 0.30, v: 94.20, fd: 0.1220 },
    { d: 30, m: 0.30, v: 93.90, fd: 0.1280 },
    { d: 31, m: 0.30, v: 93.60, fd: 0.1330 },
    { d: 32, m: 0.30, v: 93.30, fd: 0.1380 },
    { d: 33, m: 0.30, v: 93.00, fd: 0.1420 },
    { d: 34, m: 0.30, v: 92.70, fd: 0.1460 },
    { d: 35, m: 0.30, v: 92.40, fd: 0.1500 },
];

const PHASES = [
    { code: "FEED-001", name: "Pakan Pre-Starter (S-0)", dayFrom: 1, dayTo: 7, uom: "Kg" },
    { code: "FEED-002", name: "Pakan Starter (BR-1)", dayFrom: 8, dayTo: 21, uom: "Kg" },
    { code: "FEED-004", name: "Pakan Finisher (BR-3)", dayFrom: 22, dayTo: 35, uom: "Kg" },
];

// ─── DEMO PLANS (mapped from kandang aktif) ───────────────────────────────
let DEMO_PLANS = [];

let _sapPlansPool = [
    {
        planNo: "100004423", fcStatus: "Draft", status: "Active", company: "PT TOP Distribusi",
        location: "Pekalongan", id: "F0001364", wh: "F0001364", docQty: 9700, docType: "DOC Broiler",
        ageLastPosting: 22, ageCurrent: 27, lastPostingDate: "29-Apr-26",
        sapData: { mort: 269, lastPop: 9431, bw: 0.985, fcr: 1.297, fiAct: 1.242, fiCum: 12050, grpo: 22700, poItr: null, lastStok: 10650 }
    },
    {
        planNo: "100004424", fcStatus: "Draft", status: "Active", company: "PT TOP Distribusi",
        location: "Blora", id: "F0001471", wh: "F0001471", docQty: 30800, docType: "DOC Broiler",
        ageLastPosting: 19, ageCurrent: 24, lastPostingDate: "29-Apr-26",
        sapData: { mort: 738, lastPop: 30370, bw: 0.75, fcr: 1.225, fiAct: 0.082, fiCum: 0.906, grpo: 43000, poItr: null, lastStok: 16600 }
    },
    {
        planNo: "100004425", fcStatus: "Draft", status: "Active", company: "PT TOP Distribusi",
        location: "Klaten", id: "F0001470", wh: "F0001470", docQty: 7200, docType: "DOC Broiler",
        ageLastPosting: 18, ageCurrent: 21, lastPostingDate: "1-May-26",
        sapData: { mort: 446, lastPop: 6826, bw: 0.586, fcr: 1.212, fiAct: 0.08, fiCum: 0.674, grpo: 9000, poItr: null, lastStok: 3550 }
    },
    {
        planNo: "100000271", fcStatus: "Draft", status: "Active", company: "PT AYM",
        location: "Ponorogo", id: "F0000274", wh: "F0000274", docQty: 5000, docType: "DOC Broiler",
        ageLastPosting: 12, ageCurrent: 14, lastPostingDate: "2-May-26",
        sapData: { mort: 46, lastPop: 5004, bw: 0.345, fcr: 1.303, fiAct: 0.04, fiCum: 0.45, grpo: 4000, poItr: 1750 }
    },
    {
        planNo: "100000272", fcStatus: "Draft", status: "Active", company: "PT AYM",
        location: "Malang", id: "F0000073", wh: "F0000073", docQty: 8500, docType: "DOC Broiler",
        ageLastPosting: 11, ageCurrent: 13, lastPostingDate: "1-May-26",
        sapData: { mort: 155, lastPop: 8430, bw: 0.325, fcr: 1.113, fiAct: 0.059, fiCum: 0.359, grpo: 5500, poItr: 2450 }
    },
    {
        planNo: "100000273", fcStatus: "Draft", status: "Active", company: "PT AYM",
        location: "Tuban", id: "F0000173", wh: "F0000173", docQty: 9900, docType: "DOC Broiler",
        ageLastPosting: 11, ageCurrent: 13, lastPostingDate: "1-May-26",
        sapData: { mort: 329, lastPop: 9670, bw: 0.187, fcr: 1.244, fiAct: 0.031, fiCum: 0.227, grpo: 5000, poItr: 2750 }
    },
    {
        planNo: "21000235", fcStatus: "Draft", status: "Active", company: "PT CTU",
        location: "Pasuruan", id: "FSR0001", wh: "FSR0001", docQty: 9315, docType: "DOC Layer",
        ageLastPosting: 98, ageCurrent: 98, lastPostingDate: "2-May-26",
        sapData: { mort: 386, lastPop: 8929, bw: null, fcr: null, fiAct: null, fiCum: null, grpo: 37700, poItr: null, lastStok: 1844, statusKalang: "GROWTH", kebutuhanMinggu: 4500, sisaKebutuhan: 18200 }
    },
    {
        planNo: "21000236", fcStatus: "Draft", status: "Active", company: "PT CTU",
        location: "Pasuruan", id: "FSR0002", wh: "FSR0002", docQty: 9460, docType: "DOC Layer",
        ageLastPosting: 98, ageCurrent: 98, lastPostingDate: "2-May-26",
        sapData: { mort: 326, lastPop: 9134, bw: null, fcr: null, fiAct: null, fiCum: null, grpo: 37250, poItr: null, lastStok: 979, statusKalang: "GROWTH", kebutuhanMinggu: 3800, sisaKebutuhan: 15400 }
    },
    {
        planNo: "21000237", fcStatus: "Draft", status: "Active", company: "PT CTU",
        location: "Pasuruan", id: "FSR0003", wh: "FSR0003", docQty: 8940, docType: "DOC Layer",
        ageLastPosting: 98, ageCurrent: 98, lastPostingDate: "2-May-26",
        sapData: { mort: 276, lastPop: 8664, bw: null, fcr: null, fiAct: null, fiCum: null, grpo: 31850, poItr: null, lastStok: 1537, statusKalang: "GROWTH", kebutuhanMinggu: 4200, sisaKebutuhan: 16800 }
    },
    {
        planNo: "21000238", fcStatus: "Draft", status: "Active", company: "PT CTU",
        location: "Pasuruan", id: "FSR0004", wh: "FSR0004", docQty: 9460, docType: "DOC Layer",
        ageLastPosting: 98, ageCurrent: 98, lastPostingDate: "2-May-26",
        sapData: { mort: 291, lastPop: 9169, bw: null, fcr: null, fiAct: null, fiCum: null, grpo: 32150, poItr: null, lastStok: 836, statusKalang: "GROWTH", kebutuhanMinggu: 3600, sisaKebutuhan: 14400 }
    },
    {
        planNo: "21000239", fcStatus: "Draft", status: "Active", company: "PT CTU",
        location: "Pasuruan", id: "FSR0005", wh: "FSR0005", docQty: 9520, docType: "DOC Layer",
        ageLastPosting: 98, ageCurrent: 98, lastPostingDate: "2-May-26",
        sapData: { mort: 211, lastPop: 9309, bw: null, fcr: null, fiAct: null, fiCum: null, grpo: 22900, poItr: null, lastStok: 1415, statusKalang: "GROWTH", kebutuhanMinggu: 4100, sisaKebutuhan: 16400 }
    },
    { planNo: "PLAN-2026-008", fcStatus: "Draft", status: "Active", company: "PT BMAX", farm: "Farm BMAX A", id: "KDG-08", wh: "WH-KDG08", docQty: 22000, docType: "DOC Broiler Ross 308", age: 23 },
    { planNo: "PLAN-2026-009", fcStatus: "Draft", status: "Active", company: "PT BMAX", farm: "Farm BMAX A", id: "KDG-09", wh: "WH-KDG09", docQty: 18000, docType: "DOC Broiler Cobb 500", age: 7 },
    { planNo: "PLAN-2026-010", fcStatus: "Draft", status: "Active", company: "PT BMAX", farm: "Farm BMAX B", id: "KDG-10", wh: "WH-KDG10", docQty: 20000, docType: "DOC Broiler Ross 308", age: 11 },
    { planNo: "PLAN-2026-018", fcStatus: "Draft", status: "Active", company: "PT BMAX", farm: "Farm BMAX A", id: "KDG-18", wh: "WH-KDG18", docQty: 25000, docType: "DOC Broiler Ross 308", age: 1 },
    { planNo: "PLAN-2026-019", fcStatus: "Draft", status: "Active", company: "PT BMAX", farm: "Farm BMAX B", id: "KDG-19", wh: "WH-KDG19", docQty: 16000, docType: "DOC Broiler Cobb 500", age: 9 },
    { planNo: "PLAN-2026-020", fcStatus: "Draft", status: "Active", company: "PT BMAX", farm: "Farm BMAX B", id: "KDG-20", wh: "WH-KDG20", docQty: 20000, docType: "DOC Broiler Ross 308", age: 7 },
    // ── 5 plan CONTOH dari Excel "SIMULASI IBOCS v2.xlsx" (sheet Layout IBOCS, baris 1–5) untuk review angka perhitungan.
    // Memakai tabel 'STD SAP' asli (std_sap_data.js) supaya hasilnya bisa dibandingkan langsung dengan Excel.
    ...[
        { no: "1000001", desc: "JG01-Silvy 1 S.1 (Update KHK, Panen Setelah Share, Seting Pakan)", manual: "2026-05-06" },
        { no: "1000002", desc: "JG02-Jeane 1 S.1 (Update KHK, Panen Setelah Share, Tanpa Seting Pakan)", manual: "2026-05-06" },
        { no: "1000003", desc: "JG03-Anto 1 S.1 (Update KHK, Panen Sebelum/Pas Share, Seting Pakan)", sap: "2026-05-03" },
        { no: "1000004", desc: "JG01-Silvy 1 S.2 (Update KHK, Panen Sebelum/Pas Share, Tanpa Seting Pakan)", sap: "2026-05-03" },
        { no: "1000005", desc: "JG02-Jeane 1 S.2 (Update KHK, Tanpa Panen, Seting Pakan)" },
    ].map((r, i) => ({
        planNo: r.no, fcStatus: "Draft", status: "Active", company: "PT TOP Distribusi", location: "Contoh Excel",
        id: `EXL-0${i + 1}`, wh: `EXL-0${i + 1}`, namaPlasma: r.desc, docQty: 17200, docType: "DOC Broiler", useStdSap: true,
        tanggalCI: "30-Mar-26", lastPostingDate: "5-May-26", ageLastPosting: 36,
        ageCurrent: Math.round((Date.now() - new Date(2026, 2, 30).getTime()) / 864e5), // Excel: Age Now = TODAY - Tanggal CI
        // U/V (Date/Ekor manual) untuk plan 1-2; W/X (Date SAP/Ekor SAP dari Dokumen Harvest SAP B1) untuk plan 3-4
        tanggalPanen: r.manual || undefined, ekorPanen: r.manual ? 8219 : undefined,
        sapData: { mort: 716, bw: 2.016, fcr: 1.5486101581202447, pakanTerpakai: 52000, grpo: 55000, poItr: 2000, lastStok: 5000, targetBW: 2.2, tanggalHarvestSap: r.sap, ekorHarvestSap: r.sap ? 8219 : undefined }
    })),
];

// Dummy: Nama Plasma (Plan Description SAP) & Warehouse Name — di real app dari SAP
const _DUMMY_PLASMA = ["Budi Santoso", "Siti Rahayu", "Agus Wijaya", "Hendra Pratama", "Dewi Lestari", "Slamet Riyadi", "Yulianto", "Eko Prasetyo"];
_sapPlansPool.forEach((p, i) => {
    if (!p.namaPlasma) p.namaPlasma = `Plasma ${_DUMMY_PLASMA[i % _DUMMY_PLASMA.length]}`;
    if (!p.whName) p.whName = `Gudang ${p.location ?? p.farm} ${p.id}`;
    // Item DOC mengikuti Plan Document (dummy: di real app dari dokumen Plan SAP)
    if (!p.docItem) p.docItem = p.docType === "DOC Broiler" ? (i % 2 ? "DOC Broiler Cobb 500 (M)" : "DOC Broiler Ross 308 (M)")
        : p.docType === "DOC Layer" ? "DOC Layer Lohmann (F)" : p.docType;
});

const HARVEST_DAY = 35;

// ─── KALKULASI ────────────────────────────────────────────────────────────
function calcFeedNeed(plan) {
    const { docQty } = plan;
    const age = plan.ageCurrent ?? plan.age;
    const phaseResults = PHASES.map((ph, idx) => {
        const startDay = Math.max(ph.dayFrom, age + 1);
        const endDay = Math.min(ph.dayTo, HARVEST_DAY);
        if (startDay > endDay) return { phaseIdx: idx, qty: 0, avgVitality: null, avgFeedCons: null, days: 0, skipped: true };

        let totalQty = 0, sumV = 0, sumFc = 0, count = 0;
        for (let d = startDay; d <= endDay; d++) {
            const row = STD[d - 1];
            totalQty += docQty * (row.v / 100) * row.fd;
            sumV += row.v;
            sumFc += row.fd;
            count++;
        }
        return { phaseIdx: idx, qty: totalQty, avgVitality: sumV / count, avgFeedCons: sumFc / count, days: count, skipped: false };
    });
    const totalQty = phaseResults.reduce((s, r) => s + r.qty, 0);
    return { phaseResults, totalQty };
}

function fmt(n, dec = 0) { return n.toLocaleString("id-ID", { minimumFractionDigits: dec, maximumFractionDigits: dec }); }

// "Nama Plasma" = Plan Description di SAP (TOP, AYM, dst.)
function getPlanDescription(plan) {
    if (!plan) return "-";
    if (plan.namaPlasma) return plan.namaPlasma;
    if (plan.planDesc || plan.planDescription) return plan.planDesc || plan.planDescription;
    return [plan.location ?? plan.farm, plan.id].filter(Boolean).join(" / ") || "-";
}

// "Nama Unit" = unit/lokasi plan di SAP (sebelumnya label "Location")
function getNamaUnit(plan) { return plan.location ?? plan.farm ?? "-"; }

// Warehouse Name (bukan kode)
function getWhName(plan) { return plan.whName || `Gudang ${getNamaUnit(plan)}`; }

// Mortality Actual = Mort / (Populasi + Bonus)
function getMortActual(plan) {
    const sap = sapMock(plan, calcFeedNeed(plan));
    const pct = sap.formula.popBonus > 0 ? sap.mort / sap.formula.popBonus * 100 : 0;
    return { ekor: sap.mort, pct };
}

function escHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
}

function tip(valueHtml, lines) {
    return `<span class="formula-tip" data-tip="${escHtml(lines.join("\n"))}">${valueHtml}</span>`;
}

function fmtDate(date) {
    return date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function parsePlanDate(value) {
    if (!value) return null;
    const iso = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/); // yyyy-mm-dd dari input date (hindari geser zona waktu)
    if (iso) return new Date(+iso[1], +iso[2] - 1, +iso[3]);
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;

    const match = String(value).match(/^(\d{1,2})-([A-Za-z]{3})-(\d{2,4})$/);
    if (!match) return null;
    const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const month = months[match[2]];
    if (month === undefined) return null;
    const year = match[3].length === 2 ? 2000 + parseInt(match[3], 10) : parseInt(match[3], 10);
    return new Date(year, month, parseInt(match[1], 10));
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

// Diff pada Excel (kolom AC / AY) = Date - TODAY
function daysFromToday(date) {
    const t = new Date();
    return diffDays(new Date(t.getFullYear(), t.getMonth(), t.getDate()), date);
}

function diffDays(fromDate, toDate) {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.round((toDate - fromDate) / msPerDay);
}

function ceilTo(n, step = 50) {
    return Math.ceil(n / step) * step;
}

// Plan contoh dari Excel memakai tabel 'STD SAP' asli (std_sap_data.js); plan lain tetap memakai STD ringkas di atas.
let _useStdSap = false;
let _stdSapRows = null;

function getStdRows() {
    if (_useStdSap && typeof STD_SAP !== "undefined") {
        if (!_stdSapRows) _stdSapRows = STD_SAP.age.map((a, i) => ({ age: a, bw: STD_SAP.bw[i], fiCum: STD_SAP.fi[i] }));
        return _stdSapRows;
    }
    let cumFi = 0;
    return STD.map(row => {
        cumFi += row.fd || 0;
        return {
            age: row.d,
            bw: row.bw ?? (0.045 + row.d * 0.055),
            fiCum: row.fiCum ?? cumFi
        };
    });
}

function lookupStdByTargetBW(targetBW) {
    const rows = getStdRows();
    return rows.find(row => row.bw >= targetBW) || rows[rows.length - 1];
}

function lookupStdByCumFi(cumFi, matchMode = 1) {
    const rows = getStdRows();
    if (matchMode === -1) {
        let found = rows[0];
        rows.forEach(row => { if (row.fiCum <= cumFi) found = row; });
        return found;
    }
    return rows.find(row => row.fiCum >= cumFi) || rows[rows.length - 1];
}

function lookupCumFiByAge(age) {
    const rows = getStdRows();
    const maxAge = _useStdSap ? rows[rows.length - 1].age : HARVEST_DAY;
    const safeAge = Math.max(_useStdSap ? 0 : 1, Math.min(maxAge, Math.round(age)));
    return (rows.find(row => row.age === safeAge) || rows[rows.length - 1]).fiCum;
}

function sapMock(plan, calc) {
    _useStdSap = !!plan.useStdSap;
    const sd = plan.sapData || {};
    const ageLastPosting = plan.ageLastPosting ?? plan.age ?? plan.ageCurrent ?? 0;
    const lastPostingDate = parsePlanDate(plan.lastPostingDate) || new Date(2026, 3, 20);
    const tanggalCI = parsePlanDate(plan.tanggalCI) || addDays(lastPostingDate, -ageLastPosting);
    const ageNow = plan.ageCurrent ?? plan.age ?? diffDays(tanggalCI, new Date());
    const popBonus = sd.popBonus ?? plan.popBonus ?? (plan.docQty * 1.01);
    const mort = sd.mort ?? Math.round(plan.docQty * 0.003 * ageLastPosting);
    const lastPop = sd.lastPop ?? Math.max(0, Math.round(popBonus - mort));
    const bw = sd.bw ?? (0.045 + ageLastPosting * 0.055).toFixed(3);
    const fcr = sd.fcr ?? null;
    const fiAct = sd.fiAct ?? +(sd.pakanTerpakai ? sd.pakanTerpakai / Math.max(popBonus, 1) : (0.045 + ageLastPosting * 0.055)).toFixed(3);
    const pakanTerpakai = sd.pakanTerpakai
        ?? (fcr != null && bw != null ? fcr * lastPop * parseFloat(bw) : fiAct * popBonus);
    const targetBW = sd.targetBW ?? plan.targetBW ?? 1.8;
    const targetStd = lookupStdByTargetBW(targetBW);
    const fiCum = targetStd.fiCum;
    const grpo = sd.grpo ?? Math.ceil(pakanTerpakai / 1000);
    const poItr = sd.poItr !== undefined ? sd.poItr : Math.max(0, grpo + 2);
    const poItrCalc = poItr ?? 0;
    const lastStok = sd.lastStok !== undefined ? sd.lastStok : Math.max(0, (grpo + poItrCalc) - pakanTerpakai);
    const kebutuhanMinggu = ceilTo(popBonus * fiCum, 50);
    const sisaKebutuhanRaw = kebutuhanMinggu - (grpo + poItrCalc);
    const sisaKebutuhan = Math.max(0, sisaKebutuhanRaw);

    // Panen Parsial = input manual user (Excel kolom U/V). Kosong → tidak ada panen parsial:
    // usia sampai panen = age last posting, ekor = 0. Tanggal <= last posting tidak menggeser usia.
    // U/V = input manual user; W/X = otomatis dari Dokumen Harvest SAP B1 (kosong bila belum ada dokumen).
    //   Z  = IF(OR(MAX(U,W) < LastPosting, keduanya kosong), Age LastPosting, MAX(U,W) - CI)
    //   Y  = Last Populasi - V - X
    //   AD = IF(OR(U = "", U <= LastPosting), FI Act, ...)   → hanya tanggal manual (U) yang dipakai, sesuai Excel
    const manualDate = parsePlanDate(plan.tanggalPanen);
    const manualEkor = Math.max(0, parseFloat(plan.ekorPanen) || 0);
    const sapDate = parsePlanDate(sd.tanggalHarvestSap);
    const sapEkor = Math.max(0, parseFloat(sd.ekorHarvestSap) || 0);
    const panenDate = [manualDate, sapDate].filter(Boolean).sort((a, b) => b - a)[0] || null; // MAX(U,W)
    const usiaAkhir = panenDate && panenDate >= lastPostingDate
        ? Math.max(ageLastPosting, diffDays(tanggalCI, panenDate))
        : ageLastPosting;
    const panenEkor = manualEkor + sapEkor;
    const stockAkhir = Math.max(0, lastPop - panenEkor);
    // Excel AD: tanpa panen parsial (atau tanggal <= last posting) FI Cum sampai panen = FI Act
    const hasParsial = !!manualDate && manualDate > lastPostingDate;
    const ageFiAct = lookupStdByCumFi(fiAct, 1).age;
    const cumFiSampaiPanen = hasParsial ? lookupCumFiByAge(ageFiAct + usiaAkhir - ageLastPosting) : fiAct;
    const pakanPakaiSampaiPanen = stockAkhir > 0
        ? Math.min(ceilTo(stockAkhir * Math.max(0, cumFiSampaiPanen - fiAct), 50), lastStok)
        : 0;
    const cumFiSisaPakan = stockAkhir > 0 ? +((lastStok - pakanPakaiSampaiPanen) / stockAkhir).toFixed(3) : 0;
    const cumFiStdTotal = +(cumFiSampaiPanen + Math.max(0, cumFiSisaPakan)).toFixed(3);
    const usiaCumFiStd1 = lookupStdByCumFi(cumFiStdTotal, 1).age;
    const usiaCumFiStd2 = lookupStdByCumFi(cumFiSampaiPanen, 1).age;
    const ageHabis = cumFiStdTotal <= cumFiSampaiPanen
        ? usiaAkhir
        : usiaCumFiStd1 - usiaCumFiStd2 + usiaAkhir;
    const tglHabis = addDays(tanggalCI, ageHabis);
    const pakanHabisDiff = daysFromToday(tglHabis);

    // Estimasi habis setelah order (Excel: AZ..AX). Belum ada order di tabel → sama dengan pakan habis.
    const forecastQty = sd.orderTotal ?? plan.orderTotal ?? 0;
    const lastStokAfterForecast = lastStok + forecastQty;
    const dailyFeedAfterCurrent = 0;
    const extraDaysFromForecast = 0;
    const ageEstimasiHabis = ageHabis;
    const tglEstimasiHabis = addDays(tanggalCI, ageEstimasiHabis);
    const estimasiHabisDiff = daysFromToday(tglEstimasiHabis);
    const targetBWNum = parseFloat(targetBW) || 0;

    // FI Cum Pakan Terima menurut Excel (kolom O) = (GRPO/IT + PO/ITR) / Populasi
    const fiCumTerima = +((grpo + poItrCalc) / popBonus).toFixed(3);
    // Diff FCR (Excel M) = FCR - FCR STD SAP pada BW yang sama; hanya tersedia bila tabel STD SAP dipakai
    let diffFcr = null;
    if (plan.useStdSap && fcr != null && typeof STD_SAP !== "undefined") {
        const idx = STD_SAP.bw.findIndex(v => Math.abs(v - parseFloat(bw)) < 0.0005);
        if (idx >= 0) diffFcr = fcr - STD_SAP.fcr[idx];
    }
    const result = {
        mort, lastPop, bw, fcr, diffFcr, fiAct, fiCum, fiCumTerima, gi: pakanTerpakai,
        panenManual: { dateStr: manualDate ? fmtDate(manualDate) : "", ekor: manualEkor }, grpo, poItr, ageNow, useStdSap: !!plan.useStdSap,
        lastStok, kebutuhanMinggu, sisaKebutuhan,
        hariHabis: pakanHabisDiff, tglHabisStr: fmtDate(tglHabis), ageHabis,
        panenDateStr: panenDate ? fmtDate(panenDate) : "-", panenEkor, pakanHabisDiff,
        harvestSap: { dateStr: sapDate ? fmtDate(sapDate) : "", ekor: sapEkor, has: !!(sapDate || sapEkor) },
        tglEstimasiHabisStr: fmtDate(tglEstimasiHabis), ageEstimasiHabis, estimasiHabisDiff,
        lastPostStr: plan.lastPostingDate || fmtDate(lastPostingDate),
        statusKalang: "Released", pakanHabis: fmtDate(tglHabis), bwPanen: `${targetBWNum.toFixed(2)} kg`,
        formula: {
            ageLastPosting, ageNow, popBonus, pakanTerpakai, targetBW: targetBWNum, poItrCalc, sisaKebutuhanRaw,
            stockAkhir, panenDateStr: panenDate ? fmtDate(panenDate) : "-", forecastQty, lastStokAfterForecast,
            dailyFeedAfterCurrent, extraDaysFromForecast,
            pakanPakaiSampaiPanen, cumFiSampaiPanen, cumFiStdTotal, usiaCumFiStd2, usiaCumFiStd1, cumFiSisaPakan, usiaAkhir
        },
        tanggalCI, tanggalCIStr: fmtDate(tanggalCI)
    };
    _useStdSap = false;
    return result;
}

// Estimasi habis setelah order — sama dengan kolom AZ..AX pada Excel
function calcEstimateAfterOrder(sap, orderTotal) {
    _useStdSap = !!sap.useStdSap;
    try { return calcEstimateCore(sap, orderTotal); } finally { _useStdSap = false; }
}

function calcEstimateCore(sap, orderTotal) {
    const f = sap.formula;
    const sisaPakan = sap.lastStok + orderTotal - f.pakanPakaiSampaiPanen;      // AZ
    const fiCumSisa = f.stockAkhir > 0 ? +(sisaPakan / f.stockAkhir).toFixed(3) : 0; // BA
    const fiCumTotal = +(fiCumSisa + f.cumFiSampaiPanen).toFixed(3);            // BB
    const usiaTotal = lookupStdByCumFi(fiCumTotal, 1).age;                      // BC
    const age = fiCumTotal <= f.cumFiStdTotal ? sap.ageHabis : usiaTotal + sap.ageHabis - f.usiaCumFiStd2; // AX
    const date = addDays(sap.tanggalCI, age);                                    // AW
    return {
        date, age, diff: daysFromToday(date),                                    // AW, AX, AY (Diff = Date - Hari Ini)
        sisaPakan, fiCumSisa, fiCumTotal, usiaTotal,                             // AZ, BA, BB, BC
        addDays: age - sap.ageHabis, stokAfter: sap.lastStok + orderTotal
    };
}

// Informasi plan (urutan & istilah mengikuti Excel) yang disimpan bersama forecast
function buildPlanSnapshot(plan, sap) {
    const f = sap.formula;
    return {
        tanggalCI: sap.tanggalCIStr, populasi: f.popBonus, itemDoc: plan.docItem || plan.docType || "-",
        lastPostingDate: sap.lastPostStr, ageLastPosting: f.ageLastPosting, mort: sap.mort, lastPop: sap.lastPop,
        bw: sap.bw != null ? parseFloat(sap.bw) : null, fcr: sap.fcr, diffFcr: sap.diffFcr, fiAct: sap.fiAct,
        fiCumTerima: sap.fiCumTerima, grpo: sap.grpo, poItr: sap.poItr, gi: sap.gi, lastStok: sap.lastStok,
        ageNow: sap.ageNow, bwPanen: sap.bwPanen, kebutuhanPakan: sap.kebutuhanMinggu, sisaKebutuhan: sap.sisaKebutuhan,
        panen: {
            manualDate: sap.panenManual.dateStr, manualEkor: sap.panenManual.ekor,
            sapDate: sap.harvestSap.dateStr, sapEkor: sap.harvestSap.ekor,
            stokSetelahPanen: f.stockAkhir, usiaSmpPanen: f.usiaAkhir
        },
        pakanHabis: {
            date: sap.tglHabisStr, age: sap.ageHabis, diff: sap.pakanHabisDiff,
            fiCumPanen: f.cumFiSampaiPanen, pakanSampaiPanen: f.pakanPakaiSampaiPanen, fiCumSisaPakan: f.cumFiSisaPakan,
            fiCumTotal: f.cumFiStdTotal, usiaFiCumPanen: f.usiaCumFiStd2, usiaFiCumTotal: f.usiaCumFiStd1
        }
    };
}

