import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Customer {
  id: string;
  name: string;
  tinNumber: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  region: string;
  paymentMode: string;
  creditLimit: number;
  status: string;
  remarks: string;
}

const initialCustomers: Customer[] = [
  { id: "CUS001", name: "Metro Foods Inc", tinNumber: "TIN-5551234", contactPerson: "David Mgonja", phone: "+255 754 999888", email: "david@metrofoods.co.tz", address: "Dar es Salaam", region: "Dar es Salaam", paymentMode: "Bank Transfer", creditLimit: 500000, status: "Active", remarks: "" },
  { id: "CUS002", name: "East Africa Traders", tinNumber: "TIN-5559876", contactPerson: "Amina Rashid", phone: "+255 712 777666", email: "amina@eatraders.co.tz", address: "Mwanza", region: "Mwanza", paymentMode: "Cheque", creditLimit: 300000, status: "Active", remarks: "" },
  { id: "CUS003", name: "Green Valley Farms", tinNumber: "TIN-5554567", contactPerson: "Peter Kato", phone: "+255 789 555444", email: "peter@greenvalley.co.tz", address: "Arusha", region: "Arusha", paymentMode: "Cash", creditLimit: 200000, status: "Active", remarks: "" },
];

const emptyCustomer: Omit<Customer, "id"> = { name: "", tinNumber: "", contactPerson: "", phone: "", email: "", address: "", region: "", paymentMode: "Bank Transfer", creditLimit: 0, status: "Active", remarks: "" };

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState(emptyCustomer);

  const filtered = customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing(null); setForm(emptyCustomer); setDialogOpen(true); };
  const openEdit = (c: Customer) => { setEditing(c); setForm({ ...c }); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.name || !form.tinNumber) return;
    if (editing) {
      setCustomers((prev) => prev.map((c) => c.id === editing.id ? { ...c, ...form } : c));
    } else {
      setCustomers((prev) => [...prev, { id: `CUS${String(prev.length + 1).padStart(3, "0")}`, ...form }]);
    }
    setDialogOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customers</h1>
          <p className="text-sm text-muted-foreground">Manage your customer database</p>
        </div>
        <Button onClick={openAdd} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Add Customer
        </Button>
      </div>

      <div className="bg-card rounded-xl border p-6">
        <div className="relative mb-4 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Actions</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">ID</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Customer Name</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">TIN</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Contact</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Phone</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Region</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Payment</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Credit Limit</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b hover:bg-muted/30">
                  <td className="p-3 flex gap-2">
                    <button onClick={() => openEdit(c)} className="p-1.5 rounded hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                    <button onClick={() => setCustomers(prev => prev.filter(x => x.id !== c.id))} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 className="w-4 h-4 text-destructive" /></button>
                  </td>
                  <td className="p-3 font-mono text-xs">{c.id}</td>
                  <td className="p-3 font-medium">{c.name}</td>
                  <td className="p-3 font-mono text-xs">{c.tinNumber}</td>
                  <td className="p-3">{c.contactPerson}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">{c.region}</td>
                  <td className="p-3">{c.paymentMode}</td>
                  <td className="p-3">${c.creditLimit.toLocaleString()}</td>
                  <td className="p-3"><Badge variant="outline" className="bg-success/10 text-success border-success/30">{c.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? "Edit Customer" : "Add Customer"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Customer Name <span className="text-destructive">*</span></Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>TIN Number <span className="text-destructive">*</span></Label><Input value={form.tinNumber} onChange={(e) => setForm({ ...form, tinNumber: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Contact Person</Label><Input value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} /></div>
              <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            </div>
            <div><Label>Email</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Address</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
              <div><Label>Region</Label><Input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Payment Mode</Label>
                <Select value={form.paymentMode} onValueChange={(v) => setForm({ ...form, paymentMode: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Cheque">Cheque</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Credit Limit</Label><Input type="number" value={form.creditLimit} onChange={(e) => setForm({ ...form, creditLimit: Number(e.target.value) })} /></div>
            </div>
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
