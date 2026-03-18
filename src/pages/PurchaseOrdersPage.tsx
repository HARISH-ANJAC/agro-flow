import { useState } from "react";
import { Plus, Search, Eye, Pencil, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface PurchaseOrder {
  id: string;
  poNumber: string;
  date: string;
  supplier: string;
  store: string;
  type: string;
  payment: string;
  amount: number;
  status: string;
}

const statusColors: Record<string, string> = {
  Approved: "bg-success/10 text-success border-success/30",
  Submitted: "bg-warning/10 text-warning border-warning/30",
  Completed: "bg-success/10 text-success border-success/30",
  Draft: "bg-muted text-muted-foreground border-border",
  "In-Approval": "bg-warning/10 text-warning border-warning/30",
  Rejected: "bg-destructive/10 text-destructive border-destructive/30",
};

const initialPOs: PurchaseOrder[] = [
  { id: "1", poNumber: "PO/MA/02/001", date: "2/1/2024", supplier: "Kilimo Bora Suppliers", store: "Dar es Salaam Main Warehouse", type: "Local", payment: "Bank Transfer", amount: 57230, status: "Approved" },
  { id: "2", poNumber: "PO/FE/02/002", date: "2/5/2024", supplier: "Agro-Inputs Ltd", store: "Dar es Salaam Main Warehouse", type: "Local", payment: "Bank Transfer", amount: 35400, status: "Approved" },
  { id: "3", poNumber: "PO/RI/03/003", date: "3/1/2024", supplier: "Mbeya Rice Mills", store: "Dar es Salaam Main Warehouse", type: "Local", payment: "Bank Transfer", amount: 77160, status: "Submitted" },
  { id: "4", poNumber: "PO/WH/03/004", date: "3/5/2024", supplier: "Sun Valley Farms", store: "Dar es Salaam Main Warehouse", type: "Local", payment: "Cheque", amount: 39260, status: "Approved" },
  { id: "5", poNumber: "PO/BE/03/005", date: "3/8/2024", supplier: "Kigoma Pulse Exporters", store: "Dar es Salaam Main Warehouse", type: "Local", payment: "Bank Transfer", amount: 23030, status: "Completed" },
  { id: "6", poNumber: "PO/MA/03/006", date: "3/10/2024", supplier: "Kilimo Bora Suppliers", store: "Dar es Salaam Main Warehouse", type: "Local", payment: "Bank Transfer", amount: 31000, status: "Draft" },
  { id: "7", poNumber: "PO/FE/03/007", date: "3/12/2024", supplier: "Agro-Inputs Ltd", store: "Dar es Salaam Main Warehouse", type: "Local", payment: "Bank Transfer", amount: 52060, status: "In-Approval" },
  { id: "8", poNumber: "PO/WH/03/008", date: "3/14/2024", supplier: "Sun Valley Farms", store: "Dar es Salaam Main Warehouse", type: "Local", payment: "Bank Transfer", amount: 25780, status: "Rejected" },
];

export default function PurchaseOrdersPage() {
  const [orders] = useState<PurchaseOrder[]>(initialPOs);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = orders.filter((o) =>
    o.poNumber.toLowerCase().includes(search.toLowerCase()) ||
    o.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Purchase Orders</h1>
          <p className="text-sm text-muted-foreground">Create and manage purchase orders for commodities</p>
        </div>
        <Button onClick={() => navigate("/purchase-orders/create")} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> New Purchase Order
        </Button>
      </div>

      <div className="bg-card rounded-xl border p-6">
        <div className="relative mb-4 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search purchase orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 w-8"><input type="checkbox" className="rounded" /></th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Actions</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">PO Number</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Date</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Supplier</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Store</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Type</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Payment</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Amount</th>
                <th className="text-left p-3 font-semibold text-muted-foreground uppercase text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b hover:bg-muted/30">
                  <td className="p-3"><input type="checkbox" className="rounded" /></td>
                  <td className="p-3">
                    <div className="flex gap-1.5">
                      <button className="p-1 rounded hover:bg-muted"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                      <button className="p-1 rounded hover:bg-muted"><FileText className="w-4 h-4 text-muted-foreground" /></button>
                      <button className="p-1 rounded hover:bg-muted"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
                      <button className="p-1 rounded hover:bg-destructive/10"><Trash2 className="w-4 h-4 text-destructive" /></button>
                    </div>
                  </td>
                  <td className="p-3 font-mono text-xs font-medium">{o.poNumber}</td>
                  <td className="p-3">{o.date}</td>
                  <td className="p-3">{o.supplier}</td>
                  <td className="p-3 text-xs">{o.store}</td>
                  <td className="p-3">{o.type}</td>
                  <td className="p-3">{o.payment}</td>
                  <td className="p-3 font-medium">${o.amount.toLocaleString()}</td>
                  <td className="p-3"><Badge variant="outline" className={statusColors[o.status] || ""}>{o.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
