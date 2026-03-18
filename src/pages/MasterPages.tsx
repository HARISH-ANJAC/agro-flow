import MasterCrudPage from "@/components/MasterCrudPage";

// Categories
export function CategoriesPage() {
  return <MasterCrudPage title="Categories" description="Manage product categories" idPrefix="CAT" fields={[
    { key: "name", label: "Category Name", type: "text", required: true },
    { key: "description", label: "Description", type: "text" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
    { key: "remarks", label: "Remarks", type: "textarea" },
  ]} initialData={[
    { id: "CAT001", name: "Grains", description: "Cereal grains", status: "Active" },
    { id: "CAT002", name: "Pulses", description: "Legumes and beans", status: "Active" },
    { id: "CAT003", name: "Fertilizers", description: "Agricultural fertilizers", status: "Active" },
    { id: "CAT004", name: "Seeds", description: "Planting seeds", status: "Active" },
    { id: "CAT005", name: "Spices", description: "Spices and herbs", status: "Active" },
  ]} columns={[
    { key: "name", label: "Name" }, { key: "description", label: "Description" }, { key: "status", label: "Status" },
  ]} />;
}

// Companies
export function CompaniesPage() {
  return <MasterCrudPage title="Companies" description="Manage company entities" idPrefix="CMP" fields={[
    { key: "name", label: "Company Name", type: "text", required: true },
    { key: "address", label: "Address", type: "text" },
    { key: "phone", label: "Phone", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "tinNumber", label: "TIN Number", type: "text" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "CMP001", name: "AgroTanzania Ltd", address: "Dar es Salaam", phone: "+255 22 123456", email: "info@agrotanzania.co.tz", tinNumber: "TIN-001", status: "Active" },
  ]} columns={[
    { key: "name", label: "Name" }, { key: "address", label: "Address" }, { key: "phone", label: "Phone" }, { key: "tinNumber", label: "TIN" }, { key: "status", label: "Status" },
  ]} />;
}

// Stores
export function StoresPage() {
  return <MasterCrudPage title="Stores" description="Manage warehouse and store locations" idPrefix="STR" fields={[
    { key: "name", label: "Store Name", type: "text", required: true },
    { key: "location", label: "Location", type: "text" },
    { key: "manager", label: "Manager", type: "text" },
    { key: "capacity", label: "Capacity (MT)", type: "number" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "STR001", name: "Dar es Salaam Main Warehouse", location: "Dar es Salaam", manager: "James Kondo", capacity: 5000, status: "Active" },
    { id: "STR002", name: "Mbeya Storage Facility", location: "Mbeya", manager: "Rose Mwita", capacity: 3000, status: "Active" },
  ]} columns={[
    { key: "name", label: "Name" }, { key: "location", label: "Location" }, { key: "manager", label: "Manager" }, { key: "capacity", label: "Capacity" }, { key: "status", label: "Status" },
  ]} />;
}

// Employees
export function EmployeesPage() {
  return <MasterCrudPage title="Employees" description="Manage staff records" idPrefix="EMP" fields={[
    { key: "name", label: "Full Name", type: "text", required: true },
    { key: "role", label: "Role", type: "text" },
    { key: "department", label: "Department", type: "text" },
    { key: "phone", label: "Phone", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "EMP001", name: "Julian Thorne", role: "Chief Agronomist", department: "Operations", phone: "+255 754 100200", email: "julian@agromanage.co.tz", status: "Active" },
    { id: "EMP002", name: "Sarah Kimani", role: "Procurement Manager", department: "Purchasing", phone: "+255 712 300400", email: "sarah@agromanage.co.tz", status: "Active" },
  ]} columns={[
    { key: "name", label: "Name" }, { key: "role", label: "Role" }, { key: "department", label: "Dept" }, { key: "phone", label: "Phone" }, { key: "status", label: "Status" },
  ]} />;
}

// Bank Accounts
export function BankAccountsPage() {
  return <MasterCrudPage title="Bank Accounts" description="Manage company bank accounts" idPrefix="BNK" fields={[
    { key: "bankName", label: "Bank Name", type: "text", required: true },
    { key: "accountName", label: "Account Name", type: "text", required: true },
    { key: "accountNumber", label: "Account Number", type: "text", required: true },
    { key: "branch", label: "Branch", type: "text" },
    { key: "currency", label: "Currency", type: "select", options: ["USD", "TZS", "EUR"] },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "BNK001", bankName: "CRDB Bank", accountName: "AgroTanzania Ltd", accountNumber: "0150-123456789", branch: "Dar es Salaam", currency: "TZS", status: "Active" },
    { id: "BNK002", bankName: "NMB Bank", accountName: "AgroTanzania USD", accountNumber: "2200-987654321", branch: "Dar es Salaam", currency: "USD", status: "Active" },
  ]} columns={[
    { key: "bankName", label: "Bank" }, { key: "accountName", label: "Account Name" }, { key: "accountNumber", label: "Account No" }, { key: "currency", label: "Currency" }, { key: "status", label: "Status" },
  ]} />;
}

// UOM
export function UomPage() {
  return <MasterCrudPage title="Units of Measure" description="Manage units of measurement" idPrefix="UOM" fields={[
    { key: "name", label: "Unit Name", type: "text", required: true },
    { key: "shortCode", label: "Short Code", type: "text", required: true },
    { key: "description", label: "Description", type: "text" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "UOM001", name: "Kilogram", shortCode: "KG", description: "Standard weight", status: "Active" },
    { id: "UOM002", name: "Metric Ton", shortCode: "MT", description: "1000 KG", status: "Active" },
    { id: "UOM003", name: "Bag", shortCode: "BAG", description: "Standard bag", status: "Active" },
    { id: "UOM004", name: "Liter", shortCode: "LTR", description: "Volume", status: "Active" },
  ]} columns={[
    { key: "name", label: "Unit" }, { key: "shortCode", label: "Code" }, { key: "description", label: "Description" }, { key: "status", label: "Status" },
  ]} />;
}

// Tax Master
export function TaxMasterPage() {
  return <MasterCrudPage title="Tax Master" description="Manage tax rates and categories" idPrefix="TAX" fields={[
    { key: "name", label: "Tax Name", type: "text", required: true },
    { key: "rate", label: "Rate (%)", type: "number", required: true },
    { key: "description", label: "Description", type: "text" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "TAX001", name: "VAT", rate: 18, description: "Value Added Tax", status: "Active" },
    { id: "TAX002", name: "Withholding Tax", rate: 2, description: "WHT on services", status: "Active" },
  ]} columns={[
    { key: "name", label: "Tax Name" }, { key: "rate", label: "Rate (%)" }, { key: "description", label: "Description" }, { key: "status", label: "Status" },
  ]} />;
}

// Account Heads
export function AccountHeadsPage() {
  return <MasterCrudPage title="Account Heads" description="Manage expense and income account heads" idPrefix="ACH" fields={[
    { key: "name", label: "Account Head Name", type: "text", required: true },
    { key: "type", label: "Type", type: "select", required: true, options: ["Expense", "Income", "Asset", "Liability"] },
    { key: "code", label: "Account Code", type: "text" },
    { key: "description", label: "Description", type: "text" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "ACH001", name: "Transportation", type: "Expense", code: "EXP-001", description: "Transport costs", status: "Active" },
    { id: "ACH002", name: "Loading/Offloading", type: "Expense", code: "EXP-002", description: "Loading costs", status: "Active" },
    { id: "ACH003", name: "Accommodation", type: "Expense", code: "EXP-003", description: "Travel accommodation", status: "Active" },
    { id: "ACH004", name: "Sales Revenue", type: "Income", code: "INC-001", description: "Product sales", status: "Active" },
  ]} columns={[
    { key: "name", label: "Name" }, { key: "type", label: "Type" }, { key: "code", label: "Code" }, { key: "status", label: "Status" },
  ]} />;
}

// Billing Locations
export function BillingLocationsPage() {
  return <MasterCrudPage title="Billing Locations" description="Manage billing locations" idPrefix="BLO" fields={[
    { key: "name", label: "Location Name", type: "text", required: true },
    { key: "description", label: "Description", type: "text" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
    { key: "remarks", label: "Remarks", type: "textarea" },
  ]} initialData={[
    { id: "BLO001", name: "Dar es Salaam HQ", description: "Main billing", status: "Active" },
    { id: "BLO002", name: "Arusha Office", description: "Northern region", status: "Active" },
  ]} columns={[
    { key: "name", label: "Name" }, { key: "description", label: "Description" }, { key: "status", label: "Status" },
  ]} />;
}

// Financial Years
export function FinancialYearsPage() {
  return <MasterCrudPage title="Financial Years" description="Manage financial year periods" idPrefix="FY" fields={[
    { key: "name", label: "Year Name", type: "text", required: true, placeholder: "e.g. FY 2025-26" },
    { key: "startDate", label: "Start Date", type: "text", required: true, placeholder: "e.g. 2025-07-01" },
    { key: "endDate", label: "End Date", type: "text", required: true, placeholder: "e.g. 2026-06-30" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Closed"] },
  ]} initialData={[
    { id: "FY001", name: "FY 2025-26", startDate: "2025-07-01", endDate: "2026-06-30", status: "Active" },
    { id: "FY002", name: "FY 2024-25", startDate: "2024-07-01", endDate: "2025-06-30", status: "Closed" },
  ]} columns={[
    { key: "name", label: "Year" }, { key: "startDate", label: "Start" }, { key: "endDate", label: "End" }, { key: "status", label: "Status" },
  ]} />;
}

// Payment Modes
export function PaymentModesPage() {
  return <MasterCrudPage title="Payment Modes" description="Manage payment modes" idPrefix="PMD" fields={[
    { key: "name", label: "Payment Mode", type: "text", required: true },
    { key: "shortCode", label: "Short Code", type: "text" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
    { key: "remarks", label: "Remarks", type: "textarea" },
  ]} initialData={[
    { id: "PMD001", name: "Bank Transfer", shortCode: "BT", status: "Active" },
    { id: "PMD002", name: "Cheque", shortCode: "CHQ", status: "Active" },
    { id: "PMD003", name: "Cash", shortCode: "CSH", status: "Active" },
    { id: "PMD004", name: "Mobile Money", shortCode: "MM", status: "Active" },
  ]} columns={[
    { key: "name", label: "Mode" }, { key: "shortCode", label: "Code" }, { key: "status", label: "Status" },
  ]} />;
}

// Goods Receipts placeholder
export function GoodsReceiptsPage() {
  return <MasterCrudPage title="Goods Receipts" description="Record and verify incoming goods" idPrefix="GRN" fields={[
    { key: "grnNumber", label: "GRN Number", type: "text", required: true },
    { key: "poReference", label: "PO Reference", type: "text", required: true },
    { key: "supplier", label: "Supplier", type: "text" },
    { key: "receivedDate", label: "Received Date", type: "text" },
    { key: "qualityCheck", label: "Quality Check", type: "select", options: ["Passed", "Failed", "Pending"] },
    { key: "quantityMatch", label: "Quantity Match", type: "select", options: ["Yes", "No", "Partial"] },
    { key: "conditionCheck", label: "Condition Check", type: "select", options: ["Good", "Damaged", "Partial"] },
    { key: "status", label: "Status", type: "select", required: true, options: ["Received", "Pending", "Rejected"] },
    { key: "remarks", label: "Remarks", type: "textarea" },
  ]} initialData={[
    { id: "GRN001", grnNumber: "GRN/03/001", poReference: "PO/MA/02/001", supplier: "Kilimo Bora Suppliers", receivedDate: "2024-02-10", qualityCheck: "Passed", quantityMatch: "Yes", conditionCheck: "Good", status: "Received" },
  ]} columns={[
    { key: "grnNumber", label: "GRN No" }, { key: "poReference", label: "PO Ref" }, { key: "supplier", label: "Supplier" }, { key: "receivedDate", label: "Date" }, { key: "qualityCheck", label: "Quality" }, { key: "status", label: "Status" },
  ]} />;
}

// Purchase Booking
export function PurchaseBookingPage() {
  return <MasterCrudPage title="Purchase Booking" description="Three-way matching: Invoice + PO + GRN" idPrefix="PBK" fields={[
    { key: "invoiceNumber", label: "Invoice Number", type: "text", required: true },
    { key: "invoiceDate", label: "Invoice Date", type: "text", required: true },
    { key: "poReference", label: "PO Reference", type: "text", required: true },
    { key: "grnReference", label: "GRN Reference", type: "text", required: true },
    { key: "supplier", label: "Supplier", type: "text" },
    { key: "amount", label: "Amount", type: "number", required: true },
    { key: "status", label: "Status", type: "select", required: true, options: ["Matched", "Mismatch", "Pending"] },
    { key: "remarks", label: "Remarks", type: "textarea" },
  ]} initialData={[
    { id: "PBK001", invoiceNumber: "INV-2024-001", invoiceDate: "2024-02-15", poReference: "PO/MA/02/001", grnReference: "GRN/03/001", supplier: "Kilimo Bora Suppliers", amount: 57230, status: "Matched" },
  ]} columns={[
    { key: "invoiceNumber", label: "Invoice" }, { key: "poReference", label: "PO Ref" }, { key: "grnReference", label: "GRN Ref" }, { key: "supplier", label: "Supplier" }, { key: "amount", label: "Amount" }, { key: "status", label: "Status" },
  ]} />;
}

// Sales Orders
export function SalesOrdersPage() {
  return <MasterCrudPage title="Sales Orders" description="Manage sales orders" idPrefix="SO" fields={[
    { key: "soNumber", label: "SO Number", type: "text", required: true },
    { key: "customer", label: "Customer Name", type: "text", required: true },
    { key: "tinNumber", label: "TIN Number", type: "text", required: true },
    { key: "product", label: "Product", type: "text" },
    { key: "quantity", label: "Quantity", type: "number" },
    { key: "price", label: "Price", type: "number" },
    { key: "deliveryDate", label: "Delivery Date", type: "text" },
    { key: "paymentTerm", label: "Payment Term", type: "select", options: ["Cash", "Net 30 Days", "Net 60 Days"] },
    { key: "status", label: "Status", type: "select", required: true, options: ["Draft", "Confirmed", "Delivered", "Invoiced"] },
  ]} initialData={[
    { id: "SO001", soNumber: "SO/03/001", customer: "Metro Foods Inc", tinNumber: "TIN-5551234", product: "White Maize", quantity: 500, price: 15800, deliveryDate: "2024-03-15", paymentTerm: "Net 30 Days", status: "Delivered" },
  ]} columns={[
    { key: "soNumber", label: "SO No" }, { key: "customer", label: "Customer" }, { key: "tinNumber", label: "TIN" }, { key: "product", label: "Product" }, { key: "price", label: "Price" }, { key: "status", label: "Status" },
  ]} />;
}

// Delivery Notes
export function DeliveryNotesPage() {
  return <MasterCrudPage title="Delivery Notes" description="Track product deliveries" idPrefix="DN" fields={[
    { key: "dnNumber", label: "Delivery Note Number", type: "text", required: true },
    { key: "soReference", label: "SO Reference", type: "text", required: true },
    { key: "product", label: "Product", type: "text" },
    { key: "quantity", label: "Quantity", type: "number" },
    { key: "deliveryDate", label: "Delivery Date", type: "text" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Pending", "Dispatched", "Delivered"] },
  ]} initialData={[
    { id: "DN001", dnNumber: "DN/03/001", soReference: "SO/03/001", product: "White Maize", quantity: 500, deliveryDate: "2024-03-15", status: "Delivered" },
  ]} columns={[
    { key: "dnNumber", label: "DN No" }, { key: "soReference", label: "SO Ref" }, { key: "product", label: "Product" }, { key: "quantity", label: "Qty" }, { key: "deliveryDate", label: "Date" }, { key: "status", label: "Status" },
  ]} />;
}

// Sales Invoices
export function SalesInvoicesPage() {
  return <MasterCrudPage title="Sales Invoices" description="Manage sales invoices" idPrefix="INV" fields={[
    { key: "invoiceNumber", label: "Invoice Number", type: "text", required: true },
    { key: "customer", label: "Customer Name", type: "text", required: true },
    { key: "tinNumber", label: "TIN Number", type: "text" },
    { key: "address", label: "Address", type: "text" },
    { key: "product", label: "Product", type: "text" },
    { key: "quantity", label: "Quantity", type: "number" },
    { key: "price", label: "Price", type: "number" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Draft", "Sent", "Paid", "Overdue"] },
  ]} initialData={[
    { id: "INV001", invoiceNumber: "SI/03/001", customer: "Metro Foods Inc", tinNumber: "TIN-5551234", address: "Dar es Salaam", product: "White Maize", quantity: 500, price: 15800, status: "Paid" },
  ]} columns={[
    { key: "invoiceNumber", label: "Invoice" }, { key: "customer", label: "Customer" }, { key: "product", label: "Product" }, { key: "price", label: "Price" }, { key: "status", label: "Status" },
  ]} />;
}

// Expenses
export function ExpensesPage() {
  return <MasterCrudPage title="Expenses" description="Track and allocate expenses to PO references" idPrefix="EXP" fields={[
    { key: "description", label: "Description", type: "text", required: true },
    { key: "accountHead", label: "Account Head", type: "select", required: true, options: ["Transportation", "Loading/Offloading", "Accommodation", "Travel Expenses", "Fines & Penalties", "Miscellaneous"] },
    { key: "poReference", label: "PO Reference", type: "text", required: true },
    { key: "amount", label: "Amount", type: "number", required: true },
    { key: "efdReceipt", label: "TRA EFD Receipt No", type: "text", required: true },
    { key: "providerTin", label: "Service Provider TIN", type: "text" },
    { key: "date", label: "Date", type: "text" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Pending", "Approved", "Rejected"] },
    { key: "remarks", label: "Remarks", type: "textarea" },
  ]} initialData={[
    { id: "EXP001", description: "Transport from Mbeya to DSM", accountHead: "Transportation", poReference: "PO/MA/02/001", amount: 2500, efdReceipt: "EFD-001234", providerTin: "TIN-888999", date: "2024-02-12", status: "Approved" },
    { id: "EXP002", description: "Loading at warehouse", accountHead: "Loading/Offloading", poReference: "PO/MA/02/001", amount: 500, efdReceipt: "EFD-001235", providerTin: "TIN-777888", date: "2024-02-12", status: "Approved" },
  ]} columns={[
    { key: "description", label: "Description" }, { key: "accountHead", label: "Account" }, { key: "poReference", label: "PO Ref" }, { key: "amount", label: "Amount" }, { key: "efdReceipt", label: "EFD Receipt" }, { key: "status", label: "Status" },
  ]} />;
}
