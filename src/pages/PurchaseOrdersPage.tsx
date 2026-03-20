import { useState, useMemo } from "react";
import { Plus, Search, Eye, Pencil, FileText, Trash2, Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

interface PurchaseOrder {
  id: string;
  poRefNo: string;
  poDate: string;
  purchaseType: string;
  company: string;
  supplier: string;
  store: string;
  paymentTerm: string;
  modeOfPayment: string;
  currency: string;
  supplierProformaNumber: string;
  shipmentMode: string;
  priceTerms: string;
  estimatedShipmentDate: string;
  shipmentRemarks: string;
  productHdrAmount: number;
  totalAdditionalCostAmount: number;
  totalProductHdrAmount: number;
  totalVatHdrAmount: number;
  finalPurchaseHdrAmount: number;
  exchangeRate: number;
  productHdrAmountLC: number;
  totalAdditionalCostAmountLC: number;
  totalProductHdrAmountLC: number;
  totalVatHdrAmountLC: number;
  finalPurchaseHdrAmountLC: number;
  submittedBy: string;
  submittedDate: string;
  purchaseHeadResponsePerson: string;
  purchaseHeadResponseStatus: string;
  remarks: string;
  statusEntry: string;
  createdBy: string;
  createdDate: string;
}

const statusColors: Record<string, string> = {
  Approved: "bg-success/10 text-success border-success/30",
  Submitted: "bg-warning/10 text-warning border-warning/30",
  Completed: "bg-success/10 text-success border-success/30",
  Draft: "bg-muted text-muted-foreground border-border",
  "In-Approval": "bg-warning/10 text-warning border-warning/30",
  Rejected: "bg-destructive/10 text-destructive border-destructive/30",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/30",
};

const PAGE_SIZES = [5, 10, 25, 50, "ALL"] as const;

const initialPOs: PurchaseOrder[] = [
  { id: "1", poRefNo: "PO/MA/02/001", poDate: "2024-02-01", purchaseType: "Local Purchase", company: "AgroTanzania Ltd", supplier: "Kilimo Bora Suppliers", store: "Dar es Salaam Main Warehouse", paymentTerm: "Net 30 Days", modeOfPayment: "Bank Transfer", currency: "USD", supplierProformaNumber: "PRO-2024-001", shipmentMode: "Road Transport", priceTerms: "FOB", estimatedShipmentDate: "2024-02-15", shipmentRemarks: "Standard delivery", productHdrAmount: 50000, totalAdditionalCostAmount: 2500, totalProductHdrAmount: 52500, totalVatHdrAmount: 4730, finalPurchaseHdrAmount: 57230, exchangeRate: 2650, productHdrAmountLC: 132500000, totalAdditionalCostAmountLC: 6625000, totalProductHdrAmountLC: 139125000, totalVatHdrAmountLC: 12534500, finalPurchaseHdrAmountLC: 151659500, submittedBy: "sarah.kimani", submittedDate: "2024-02-01", purchaseHeadResponsePerson: "julian.thorne", purchaseHeadResponseStatus: "Approved", remarks: "", statusEntry: "Approved", createdBy: "sarah.kimani", createdDate: "2024-02-01" },
  { id: "2", poRefNo: "PO/FE/02/002", poDate: "2024-02-05", purchaseType: "Local Purchase", company: "AgroTanzania Ltd", supplier: "Agro-Inputs Ltd", store: "Dar es Salaam Main Warehouse", paymentTerm: "Net 30 Days", modeOfPayment: "Bank Transfer", currency: "USD", supplierProformaNumber: "PRO-2024-002", shipmentMode: "Road Transport", priceTerms: "CIF", estimatedShipmentDate: "2024-02-20", shipmentRemarks: "", productHdrAmount: 30000, totalAdditionalCostAmount: 1800, totalProductHdrAmount: 31800, totalVatHdrAmount: 3600, finalPurchaseHdrAmount: 35400, exchangeRate: 2650, productHdrAmountLC: 79500000, totalAdditionalCostAmountLC: 4770000, totalProductHdrAmountLC: 84270000, totalVatHdrAmountLC: 9540000, finalPurchaseHdrAmountLC: 93810000, submittedBy: "sarah.kimani", submittedDate: "2024-02-05", purchaseHeadResponsePerson: "julian.thorne", purchaseHeadResponseStatus: "Approved", remarks: "", statusEntry: "Approved", createdBy: "sarah.kimani", createdDate: "2024-02-05" },
  { id: "3", poRefNo: "PO/RI/03/003", poDate: "2024-03-01", purchaseType: "Local Purchase", company: "AgroTanzania Ltd", supplier: "Mbeya Rice Mills", store: "Dar es Salaam Main Warehouse", paymentTerm: "Net 60 Days", modeOfPayment: "Bank Transfer", currency: "USD", supplierProformaNumber: "PRO-2024-003", shipmentMode: "Road Transport", priceTerms: "FOB", estimatedShipmentDate: "2024-03-15", shipmentRemarks: "Fragile cargo", productHdrAmount: 65000, totalAdditionalCostAmount: 4200, totalProductHdrAmount: 69200, totalVatHdrAmount: 7960, finalPurchaseHdrAmount: 77160, exchangeRate: 2650, productHdrAmountLC: 172250000, totalAdditionalCostAmountLC: 11130000, totalProductHdrAmountLC: 183380000, totalVatHdrAmountLC: 21094000, finalPurchaseHdrAmountLC: 204474000, submittedBy: "sarah.kimani", submittedDate: "2024-03-01", purchaseHeadResponsePerson: "", purchaseHeadResponseStatus: "", remarks: "Awaiting approval", statusEntry: "Submitted", createdBy: "sarah.kimani", createdDate: "2024-03-01" },
  { id: "4", poRefNo: "PO/WH/03/004", poDate: "2024-03-05", purchaseType: "Local Purchase", company: "AgroTanzania Ltd", supplier: "Sun Valley Farms", store: "Mbeya Storage Facility", paymentTerm: "Cash on Delivery", modeOfPayment: "Cheque", currency: "TZS", supplierProformaNumber: "", shipmentMode: "Road Transport", priceTerms: "EXW", estimatedShipmentDate: "2024-03-12", shipmentRemarks: "", productHdrAmount: 35000, totalAdditionalCostAmount: 1560, totalProductHdrAmount: 36560, totalVatHdrAmount: 2700, finalPurchaseHdrAmount: 39260, exchangeRate: 1, productHdrAmountLC: 35000, totalAdditionalCostAmountLC: 1560, totalProductHdrAmountLC: 36560, totalVatHdrAmountLC: 2700, finalPurchaseHdrAmountLC: 39260, submittedBy: "sarah.kimani", submittedDate: "2024-03-05", purchaseHeadResponsePerson: "julian.thorne", purchaseHeadResponseStatus: "Approved", remarks: "", statusEntry: "Approved", createdBy: "sarah.kimani", createdDate: "2024-03-05" },
  { id: "5", poRefNo: "PO/BE/03/005", poDate: "2024-03-08", purchaseType: "Local Purchase", company: "AgroTanzania Ltd", supplier: "Kigoma Pulse Exporters", store: "Dar es Salaam Main Warehouse", paymentTerm: "Net 30 Days", modeOfPayment: "Bank Transfer", currency: "USD", supplierProformaNumber: "PRO-2024-005", shipmentMode: "Road Transport", priceTerms: "FOB", estimatedShipmentDate: "2024-03-20", shipmentRemarks: "", productHdrAmount: 19500, totalAdditionalCostAmount: 1230, totalProductHdrAmount: 20730, totalVatHdrAmount: 2300, finalPurchaseHdrAmount: 23030, exchangeRate: 2650, productHdrAmountLC: 51675000, totalAdditionalCostAmountLC: 3259500, totalProductHdrAmountLC: 54934500, totalVatHdrAmountLC: 6095000, finalPurchaseHdrAmountLC: 61029500, submittedBy: "sarah.kimani", submittedDate: "2024-03-08", purchaseHeadResponsePerson: "julian.thorne", purchaseHeadResponseStatus: "Approved", remarks: "Completed", statusEntry: "Completed", createdBy: "sarah.kimani", createdDate: "2024-03-08" },
  { id: "6", poRefNo: "PO/MA/03/006", poDate: "2024-03-10", purchaseType: "Local Purchase", company: "AgroTanzania Ltd", supplier: "Kilimo Bora Suppliers", store: "Dar es Salaam Main Warehouse", paymentTerm: "Net 30 Days", modeOfPayment: "Bank Transfer", currency: "USD", supplierProformaNumber: "", shipmentMode: "Road Transport", priceTerms: "FOB", estimatedShipmentDate: "2024-03-25", shipmentRemarks: "", productHdrAmount: 26500, totalAdditionalCostAmount: 1500, totalProductHdrAmount: 28000, totalVatHdrAmount: 3000, finalPurchaseHdrAmount: 31000, exchangeRate: 2650, productHdrAmountLC: 70225000, totalAdditionalCostAmountLC: 3975000, totalProductHdrAmountLC: 74200000, totalVatHdrAmountLC: 7950000, finalPurchaseHdrAmountLC: 82150000, submittedBy: "", submittedDate: "", purchaseHeadResponsePerson: "", purchaseHeadResponseStatus: "", remarks: "Draft order", statusEntry: "Draft", createdBy: "sarah.kimani", createdDate: "2024-03-10" },
  { id: "7", poRefNo: "PO/KA/03/007", poDate: "2024-03-12", purchaseType: "Import", company: "AgroTanzania Ltd", supplier: "Zanzibar Spice Traders", store: "Dar es Salaam Main Warehouse", paymentTerm: "Advance Payment", modeOfPayment: "Bank Transfer", currency: "USD", supplierProformaNumber: "PRO-2024-007", shipmentMode: "Sea", priceTerms: "CIF", estimatedShipmentDate: "2024-04-01", shipmentRemarks: "Sea freight from Zanzibar", productHdrAmount: 44000, totalAdditionalCostAmount: 3500, totalProductHdrAmount: 47500, totalVatHdrAmount: 4560, finalPurchaseHdrAmount: 52060, exchangeRate: 2650, productHdrAmountLC: 116600000, totalAdditionalCostAmountLC: 9275000, totalProductHdrAmountLC: 125875000, totalVatHdrAmountLC: 12084000, finalPurchaseHdrAmountLC: 137959000, submittedBy: "sarah.kimani", submittedDate: "2024-03-12", purchaseHeadResponsePerson: "", purchaseHeadResponseStatus: "Pending", remarks: "", statusEntry: "In-Approval", createdBy: "sarah.kimani", createdDate: "2024-03-12" },
  { id: "8", poRefNo: "PO/WH/03/008", poDate: "2024-03-14", purchaseType: "Local Purchase", company: "AgroTanzania Ltd", supplier: "Sun Valley Farms", store: "Mbeya Storage Facility", paymentTerm: "Net 30 Days", modeOfPayment: "Bank Transfer", currency: "USD", supplierProformaNumber: "PRO-2024-008", shipmentMode: "Road Transport", priceTerms: "FOB", estimatedShipmentDate: "2024-03-28", shipmentRemarks: "Quality concerns", productHdrAmount: 22000, totalAdditionalCostAmount: 1280, totalProductHdrAmount: 23280, totalVatHdrAmount: 2500, finalPurchaseHdrAmount: 25780, exchangeRate: 2650, productHdrAmountLC: 58300000, totalAdditionalCostAmountLC: 3392000, totalProductHdrAmountLC: 61692000, totalVatHdrAmountLC: 6625000, finalPurchaseHdrAmountLC: 68317000, submittedBy: "sarah.kimani", submittedDate: "2024-03-14", purchaseHeadResponsePerson: "julian.thorne", purchaseHeadResponseStatus: "Rejected", remarks: "Price too high", statusEntry: "Rejected", createdBy: "sarah.kimani", createdDate: "2024-03-14" },
];

const tableColumns = [
  { key: "poRefNo", label: "PO Number" },
  { key: "poDate", label: "Date" },
  { key: "purchaseType", label: "Type" },
  { key: "supplier", label: "Supplier" },
  { key: "store", label: "Store" },
  { key: "currency", label: "Curr" },
  { key: "modeOfPayment", label: "Payment" },
  { key: "finalPurchaseHdrAmount", label: "Amount" },
  { key: "exchangeRate", label: "Ex. Rate" },
  { key: "finalPurchaseHdrAmountLC", label: "Amount (LC)" },
  { key: "statusEntry", label: "Status" },
];

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>(initialPOs);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState<number | "ALL">(10);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const filtered = useMemo(() => orders.filter((o) =>
    o.poRefNo.toLowerCase().includes(search.toLowerCase()) ||
    o.supplier.toLowerCase().includes(search.toLowerCase()) ||
    o.statusEntry.toLowerCase().includes(search.toLowerCase())
  ), [orders, search]);

  const totalPages = pageSize === "ALL" ? 1 : Math.ceil(filtered.length / pageSize);
  const paginated = useMemo(() => {
    if (pageSize === "ALL") return filtered;
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const handlePageSizeChange = (val: string) => {
    if (val === "ALL") { setPageSize("ALL"); setCurrentPage(1); }
    else { setPageSize(Number(val)); setCurrentPage(1); }
  };

  const exportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    doc.setFontSize(16); doc.text("Purchase Orders", 14, 20);
    doc.setFontSize(10); doc.text(`Exported: ${new Date().toLocaleString()}`, 14, 28);
    const headers = tableColumns.map(c => c.label);
    const rows = filtered.map(item => tableColumns.map(c => {
      const val = item[c.key as keyof PurchaseOrder];
      return typeof val === "number" ? val.toLocaleString() : String(val || "");
    }));
    autoTable(doc, { head: [headers], body: rows, startY: 34, styles: { fontSize: 7 }, headStyles: { fillColor: [34, 68, 50] } });
    doc.save("purchase_orders.pdf");
  };

  const exportExcel = () => {
    const wsData = [tableColumns.map(c => c.label), ...filtered.map(item => tableColumns.map(c => item[c.key as keyof PurchaseOrder] || ""))];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Purchase Orders");
    XLSX.writeFile(wb, "purchase_orders.xlsx");
  };

  const exportCSV = () => {
    const headers = tableColumns.map(c => c.label);
    const rows = filtered.map(item => tableColumns.map(c => `"${String(item[c.key as keyof PurchaseOrder] || "").toString().replace(/"/g, '""')}"`));
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "purchase_orders.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Purchase Orders</h1>
          <p className="text-sm text-muted-foreground">TBL_PURCHASE_ORDER_HDR — Create and manage purchase orders with PO/[ProductCode]/[Month]/[Serial] format</p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" /> Export</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportPDF}><FileText className="w-4 h-4 mr-2" /> Export as PDF</DropdownMenuItem>
              <DropdownMenuItem onClick={exportExcel}><FileSpreadsheet className="w-4 h-4 mr-2" /> Export as Excel</DropdownMenuItem>
              <DropdownMenuItem onClick={exportCSV}><FileText className="w-4 h-4 mr-2" /> Export as CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => navigate("/purchase-orders/create")} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" /> New Purchase Order
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by PO number, supplier, status..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="pl-9" />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs text-muted-foreground">Show</span>
            <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
              <SelectTrigger className="w-20 h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                {PAGE_SIZES.map(s => <SelectItem key={String(s)} value={String(s)}>{String(s)}</SelectItem>)}
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground">entries</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 w-8"><input type="checkbox" className="rounded" /></th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Actions</th>
                {tableColumns.map(c => (
                  <th key={c.key} className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs whitespace-nowrap">{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((o) => (
                <tr key={o.id} className="border-b hover:bg-muted/30">
                  <td className="p-3"><input type="checkbox" className="rounded" /></td>
                  <td className="p-3">
                    <div className="flex gap-1.5">
                      <button className="p-1 rounded hover:bg-muted"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                      <button className="p-1 rounded hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                      <button onClick={() => setOrders(prev => prev.filter(p => p.id !== o.id))} className="p-1 rounded hover:bg-destructive/10"><Trash2 className="w-4 h-4 text-destructive" /></button>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-xs font-medium">{o.poRefNo}</td>
                  <td className="p-3 whitespace-nowrap">{o.poDate}</td>
                  <td className="p-3">{o.purchaseType}</td>
                  <td className="p-3">{o.supplier}</td>
                  <td className="p-3 text-xs">{o.store}</td>
                  <td className="p-3">{o.currency}</td>
                  <td className="p-3">{o.modeOfPayment}</td>
                  <td className="p-3 font-medium tabular-nums">${o.finalPurchaseHdrAmount.toLocaleString()}</td>
                  <td className="p-3 tabular-nums">{o.exchangeRate.toLocaleString()}</td>
                  <td className="p-3 tabular-nums">{o.finalPurchaseHdrAmountLC.toLocaleString()}</td>
                  <td className="p-3"><Badge variant="outline" className={statusColors[o.statusEntry] || ""}>{o.statusEntry}</Badge></td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={tableColumns.length + 2} className="p-8 text-center text-muted-foreground">No purchase orders found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Showing {paginated.length === 0 ? 0 : ((currentPage - 1) * (pageSize === "ALL" ? filtered.length : pageSize)) + 1}
            {" "}to {Math.min(currentPage * (pageSize === "ALL" ? filtered.length : pageSize), filtered.length)}
            {" "}of {filtered.length} entries
          </p>
          {pageSize !== "ALL" && totalPages > 1 && (
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="h-8 text-xs">Previous</Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page: number;
                if (totalPages <= 5) page = i + 1;
                else if (currentPage <= 3) page = i + 1;
                else if (currentPage >= totalPages - 2) page = totalPages - 4 + i;
                else page = currentPage - 2 + i;
                return (
                  <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)} className="h-8 w-8 text-xs p-0">
                    {page}
                  </Button>
                );
              })}
              <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="h-8 text-xs">Next</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
