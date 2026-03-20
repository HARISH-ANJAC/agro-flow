import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Send, Plus, Trash2, Upload, MessageSquare, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LineItem {
  id: number;
  requestStoreId: string;
  mainCategory: string;
  subCategory: string;
  product: string;
  qtyPerPacking: number;
  totalQty: number;
  uom: string;
  totalPacking: number;
  alternateUom: string;
  ratePerQty: number;
  productAmount: number;
  discountPercentage: number;
  discountAmount: number;
  totalProductAmount: number;
  vatPercentage: number;
  vatAmount: number;
  finalProductAmount: number;
  remarks: string;
}

interface AdditionalCost {
  id: number;
  additionalCostType: string;
  additionalCostAmount: number;
  remarks: string;
}

interface FileUpload {
  id: number;
  documentType: string;
  descriptionDetails: string;
  fileName: string;
  remarks: string;
}

interface ConversationEntry {
  id: number;
  respondPerson: string;
  discussionDetails: string;
  responseStatus: string;
  remarks: string;
  createdDate: string;
}

const products = [
  { name: "White Maize – Grade A", code: "MA", category: "Grains", sub: "Maize", uom: "KG" },
  { name: "IR64 Rice", code: "RI", category: "Grains", sub: "Rice", uom: "KG" },
  { name: "Hard Wheat", code: "WH", category: "Grains", sub: "Wheat", uom: "KG" },
  { name: "Red Kidney Beans", code: "BE", category: "Pulses", sub: "Beans", uom: "KG" },
  { name: "NPK 17:17:17", code: "FE", category: "Fertilizers", sub: "NPK Fertilizer", uom: "KG" },
  { name: "Karafu (Cloves)", code: "KA", category: "Spices", sub: "Karafu", uom: "KG" },
  { name: "Sesame Seeds", code: "SE", category: "Oil Seeds", sub: "Sesame", uom: "KG" },
  { name: "Cashew Nuts Raw", code: "CA", category: "Nuts", sub: "Cashew", uom: "KG" },
];

const suppliers = ["Kilimo Bora Suppliers", "Agro-Inputs Ltd", "Mbeya Rice Mills", "Sun Valley Farms", "Kigoma Pulse Exporters", "Zanzibar Spice Traders"];
const companies = ["AgroTanzania Ltd"];
const stores = ["Dar es Salaam Main Warehouse", "Mbeya Storage Facility"];
const paymentTerms = ["Cash on Delivery", "Net 30 Days", "Net 60 Days", "Advance Payment"];
const currencies = ["USD ($)", "TZS", "EUR (€)"];
const shipmentModes = ["Road Transport", "Rail", "Sea", "Air"];
const costTypes = ["Transportation Cost", "Loading/Offloading", "Insurance", "Customs Duty", "Fumigation", "Warehouse Charges", "Port Charges"];
const documentTypes = ["Quotation", "Proforma Invoice", "TRA EFD Receipt", "Quality Certificate", "Weight Certificate", "Bill of Lading", "Other"];

export default function CreatePurchaseOrderPage() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  // === HEADER STATE (TBL_PURCHASE_ORDER_HDR) ===
  const [header, setHeader] = useState({
    poDate: today,
    purchaseType: "Local Purchase",
    companyId: "AgroTanzania Ltd",
    supplierId: "",
    poStoreId: "Dar es Salaam Main Warehouse",
    paymentTermId: "Net 30 Days",
    modeOfPayment: "Bank Transfer",
    currencyId: "USD ($)",
    supplierProformaNumber: "",
    shipmentMode: "Road Transport",
    priceTerms: "FOB",
    estimatedShipmentDate: "",
    shipmentRemarks: "",
    exchangeRate: "2650",
    remarks: "",
  });

  // === ITEM DETAILS STATE (TBL_PURCHASE_ORDER_DTL) ===
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, requestStoreId: "Dar es Salaam Main Warehouse", mainCategory: "", subCategory: "", product: "", qtyPerPacking: 0, totalQty: 0, uom: "KG", totalPacking: 0, alternateUom: "", ratePerQty: 0, productAmount: 0, discountPercentage: 0, discountAmount: 0, totalProductAmount: 0, vatPercentage: 18, vatAmount: 0, finalProductAmount: 0, remarks: "" },
  ]);

  // === ADDITIONAL COST STATE (TBL_PURCHASE_ORDER_ADDITIONAL_COST_DETAILS) ===
  const [additionalCosts, setAdditionalCosts] = useState<AdditionalCost[]>([
    { id: 1, additionalCostType: "Transportation Cost", additionalCostAmount: 0, remarks: "" },
  ]);

  // === FILES STATE (TBL_PURCHASE_ORDER_FILES_UPLOAD) ===
  const [files, setFiles] = useState<FileUpload[]>([]);

  // === CONVERSATION STATE (TBL_PURCHASE_ORDER_CONVERSATION_DTL) ===
  const [conversations, setConversations] = useState<ConversationEntry[]>([]);
  const [newConversation, setNewConversation] = useState("");

  const addItem = () => {
    setItems(prev => [...prev, { id: prev.length + 1, requestStoreId: header.poStoreId, mainCategory: "", subCategory: "", product: "", qtyPerPacking: 0, totalQty: 0, uom: "KG", totalPacking: 0, alternateUom: "", ratePerQty: 0, productAmount: 0, discountPercentage: 0, discountAmount: 0, totalProductAmount: 0, vatPercentage: 18, vatAmount: 0, finalProductAmount: 0, remarks: "" }]);
  };

  const updateItem = (id: number, field: string, value: string | number) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: value };
      if (field === "product") {
        const p = products.find(pr => pr.name === value);
        if (p) { updated.mainCategory = p.category; updated.subCategory = p.sub; updated.uom = p.uom; }
      }
      // Recalculate amounts per TBL_PURCHASE_ORDER_DTL schema
      updated.productAmount = updated.totalQty * updated.ratePerQty;
      updated.discountAmount = (updated.productAmount * updated.discountPercentage) / 100;
      updated.totalProductAmount = updated.productAmount - updated.discountAmount;
      updated.vatAmount = (updated.totalProductAmount * updated.vatPercentage) / 100;
      updated.finalProductAmount = updated.totalProductAmount + updated.vatAmount;
      if (updated.qtyPerPacking > 0) {
        updated.totalPacking = updated.totalQty / updated.qtyPerPacking;
      }
      return updated;
    }));
  };

  const removeItem = (id: number) => {
    if (items.length > 1) setItems(prev => prev.filter(i => i.id !== id));
  };

  const addConversation = () => {
    if (!newConversation.trim()) return;
    setConversations(prev => [...prev, {
      id: prev.length + 1,
      respondPerson: "Current User",
      discussionDetails: newConversation,
      responseStatus: "Noted",
      remarks: "",
      createdDate: new Date().toLocaleString(),
    }]);
    setNewConversation("");
  };

  // === CALCULATIONS ===
  const productHdrAmount = useMemo(() => items.reduce((sum, i) => sum + i.productAmount, 0), [items]);
  const totalDiscount = useMemo(() => items.reduce((sum, i) => sum + i.discountAmount, 0), [items]);
  const totalProductHdrAmount = useMemo(() => items.reduce((sum, i) => sum + i.totalProductAmount, 0), [items]);
  const totalVatHdrAmount = useMemo(() => items.reduce((sum, i) => sum + i.vatAmount, 0), [items]);
  const totalAdditionalCostAmount = useMemo(() => additionalCosts.reduce((sum, c) => sum + c.additionalCostAmount, 0), [additionalCosts]);
  const finalPurchaseHdrAmount = totalProductHdrAmount + totalVatHdrAmount + totalAdditionalCostAmount;
  const exchangeRate = Number(header.exchangeRate) || 1;
  const finalPurchaseHdrAmountLC = finalPurchaseHdrAmount * exchangeRate;
  const totalItems = items.reduce((sum, i) => sum + i.totalQty, 0);

  // PO Reference auto-generation: PO/[ProductCode]/[Month]/[Serial]
  const selectedProduct = items[0]?.product ? products.find(p => p.name === items[0].product) : null;
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const poRef = selectedProduct ? `PO/${selectedProduct.code}/${month}/---` : "PO/----/--/---";

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/purchase-orders")} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Create Purchase Order</h1>
            <p className="text-sm text-muted-foreground">TBL_PURCHASE_ORDER_HDR + DTL + Additional Costs + Files + Conversations</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right mr-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Reference Number</p>
            <p className="text-lg font-mono font-bold text-accent">{poRef}</p>
          </div>
          <Button variant="outline"><Save className="w-4 h-4 mr-2" /> Save Draft</Button>
          <Button className="bg-primary text-primary-foreground"><Send className="w-4 h-4 mr-2" /> Submit PO</Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* ====== SECTION 1: HEADER DETAILS (TBL_PURCHASE_ORDER_HDR) ====== */}
        <div className="bg-card rounded-xl border p-6">
          <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</span>
            Header Details
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">PO Date *</Label>
              <Input type="date" value={header.poDate} onChange={e => setHeader({ ...header, poDate: e.target.value })} />
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Purchase Type *</Label>
              <Select value={header.purchaseType} onValueChange={v => setHeader({ ...header, purchaseType: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Local Purchase">Local Purchase</SelectItem><SelectItem value="Import">Import</SelectItem></SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Company (COMPANY_ID) *</Label>
              <Select value={header.companyId} onValueChange={v => setHeader({ ...header, companyId: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{companies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Supplier (SUPPLIER_ID) *</Label>
              <Select value={header.supplierId} onValueChange={v => setHeader({ ...header, supplierId: v })}>
                <SelectTrigger><SelectValue placeholder="Select supplier" /></SelectTrigger>
                <SelectContent>{suppliers.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">PO Store (PO_STORE_ID) *</Label>
              <Select value={header.poStoreId} onValueChange={v => setHeader({ ...header, poStoreId: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{stores.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Payment Term (PAYMENT_TERM_ID)</Label>
              <Select value={header.paymentTermId} onValueChange={v => setHeader({ ...header, paymentTermId: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{paymentTerms.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Mode of Payment</Label>
              <Select value={header.modeOfPayment} onValueChange={v => setHeader({ ...header, modeOfPayment: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Cheque">Cheque</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Currency (CURRENCY_ID)</Label>
              <Select value={header.currencyId} onValueChange={v => setHeader({ ...header, currencyId: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Supplier Proforma Number</Label>
              <Input value={header.supplierProformaNumber} onChange={e => setHeader({ ...header, supplierProformaNumber: e.target.value })} placeholder="PRO-XXXX-XXX" />
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Shipment Mode</Label>
              <Select value={header.shipmentMode} onValueChange={v => setHeader({ ...header, shipmentMode: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{shipmentModes.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Estimated Shipment Date</Label>
              <Input type="date" value={header.estimatedShipmentDate} onChange={e => setHeader({ ...header, estimatedShipmentDate: e.target.value })} />
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Price Terms</Label>
              <Input value={header.priceTerms} onChange={e => setHeader({ ...header, priceTerms: e.target.value })} placeholder="FOB / CIF / EXW" />
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Exchange Rate</Label>
              <Input type="number" value={header.exchangeRate} onChange={e => setHeader({ ...header, exchangeRate: e.target.value })} />
            </div>
            <div className="col-span-3">
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Shipment Remarks</Label>
              <Input value={header.shipmentRemarks} onChange={e => setHeader({ ...header, shipmentRemarks: e.target.value })} placeholder="Any shipment-related notes..." />
            </div>
          </div>
        </div>

        {/* ====== SECTION 2: QUAD-TAB LAYOUT ====== */}
        <Tabs defaultValue="items" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="items">📦 Item Details</TabsTrigger>
            <TabsTrigger value="costs">💰 Additional Costs</TabsTrigger>
            <TabsTrigger value="files">📎 Files Upload</TabsTrigger>
            <TabsTrigger value="conversations">💬 Conversations</TabsTrigger>
          </TabsList>

          {/* TAB 1: Item Details (TBL_PURCHASE_ORDER_DTL) */}
          <TabsContent value="items">
            <div className="bg-card rounded-xl border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-foreground">Item Details (TBL_PURCHASE_ORDER_DTL)</h2>
                <Button onClick={addItem} size="sm" className="bg-primary text-primary-foreground"><Plus className="w-4 h-4 mr-1" /> Add Product</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 text-[10px] font-semibold text-muted-foreground uppercase">Product</th>
                      <th className="text-left p-2 text-[10px] font-semibold text-muted-foreground uppercase">Category</th>
                      <th className="text-left p-2 text-[10px] font-semibold text-muted-foreground uppercase">Sub Cat</th>
                      <th className="text-left p-2 text-[10px] font-semibold text-muted-foreground uppercase">Qty/Pack</th>
                      <th className="text-left p-2 text-[10px] font-semibold text-muted-foreground uppercase">Total Qty</th>
                      <th className="text-left p-2 text-[10px] font-semibold text-muted-foreground uppercase">UOM</th>
                      <th className="text-left p-2 text-[10px] font-semibold text-muted-foreground uppercase">Total Pack</th>
                      <th className="text-left p-2 text-[10px] font-semibold text-muted-foreground uppercase">Rate/Qty</th>
                      <th className="text-left p-2 text-[10px] font-semibold text-muted-foreground uppercase">Amount</th>
                      <th className="text-left p-2 text-[10px] font-semibold text-muted-foreground uppercase">Disc %</th>
                      <th className="text-left p-2 text-[10px] font-semibold text-muted-foreground uppercase">VAT %</th>
                      <th className="text-left p-2 text-[10px] font-semibold text-muted-foreground uppercase">Final Amt</th>
                      <th className="p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id} className="border-b">
                        <td className="p-2">
                          <Select value={item.product} onValueChange={v => updateItem(item.id, "product", v)}>
                            <SelectTrigger className="min-w-[150px]"><SelectValue placeholder="Select Product" /></SelectTrigger>
                            <SelectContent>{products.map(p => <SelectItem key={p.name} value={p.name}>{p.name}</SelectItem>)}</SelectContent>
                          </Select>
                        </td>
                        <td className="p-2 text-xs text-muted-foreground">{item.mainCategory}</td>
                        <td className="p-2 text-xs text-muted-foreground">{item.subCategory}</td>
                        <td className="p-2"><Input type="number" className="w-16" value={item.qtyPerPacking || ""} onChange={e => updateItem(item.id, "qtyPerPacking", Number(e.target.value))} /></td>
                        <td className="p-2"><Input type="number" className="w-20" value={item.totalQty || ""} onChange={e => updateItem(item.id, "totalQty", Number(e.target.value))} /></td>
                        <td className="p-2 text-xs">{item.uom}</td>
                        <td className="p-2 text-xs tabular-nums">{item.totalPacking.toFixed(1)}</td>
                        <td className="p-2"><Input type="number" className="w-24" step="0.01" value={item.ratePerQty || ""} onChange={e => updateItem(item.id, "ratePerQty", Number(e.target.value))} /></td>
                        <td className="p-2 font-medium tabular-nums">{item.productAmount.toFixed(2)}</td>
                        <td className="p-2"><Input type="number" className="w-14" value={item.discountPercentage || ""} onChange={e => updateItem(item.id, "discountPercentage", Number(e.target.value))} /></td>
                        <td className="p-2"><Input type="number" className="w-14" value={item.vatPercentage} onChange={e => updateItem(item.id, "vatPercentage", Number(e.target.value))} /></td>
                        <td className="p-2 font-medium tabular-nums text-accent">{item.finalProductAmount.toFixed(2)}</td>
                        <td className="p-2"><button onClick={() => removeItem(item.id)} className="p-1 rounded hover:bg-destructive/10"><Trash2 className="w-4 h-4 text-destructive" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: Additional Costs (TBL_PURCHASE_ORDER_ADDITIONAL_COST_DETAILS) */}
          <TabsContent value="costs">
            <div className="bg-card rounded-xl border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-foreground">Additional Cost Details</h2>
                <Button onClick={() => setAdditionalCosts(prev => [...prev, { id: prev.length + 1, additionalCostType: "", additionalCostAmount: 0, remarks: "" }])} size="sm" variant="outline"><Plus className="w-4 h-4 mr-1" /> Add Cost</Button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 text-[10px] font-semibold text-muted-foreground uppercase">Cost Type (ADDITIONAL_COST_TYPE_ID)</th>
                    <th className="text-left p-3 text-[10px] font-semibold text-muted-foreground uppercase">Amount</th>
                    <th className="text-left p-3 text-[10px] font-semibold text-muted-foreground uppercase">Remarks</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {additionalCosts.map(cost => (
                    <tr key={cost.id} className="border-b">
                      <td className="p-3">
                        <Select value={cost.additionalCostType} onValueChange={v => setAdditionalCosts(prev => prev.map(c => c.id === cost.id ? { ...c, additionalCostType: v } : c))}>
                          <SelectTrigger><SelectValue placeholder="Select cost type" /></SelectTrigger>
                          <SelectContent>{costTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                        </Select>
                      </td>
                      <td className="p-3"><Input type="number" className="w-32" value={cost.additionalCostAmount || ""} onChange={e => setAdditionalCosts(prev => prev.map(c => c.id === cost.id ? { ...c, additionalCostAmount: Number(e.target.value) } : c))} /></td>
                      <td className="p-3"><Input value={cost.remarks} onChange={e => setAdditionalCosts(prev => prev.map(c => c.id === cost.id ? { ...c, remarks: e.target.value } : c))} placeholder="Remarks" /></td>
                      <td className="p-3"><button onClick={() => setAdditionalCosts(prev => prev.filter(c => c.id !== cost.id))} className="p-1 rounded hover:bg-destructive/10"><Trash2 className="w-4 h-4 text-destructive" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* TAB 3: Files Upload (TBL_PURCHASE_ORDER_FILES_UPLOAD) */}
          <TabsContent value="files">
            <div className="bg-card rounded-xl border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-foreground">Supporting Documents</h2>
                <Button onClick={() => setFiles(prev => [...prev, { id: prev.length + 1, documentType: "", descriptionDetails: "", fileName: "", remarks: "" }])} size="sm" variant="outline"><Plus className="w-4 h-4 mr-1" /> Add File Entry</Button>
              </div>
              {files.length === 0 ? (
                <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center">
                  <FileUp className="w-10 h-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium text-foreground">Click "Add File Entry" to add document records</p>
                  <p className="text-xs text-muted-foreground mt-1">Supported: Quotations, Proforma Invoices, TRA EFD Receipts, Quality Certificates</p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 text-[10px] font-semibold text-muted-foreground uppercase">Document Type</th>
                      <th className="text-left p-3 text-[10px] font-semibold text-muted-foreground uppercase">Description</th>
                      <th className="text-left p-3 text-[10px] font-semibold text-muted-foreground uppercase">File Name</th>
                      <th className="text-left p-3 text-[10px] font-semibold text-muted-foreground uppercase">Remarks</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map(file => (
                      <tr key={file.id} className="border-b">
                        <td className="p-3">
                          <Select value={file.documentType} onValueChange={v => setFiles(prev => prev.map(f => f.id === file.id ? { ...f, documentType: v } : f))}>
                            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                            <SelectContent>{documentTypes.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                          </Select>
                        </td>
                        <td className="p-3"><Input value={file.descriptionDetails} onChange={e => setFiles(prev => prev.map(f => f.id === file.id ? { ...f, descriptionDetails: e.target.value } : f))} placeholder="Description" /></td>
                        <td className="p-3"><Input value={file.fileName} onChange={e => setFiles(prev => prev.map(f => f.id === file.id ? { ...f, fileName: e.target.value } : f))} placeholder="file.pdf" /></td>
                        <td className="p-3"><Input value={file.remarks} onChange={e => setFiles(prev => prev.map(f => f.id === file.id ? { ...f, remarks: e.target.value } : f))} placeholder="Remarks" /></td>
                        <td className="p-3"><button onClick={() => setFiles(prev => prev.filter(f => f.id !== file.id))} className="p-1 rounded hover:bg-destructive/10"><Trash2 className="w-4 h-4 text-destructive" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </TabsContent>

          {/* TAB 4: Conversations (TBL_PURCHASE_ORDER_CONVERSATION_DTL) */}
          <TabsContent value="conversations">
            <div className="bg-card rounded-xl border p-6">
              <h2 className="text-base font-semibold text-foreground mb-4">Conversation & Approval Notes</h2>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {conversations.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No conversation entries yet</p>
                ) : conversations.map(c => (
                  <div key={c.id} className="bg-muted/50 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-semibold">{c.respondPerson}</span>
                      <span className="text-[10px] text-muted-foreground">{c.createdDate}</span>
                    </div>
                    <p className="text-sm">{c.discussionDetails}</p>
                    <span className="text-[10px] text-accent">{c.responseStatus}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Textarea value={newConversation} onChange={e => setNewConversation(e.target.value)} placeholder="Add a note or discussion entry..." className="flex-1" />
                <Button onClick={addConversation} size="sm" className="self-end"><MessageSquare className="w-4 h-4 mr-1" /> Add</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* ====== SECTION 3: SUMMARY + REMARKS ====== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border p-6">
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">General Remarks</Label>
              <Textarea value={header.remarks} onChange={e => setHeader({ ...header, remarks: e.target.value })} placeholder="Any general remarks for this PO..." rows={3} />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-primary rounded-xl p-6 text-primary-foreground h-fit">
            <h2 className="text-base font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Product Amount</span><span className="font-medium tabular-nums">{productHdrAmount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Total Discount</span><span className="font-medium text-accent tabular-nums">-{totalDiscount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Net Product Amount</span><span className="font-medium tabular-nums">{totalProductHdrAmount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Total VAT</span><span className="font-medium tabular-nums">{totalVatHdrAmount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Additional Costs</span><span className="font-medium tabular-nums">{totalAdditionalCostAmount.toFixed(2)}</span></div>
            </div>
            <div className="border-t border-primary-foreground/20 mt-4 pt-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-wider opacity-70">Grand Total</p>
                  <p className="text-3xl font-bold tabular-nums">{finalPurchaseHdrAmount.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider opacity-70">Total Items</p>
                  <p className="text-2xl font-bold tabular-nums">{totalItems}</p>
                </div>
              </div>
              {exchangeRate !== 1 && (
                <div className="mt-3 pt-3 border-t border-primary-foreground/20">
                  <p className="text-[10px] uppercase tracking-wider opacity-70">Amount in Local Currency (LC)</p>
                  <p className="text-xl font-bold tabular-nums">{finalPurchaseHdrAmountLC.toLocaleString()}</p>
                </div>
              )}
            </div>
            <Button className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              Confirm and Submit PO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
