/**
 * po_feed_helpers.js
 * Helper bersama untuk alur PO Feed (PO Generation, Review, PO yang sudah digenerate).
 * Forecast -> PO: Vendor Name, Warehouse Name, Unit, Lokasi Pengambilan, total ala SAP B1.
 */
const PO_VENDORS = {
    SIC: { code: "VND-SIC", name: "SIC — Supplier Pakan & Feed", contact: "Agus Prasetyo" },
    CTU: { code: "VND-CTU", name: "CTU — Supplier DOC / Bibit Ayam", contact: "Rini Kusuma" }
};

function poVendorInfo(code) {
    const key = String(code || "SIC").replace("VND-", "");
    return PO_VENDORS[key] || PO_VENDORS.SIC;
}

function fcVendorCode(fc) {
    const first = (fc.lines || []).find(l => l.vendorCode);
    return fc.vendorCode || (first && first.vendorCode) || "VND-SIC";
}

// Vendor yang ditampilkan = Vendor Name
function fcVendorName(fc) {
    return fc.vendorName || poVendorInfo(fcVendorCode(fc)).name;
}

// Warehouse yang ditampilkan = Warehouse Name (bukan kode)
function fcWarehouseName(fc) {
    return fc.warehouseName || (fc.farm ? "Gudang " + fc.farm : (fc.warehouse || "-"));
}

function poWarehouseName(o) {
    return o.warehouseName || (o.unit ? "Gudang " + o.unit : (o.warehouse || "-"));
}

// Forecast yang siap di-generate menjadi PO (Forecast Created; "Confirmed" untuk data lama/master)
function fcReadyForPO(fc) {
    return fc.status === "Forecast Created" || fc.status === "Confirmed";
}

// Total mengikuti urutan SAP B1: Total Before Discount, Discount, Freight, Rounding, Tax, Total Payment Due
function poTotals(lines, order) {
    const before = (lines || []).reduce((s, l) => s + (Number(l.price) || 0) * (Number(l.qty) || 0), 0);
    const discount = Number(order && order.discount) || 0;
    const freight = Number(order && order.freight) || 0;
    const taxBase = before - discount + freight;
    const tax = Math.round(taxBase * 0.11);
    const rounding = Number(order && order.rounding) || 0;
    return { before, discount, freight, rounding, tax, payment: taxBase + tax + rounding };
}

function emptyTransport() {
    return {
        vendorCode: "", vendorName: "", driverName: "", billOfLading: "", licenseNumber: "", containerNumber: "",
        departureTime: "", arrivalTime: "", servicePriceKg: "", totalService: "", remarks: "",
        isBilled: false, ta: "", totalServiceInv: "", noInvoiceOa: ""
    };
}
