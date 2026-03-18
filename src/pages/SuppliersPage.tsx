import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  tinNumber: string;
  country: string;
  status: string;
  remarks: string;
}

const initialSuppliers: Supplier[] = [
  { id: "SUP001", name: "Kilimo Bora Suppliers", contactPerson: "John Mwangi", phone: "+255 754 123456", email: "john@kilimobora.co.tz", address: "Dar es Salaam", tinNumber: "TIN-1234567", country: "Tanzania", status: "Active", remarks: "" },
  { id: "SUP002", name: "Agro-Inputs Ltd", contactPerson: "Sarah Kimani", phone: "+255 712 654321", email: "sarah@agroinputs.co.tz", address: "Arusha", tinNumber: "TIN-7654321", country: "Tanzania", status: "Active", remarks: "" },
  { id: "SUP003", name: "Mbeya Rice Mills", contactPerson: "Ali Hassan", phone: "+255 762 111222", email: "ali@mbeyarice.co.tz", address: "Mbeya", tinNumber: "TIN-9876543", country: "Tanzania", status: "Active", remarks: "" },
  { id: "SUP004", name: "Sun Valley Farms", contactPerson: "Grace Mushi", phone: "+255 789 333444", email: "grace@sunvalley.co.tz", address: "Morogoro", tinNumber: "TIN-1122334", country: "Tanzania", status: "Active", remarks: "" },
];

const emptySupplier: Omit<Supplier, "id"> = { name: "", contactPerson: "", phone: "", email: "", address: "", tinNumber: "", country: "Tanzania", status: "Active", remarks: "" };

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [form, setForm] = useState(emptySupplier);

  const filtered = suppliers.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing(null); setForm(emptySupplier); setDialogOpen(true); };
  const openEdit = (s: Supplier) => { setEditing(s); setForm({ ...s }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.name) return;
    if (editing) {
      setSuppliers((prev) => prev.map((s) => s.id === editing.id ? { ...s, ...form } : s));
    } else {
      setSuppliers((prev) => [...prev, { id: `SUP${String(prev.length + 1).padStart(3, "0")}`, ...form }]);
    }
    setDialogOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Suppliers</h1>
          <p className="text-sm text-muted-foreground">Manage your supplier network</p>
        </div>
        <Button onClick={openAdd} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Add Supplier
        </Button>
      </div>

      <div className="bg-card rounded-xl border p-6">
        <div className="relative mb-4 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search suppliers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Actions</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">ID</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Supplier Name</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Contact</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Phone</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">TIN</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Location</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b hover:bg-muted/30">
                  <td className="p-3 flex gap-2">
                    <button onClick={() => openEdit(s)} className="p-1.5 rounded hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                    <button onClick={() => setSuppliers(prev => prev.filter(x => x.id !== s.id))} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 className="w-4 h-4 text-destructive" /></button>
                  </td>
                  <td className="p-3 font-mono text-xs">{s.id}</td>
                  <td className="p-3 font-medium">{s.name}</td>
                  <td className="p-3">{s.contactPerson}</td>
                  <td className="p-3">{s.phone}</td>
                  <td className="p-3 font-mono text-xs">{s.tinNumber}</td>
                  <td className="p-3">{s.address}</td>
                  <td className="p-3"><Badge variant="outline" className="bg-success/10 text-success border-success/30">{s.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Supplier" : "Add Supplier"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Supplier Name <span className="text-destructive">*</span></Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Contact Person</Label><Input value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} /></div>
              <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Email</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              <div><Label>TIN Number</Label><Input value={form.tinNumber} onChange={(e) => setForm({ ...form, tinNumber: e.target.value })} /></div>
            </div>
            <div><Label>Address</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
            <div><Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="Inactive">Inactive</SelectItem></SelectContent>
              </Select>
            </div>
            <div><Label>Remarks</Label><Textarea value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} /></div>
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
