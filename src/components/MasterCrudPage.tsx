import { useState, useMemo } from "react";
import { Plus, Search, Pencil, Trash2, Download, FileSpreadsheet, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export interface MasterField {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "textarea" | "date";
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

interface MasterPageProps {
  title: string;
  description: string;
  idPrefix: string;
  fields: MasterField[];
  initialData: Record<string, any>[];
  columns: { key: string; label: string }[];
}

const PAGE_SIZES = [5, 10, 25, 50, "ALL"] as const;

export default function MasterCrudPage({ title, description, idPrefix, fields, initialData, columns }: MasterPageProps) {
  const [data, setData] = useState<Record<string, any>[]>(initialData);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [pageSize, setPageSize] = useState<number | "ALL">(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => data.filter((d) => {
    const searchable = columns.map((c) => String(d[c.key] || "").toLowerCase()).join(" ");
    return searchable.includes(search.toLowerCase());
  }), [data, search, columns]);

  const totalPages = pageSize === "ALL" ? 1 : Math.ceil(filtered.length / pageSize);
  const paginated = useMemo(() => {
    if (pageSize === "ALL") return filtered;
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const emptyForm = () => {
    const f: Record<string, any> = {};
    fields.forEach((field) => { f[field.key] = field.type === "number" ? 0 : ""; });
    return f;
  };

  const openAdd = () => { setEditing(null); setForm(emptyForm()); setDialogOpen(true); };
  const openEdit = (item: Record<string, any>) => { setEditing(item); setForm({ ...item }); setDialogOpen(true); };

  const handleSave = () => {
    const requiredMissing = fields.some((f) => f.required && !form[f.key]);
    if (requiredMissing) return;
    if (editing) {
      setData((prev) => prev.map((d) => d.id === editing.id ? { ...d, ...form } : d));
    } else {
      const newId = `${idPrefix}${String(data.length + 1).padStart(3, "0")}`;
      setData((prev) => [...prev, { id: newId, ...form }]);
    }
    setDialogOpen(false);
  };

  const handlePageSizeChange = (val: string) => {
    if (val === "ALL") { setPageSize("ALL"); setCurrentPage(1); }
    else { setPageSize(Number(val)); setCurrentPage(1); }
  };

  // Export functions
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(title, 14, 20);
    doc.setFontSize(10);
    doc.text(`Exported: ${new Date().toLocaleString()}`, 14, 28);
    const headers = ["ID", ...columns.map(c => c.label)];
    const rows = filtered.map(item => [item.id, ...columns.map(c => String(item[c.key] || ""))]);
    autoTable(doc, { head: [headers], body: rows, startY: 34, styles: { fontSize: 8 }, headStyles: { fillColor: [34, 68, 50] } });
    doc.save(`${title.toLowerCase().replace(/\s+/g, "_")}.pdf`);
  };

  const exportExcel = () => {
    const wsData = [["ID", ...columns.map(c => c.label)], ...filtered.map(item => [item.id, ...columns.map(c => item[c.key] || "")])];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, title);
    XLSX.writeFile(wb, `${title.toLowerCase().replace(/\s+/g, "_")}.xlsx`);
  };

  const exportCSV = () => {
    const headers = ["ID", ...columns.map(c => c.label)];
    const rows = filtered.map(item => [item.id, ...columns.map(c => `"${String(item[c.key] || "").replace(/"/g, '""')}"`)]);
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${title.toLowerCase().replace(/\s+/g, "_")}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportPDF}><FileText className="w-4 h-4 mr-2" /> Export as PDF</DropdownMenuItem>
              <DropdownMenuItem onClick={exportExcel}><FileSpreadsheet className="w-4 h-4 mr-2" /> Export as Excel</DropdownMenuItem>
              <DropdownMenuItem onClick={exportCSV}><FileText className="w-4 h-4 mr-2" /> Export as CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={openAdd} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" /> Add {title.replace(/s$/, "")}
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder={`Search ${title.toLowerCase()}...`} value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="pl-9" />
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
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Actions</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">ID</th>
                {columns.map((c) => (
                  <th key={c.key} className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/30">
                  <td className="p-3 flex gap-2">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                    <button onClick={() => setData((prev) => prev.filter((d) => d.id !== item.id))} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 className="w-4 h-4 text-destructive" /></button>
                  </td>
                  <td className="p-3 font-mono text-xs">{item.id}</td>
                  {columns.map((c) => (
                    <td key={c.key} className="p-3">
                      {c.key === "status" || c.key === "statusMaster" ? (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/30">{item[c.key]}</Badge>
                      ) : (
                        String(item[c.key] ?? "")
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={columns.length + 2} className="p-8 text-center text-muted-foreground">No records found</td></tr>
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? `Edit ${title.replace(/s$/, "")}` : `Add ${title.replace(/s$/, "")}`}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.key} className={field.type === "textarea" ? "col-span-2" : ""}>
                  <Label className="text-xs">{field.label} {field.required && <span className="text-destructive">*</span>}</Label>
                  {field.type === "select" ? (
                    <Select value={form[field.key] || ""} onValueChange={(v) => setForm({ ...form, [field.key]: v })}>
                      <SelectTrigger><SelectValue placeholder={field.placeholder || `Select ${field.label}`} /></SelectTrigger>
                      <SelectContent>{(field.options || []).map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                  ) : field.type === "textarea" ? (
                    <Textarea value={form[field.key] || ""} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} placeholder={field.placeholder} />
                  ) : (
                    <Input
                      type={field.type === "date" ? "date" : field.type}
                      placeholder={field.placeholder}
                      value={form[field.key] ?? ""}
                      onChange={(e) => setForm({ ...form, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value })}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground">{editing ? "Update" : "Create"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
