import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// Generic master CRUD page
interface MasterField {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "textarea";
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

export default function MasterCrudPage({ title, description, idPrefix, fields, initialData, columns }: MasterPageProps) {
  const [data, setData] = useState<Record<string, any>[]>(initialData);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});

  const filtered = data.filter((d) => {
    const searchable = columns.map((c) => String(d[c.key] || "").toLowerCase()).join(" ");
    return searchable.includes(search.toLowerCase());
  });

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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button onClick={openAdd} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Add {title.replace(/s$/, "")}
        </Button>
      </div>

      <div className="bg-card rounded-xl border p-6">
        <div className="relative mb-4 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder={`Search ${title.toLowerCase()}...`} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
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
              {filtered.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/30">
                  <td className="p-3 flex gap-2">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                    <button onClick={() => setData((prev) => prev.filter((d) => d.id !== item.id))} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 className="w-4 h-4 text-destructive" /></button>
                  </td>
                  <td className="p-3 font-mono text-xs">{item.id}</td>
                  {columns.map((c) => (
                    <td key={c.key} className="p-3">
                      {c.key === "status" ? (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/30">{item[c.key]}</Badge>
                      ) : (
                        String(item[c.key] || "")
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={columns.length + 2} className="p-8 text-center text-muted-foreground">No records found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? `Edit ${title.replace(/s$/, "")}` : `Add ${title.replace(/s$/, "")}`}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.key}>
                <Label>{field.label} {field.required && <span className="text-destructive">*</span>}</Label>
                {field.type === "select" ? (
                  <Select value={form[field.key] || ""} onValueChange={(v) => setForm({ ...form, [field.key]: v })}>
                    <SelectTrigger><SelectValue placeholder={field.placeholder || `Select ${field.label}`} /></SelectTrigger>
                    <SelectContent>{(field.options || []).map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                  </Select>
                ) : field.type === "textarea" ? (
                  <Textarea value={form[field.key] || ""} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} />
                ) : (
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key] || ""}
                    onChange={(e) => setForm({ ...form, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value })}
                  />
                )}
              </div>
            ))}
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
