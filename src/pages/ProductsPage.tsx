import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  unit: string;
  qtyPerPack: number;
  altUnit: string;
  status: string;
  remarks: string;
  shortCode: string;
}

const initialProducts: Product[] = [
  { id: "PRD001", name: "White Maize – Grade A", category: "Grains", subCategory: "Maize", unit: "KG", qtyPerPack: 50, altUnit: "BAG", status: "Active", remarks: "", shortCode: "MA" },
  { id: "PRD002", name: "Yellow Maize – Standard", category: "Grains", subCategory: "Maize", unit: "KG", qtyPerPack: 50, altUnit: "BAG", status: "Active", remarks: "", shortCode: "MA" },
  { id: "PRD003", name: "Hard Wheat", category: "Grains", subCategory: "Wheat", unit: "KG", qtyPerPack: 50, altUnit: "BAG", status: "Active", remarks: "", shortCode: "WH" },
  { id: "PRD004", name: "IR64 Rice", category: "Grains", subCategory: "Rice", unit: "KG", qtyPerPack: 25, altUnit: "BAG", status: "Active", remarks: "", shortCode: "RI" },
  { id: "PRD005", name: "Red Kidney Beans", category: "Pulses", subCategory: "Beans", unit: "KG", qtyPerPack: 50, altUnit: "BAG", status: "Active", remarks: "", shortCode: "BE" },
  { id: "PRD006", name: "NPK 17:17:17", category: "Fertilizers", subCategory: "NPK Fertilizer", unit: "KG", qtyPerPack: 50, altUnit: "BAG", status: "Active", remarks: "", shortCode: "FE" },
];

const categories = ["Grains", "Pulses", "Fertilizers", "Seeds", "Spices"];
const subCategories: Record<string, string[]> = {
  Grains: ["Maize", "Wheat", "Rice", "Sorghum"],
  Pulses: ["Beans", "Lentils", "Chickpeas"],
  Fertilizers: ["NPK Fertilizer", "Urea", "DAP"],
  Seeds: ["Hybrid Seeds", "Open Pollinated"],
  Spices: ["Karafu", "Pilipili", "Cardamom"],
};

const emptyProduct: Omit<Product, "id"> = {
  name: "", category: "", subCategory: "", unit: "", qtyPerPack: 0, altUnit: "", status: "Active", remarks: "", shortCode: "",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyProduct);
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({ name: product.name, category: product.category, subCategory: product.subCategory, unit: product.unit, qtyPerPack: product.qtyPerPack, altUnit: product.altUnit, status: product.status, remarks: product.remarks, shortCode: product.shortCode });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.category) return;
    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? { ...p, ...form } : p)));
    } else {
      const newId = `PRD${String(products.length + 1).padStart(3, "0")}`;
      setProducts((prev) => [...prev, { id: newId, ...form }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground">Manage your agricultural commodities catalog</p>
        </div>
        <Button onClick={openAdd} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      <div className="bg-card rounded-xl border p-6">
        <div className="relative mb-4 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Actions</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">ID</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Product Name</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Category</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Sub Category</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Unit</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Qty/Pack</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Alt. Unit</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b hover:bg-muted/30">
                  <td className="p-3 flex gap-2">
                    <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 className="w-4 h-4 text-destructive" /></button>
                  </td>
                  <td className="p-3 font-mono text-xs">{p.id}</td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{p.subCategory}</td>
                  <td className="p-3">{p.unit}</td>
                  <td className="p-3">{p.qtyPerPack}</td>
                  <td className="p-3">{p.altUnit}</td>
                  <td className="p-3"><Badge variant="outline" className="bg-success/10 text-success border-success/30">{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            <p className="text-sm text-muted-foreground">{editingProduct ? "Update product details" : "Add a new product to the catalog"}</p>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Product Name <span className="text-destructive">*</span></Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category <span className="text-destructive">*</span></Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v, subCategory: "" })}>
                  <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                  <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Sub Category <span className="text-destructive">*</span></Label>
                <Select value={form.subCategory} onValueChange={(v) => setForm({ ...form, subCategory: v })}>
                  <SelectTrigger><SelectValue placeholder="Select Sub Category" /></SelectTrigger>
                  <SelectContent>{(subCategories[form.category] || []).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Unit of Measure <span className="text-destructive">*</span></Label>
                <Input placeholder="e.g. MT, KG" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
              </div>
              <div>
                <Label>Qty per Pack <span className="text-destructive">*</span></Label>
                <Input type="number" value={form.qtyPerPack} onChange={(e) => setForm({ ...form, qtyPerPack: Number(e.target.value) })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Alternate Unit</Label>
                <Input value={form.altUnit} onChange={(e) => setForm({ ...form, altUnit: e.target.value })} />
              </div>
              <div>
                <Label>Short Code</Label>
                <Input placeholder="e.g. MA, RI" value={form.shortCode} onChange={(e) => setForm({ ...form, shortCode: e.target.value.toUpperCase() })} maxLength={2} />
              </div>
            </div>
            <div>
              <Label>Status <span className="text-destructive">*</span></Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Remarks</Label>
              <Textarea value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-primary text-primary-foreground">{editingProduct ? "Update" : "Create"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
