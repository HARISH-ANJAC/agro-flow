import MasterCrudPage from "@/components/MasterCrudPage";

// ==================== ORGANIZATION ====================

export function CompaniesPage() {
  return <MasterCrudPage title="Companies" description="TBL_COMPANY_MASTER" idPrefix="CMP" fields={[
    { key: "companyName", label: "Company Name", type: "text", required: true },
    { key: "companyFullName", label: "Company Full Name", type: "text" },
    { key: "tinNumber", label: "TIN Number", type: "text", required: true },
    { key: "address", label: "Address", type: "textarea" },
    { key: "contactPerson", label: "Contact Person", type: "text" },
    { key: "contactNumber", label: "Contact Number", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "shortCode", label: "Short Code", type: "text", placeholder: "Max 4 chars" },
    { key: "website", label: "Website", type: "text" },
    { key: "currency", label: "Currency", type: "select", options: ["TZS", "USD", "EUR"] },
    { key: "financeStartMonth", label: "Finance Start Month", type: "text", placeholder: "e.g. July" },
    { key: "financeEndMonth", label: "Finance End Month", type: "text", placeholder: "e.g. June" },
    { key: "yearCode", label: "Year Code", type: "text" },
    { key: "timeZone", label: "TimeZone", type: "text", placeholder: "e.g. EAT" },
    { key: "noOfUser", label: "No. of Users", type: "number" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "CMP001", companyName: "AgroTanzania Ltd", companyFullName: "AgroTanzania Limited", tinNumber: "TIN-001", address: "Dar es Salaam", contactPerson: "Julian Thorne", contactNumber: "+255 22 123456", email: "info@agrotanzania.co.tz", shortCode: "AGTZ", website: "www.agrotanzania.co.tz", currency: "TZS", financeStartMonth: "July", financeEndMonth: "June", yearCode: "2025-26", timeZone: "EAT", noOfUser: 25, remarks: "", status: "Active" },
  ]} columns={[
    { key: "companyName", label: "Name" }, { key: "tinNumber", label: "TIN" }, { key: "contactPerson", label: "Contact" }, { key: "email", label: "Email" }, { key: "currency", label: "Currency" }, { key: "status", label: "Status" },
  ]} />;
}

export function StoresPage() {
  return <MasterCrudPage title="Stores" description="TBL_STORE_MASTER" idPrefix="STR" fields={[
    { key: "storeName", label: "Store Name", type: "text", required: true },
    { key: "storeShortCode", label: "Short Code", type: "text" },
    { key: "storeShortName", label: "Short Name", type: "text" },
    { key: "location", label: "Location", type: "text" },
    { key: "managerName", label: "Manager Name", type: "text" },
    { key: "emailAddress", label: "Email Address", type: "text" },
    { key: "ccEmailAddress", label: "CC Email Address", type: "text" },
    { key: "bccEmailAddress", label: "BCC Email Address", type: "text" },
    { key: "responseDirectorsName", label: "Response Directors Name", type: "text" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "STR001", storeName: "Dar es Salaam Main Warehouse", storeShortCode: "DSM", storeShortName: "DSM Main", location: "Dar es Salaam", managerName: "James Kondo", emailAddress: "dsm@agromanage.co.tz", ccEmailAddress: "", bccEmailAddress: "", responseDirectorsName: "Julian Thorne", remarks: "", status: "Active" },
    { id: "STR002", storeName: "Mbeya Storage Facility", storeShortCode: "MBY", storeShortName: "Mbeya Store", location: "Mbeya", managerName: "Rose Mwita", emailAddress: "mbeya@agromanage.co.tz", ccEmailAddress: "", bccEmailAddress: "", responseDirectorsName: "", remarks: "", status: "Active" },
  ]} columns={[
    { key: "storeName", label: "Store" }, { key: "storeShortCode", label: "Code" }, { key: "location", label: "Location" }, { key: "managerName", label: "Manager" }, { key: "emailAddress", label: "Email" }, { key: "status", label: "Status" },
  ]} />;
}

export function LocationsPage() {
  return <MasterCrudPage title="Locations" description="TBL_LOCATION_MASTER" idPrefix="LOC" fields={[
    { key: "locationName", label: "Location Name", type: "text", required: true },
    { key: "locationDescription", label: "Description", type: "text" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "LOC001", locationName: "Dar es Salaam", locationDescription: "Capital city hub", remarks: "", status: "Active" },
    { id: "LOC002", locationName: "Arusha", locationDescription: "Northern region hub", remarks: "", status: "Active" },
    { id: "LOC003", locationName: "Mbeya", locationDescription: "Southern highlands", remarks: "", status: "Active" },
  ]} columns={[
    { key: "locationName", label: "Name" }, { key: "locationDescription", label: "Description" }, { key: "status", label: "Status" },
  ]} />;
}

export function BillingLocationsPage() {
  return <MasterCrudPage title="Billing Locations" description="TBL_BILLING_LOCATION_MASTER" idPrefix="BLO" fields={[
    { key: "billingLocationName", label: "Billing Location Name", type: "text", required: true },
    { key: "billingLocationDescription", label: "Description", type: "text" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "BLO001", billingLocationName: "Dar es Salaam HQ", billingLocationDescription: "Main billing", remarks: "", status: "Active" },
    { id: "BLO002", billingLocationName: "Arusha Office", billingLocationDescription: "Northern region", remarks: "", status: "Active" },
  ]} columns={[
    { key: "billingLocationName", label: "Name" }, { key: "billingLocationDescription", label: "Description" }, { key: "status", label: "Status" },
  ]} />;
}

export function FinancialYearsPage() {
  return <MasterCrudPage title="Financial Years" description="TBL_FINANCIAL_YEAR" idPrefix="FY" fields={[
    { key: "name", label: "Year Name", type: "text", required: true, placeholder: "e.g. FY 2025-26" },
    { key: "startDate", label: "Start Date", type: "date", required: true },
    { key: "endDate", label: "End Date", type: "date", required: true },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Closed"] },
  ]} initialData={[
    { id: "FY001", name: "FY 2025-26", startDate: "2025-07-01", endDate: "2026-06-30", status: "Active" },
    { id: "FY002", name: "FY 2024-25", startDate: "2024-07-01", endDate: "2025-06-30", status: "Closed" },
  ]} columns={[
    { key: "name", label: "Year" }, { key: "startDate", label: "Start" }, { key: "endDate", label: "End" }, { key: "status", label: "Status" },
  ]} />;
}

// ==================== INVENTORY ====================

export function CategoriesPage() {
  return <MasterCrudPage title="Main Categories" description="TBL_PRODUCT_MAIN_CATEGORY_MASTER" idPrefix="CAT" fields={[
    { key: "mainCategoryName", label: "Main Category Name", type: "text", required: true },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "CAT001", mainCategoryName: "Grains", remarks: "Cereal grains", status: "Active" },
    { id: "CAT002", mainCategoryName: "Pulses", remarks: "Legumes and beans", status: "Active" },
    { id: "CAT003", mainCategoryName: "Fertilizers", remarks: "Agricultural fertilizers", status: "Active" },
    { id: "CAT004", mainCategoryName: "Seeds", remarks: "Planting seeds", status: "Active" },
    { id: "CAT005", mainCategoryName: "Spices", remarks: "Spices and herbs", status: "Active" },
  ]} columns={[
    { key: "mainCategoryName", label: "Category Name" }, { key: "remarks", label: "Remarks" }, { key: "status", label: "Status" },
  ]} />;
}

export function SubCategoriesPage() {
  return <MasterCrudPage title="Sub Categories" description="TBL_PRODUCT_SUB_CATEGORY_MASTER" idPrefix="SUB" fields={[
    { key: "subCategoryName", label: "Sub Category Name", type: "text", required: true },
    { key: "mainCategory", label: "Main Category", type: "select", options: ["Grains", "Pulses", "Fertilizers", "Seeds", "Spices"] },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "SUB001", subCategoryName: "Maize", mainCategory: "Grains", remarks: "", status: "Active" },
    { id: "SUB002", subCategoryName: "Rice", mainCategory: "Grains", remarks: "", status: "Active" },
    { id: "SUB003", subCategoryName: "Wheat", mainCategory: "Grains", remarks: "", status: "Active" },
    { id: "SUB004", subCategoryName: "Beans", mainCategory: "Pulses", remarks: "", status: "Active" },
    { id: "SUB005", subCategoryName: "NPK Fertilizer", mainCategory: "Fertilizers", remarks: "", status: "Active" },
    { id: "SUB006", subCategoryName: "Karafu", mainCategory: "Spices", remarks: "", status: "Active" },
  ]} columns={[
    { key: "subCategoryName", label: "Sub Category" }, { key: "mainCategory", label: "Main Category" }, { key: "status", label: "Status" },
  ]} />;
}

export function UomPage() {
  return <MasterCrudPage title="Units of Measure" description="UOM Master" idPrefix="UOM" fields={[
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

// ==================== STAKEHOLDERS ====================

export function EmployeesPage() {
  return <MasterCrudPage title="Employees" description="TBL_EMPLOYEE_MASTER" idPrefix="EMP" fields={[
    { key: "name", label: "Full Name", type: "text", required: true },
    { key: "role", label: "Role / Designation", type: "text" },
    { key: "department", label: "Department", type: "text" },
    { key: "phone", label: "Phone", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "EMP001", name: "Julian Thorne", role: "Chief Agronomist", department: "Operations", phone: "+255 754 100200", email: "julian@agromanage.co.tz", remarks: "", status: "Active" },
    { id: "EMP002", name: "Sarah Kimani", role: "Procurement Manager", department: "Purchasing", phone: "+255 712 300400", email: "sarah@agromanage.co.tz", remarks: "", status: "Active" },
  ]} columns={[
    { key: "name", label: "Name" }, { key: "role", label: "Role" }, { key: "department", label: "Dept" }, { key: "phone", label: "Phone" }, { key: "status", label: "Status" },
  ]} />;
}

export function SalesPersonsPage() {
  return <MasterCrudPage title="Sales Persons" description="TBL_SALES_PERSON_MASTER" idPrefix="SP" fields={[
    { key: "personName", label: "Person Name", type: "text", required: true },
    { key: "empId", label: "Employee ID", type: "number" },
    { key: "designationName", label: "Designation", type: "text" },
    { key: "salesContactPhone", label: "Contact Phone", type: "text" },
    { key: "salesPersonEmail", label: "Email", type: "text" },
    { key: "reportingManagerName", label: "Reporting Manager", type: "text" },
    { key: "reportingManagerEmail", label: "Manager Email", type: "text" },
    { key: "salesPersonDesignation", label: "Sales Designation", type: "text" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "SP001", personName: "James Kileo", empId: 1, designationName: "Senior Sales Executive", salesContactPhone: "+255 754 555666", salesPersonEmail: "james@agromanage.co.tz", reportingManagerName: "Julian Thorne", reportingManagerEmail: "julian@agromanage.co.tz", salesPersonDesignation: "Sales", remarks: "", status: "Active" },
  ]} columns={[
    { key: "personName", label: "Name" }, { key: "designationName", label: "Designation" }, { key: "salesContactPhone", label: "Phone" }, { key: "reportingManagerName", label: "Manager" }, { key: "status", label: "Status" },
  ]} />;
}

// ==================== FINANCIAL ====================

export function BankMasterPage() {
  return <MasterCrudPage title="Banks" description="TBL_BANK_MASTER" idPrefix="BNK" fields={[
    { key: "bankName", label: "Bank Name", type: "text", required: true },
    { key: "address", label: "Address", type: "text" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "BNK001", bankName: "CRDB Bank", address: "Dar es Salaam", remarks: "", status: "Active" },
    { id: "BNK002", bankName: "NMB Bank", address: "Dar es Salaam", remarks: "", status: "Active" },
    { id: "BNK003", bankName: "Stanbic Bank", address: "Dar es Salaam", remarks: "", status: "Active" },
  ]} columns={[
    { key: "bankName", label: "Bank Name" }, { key: "address", label: "Address" }, { key: "status", label: "Status" },
  ]} />;
}

export function BankAccountsPage() {
  return <MasterCrudPage title="Company Bank Accounts" description="TBL_COMPANY_BANK_ACCOUNT_MASTER" idPrefix="CBA" fields={[
    { key: "company", label: "Company", type: "text" },
    { key: "bank", label: "Bank", type: "text", required: true },
    { key: "accountName", label: "Account Name", type: "text", required: true },
    { key: "accountNumber", label: "Account Number", type: "text", required: true },
    { key: "swiftCode", label: "Swift Code", type: "text" },
    { key: "branchAddress", label: "Branch Address", type: "text" },
    { key: "bankBranchName", label: "Bank Branch Name", type: "text" },
    { key: "currency", label: "Currency", type: "select", options: ["TZS", "USD", "EUR"] },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "CBA001", company: "AgroTanzania Ltd", bank: "CRDB Bank", accountName: "AgroTanzania Ltd", accountNumber: "0150-123456789", swiftCode: "CORUTZTZ", branchAddress: "Dar es Salaam", bankBranchName: "Main Branch", currency: "TZS", remarks: "", status: "Active" },
    { id: "CBA002", company: "AgroTanzania Ltd", bank: "NMB Bank", accountName: "AgroTanzania USD", accountNumber: "2200-987654321", swiftCode: "NMIBTZTZ", branchAddress: "Dar es Salaam", bankBranchName: "HQ Branch", currency: "USD", remarks: "", status: "Active" },
  ]} columns={[
    { key: "bank", label: "Bank" }, { key: "accountName", label: "Account Name" }, { key: "accountNumber", label: "Account No" }, { key: "swiftCode", label: "Swift" }, { key: "currency", label: "Currency" }, { key: "status", label: "Status" },
  ]} />;
}

export function CurrencyMasterPage() {
  return <MasterCrudPage title="Currencies" description="TBL_CURRENCY_MASTER" idPrefix="CUR" fields={[
    { key: "currencyName", label: "Currency Name", type: "text", required: true },
    { key: "exchangeRate", label: "Exchange Rate", type: "number" },
    { key: "address", label: "Symbol / Address", type: "text" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "CUR001", currencyName: "Tanzanian Shilling", exchangeRate: 1, address: "TZS", remarks: "Base currency", status: "Active" },
    { id: "CUR002", currencyName: "US Dollar", exchangeRate: 2650, address: "USD", remarks: "", status: "Active" },
    { id: "CUR003", currencyName: "Euro", exchangeRate: 2900, address: "EUR", remarks: "", status: "Active" },
  ]} columns={[
    { key: "currencyName", label: "Currency" }, { key: "address", label: "Symbol" }, { key: "exchangeRate", label: "Rate" }, { key: "status", label: "Status" },
  ]} />;
}

export function ExchangeRatePage() {
  return <MasterCrudPage title="Exchange Rates" description="TBL_EXCHANGE_RATE_MASTER" idPrefix="EXR" fields={[
    { key: "company", label: "Company", type: "text" },
    { key: "currency", label: "Currency", type: "text", required: true },
    { key: "exchangeRate", label: "Exchange Rate", type: "number", required: true },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "EXR001", company: "AgroTanzania Ltd", currency: "USD", exchangeRate: 2650, remarks: "", status: "Active" },
    { id: "EXR002", company: "AgroTanzania Ltd", currency: "EUR", exchangeRate: 2900, remarks: "", status: "Active" },
  ]} columns={[
    { key: "company", label: "Company" }, { key: "currency", label: "Currency" }, { key: "exchangeRate", label: "Rate" }, { key: "status", label: "Status" },
  ]} />;
}

export function TaxMasterPage() {
  return <MasterCrudPage title="Tax Master" description="Tax rates and categories" idPrefix="TAX" fields={[
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

export function VatSettingsPage() {
  return <MasterCrudPage title="VAT Percentage Settings" description="TBL_VAT_PERCENTAGE_SETTING" idPrefix="VAT" fields={[
    { key: "company", label: "Company", type: "text" },
    { key: "vatPercentage", label: "VAT Percentage (%)", type: "number", required: true },
    { key: "effectiveFrom", label: "Effective From", type: "date" },
    { key: "effectiveTo", label: "Effective To", type: "date" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "VAT001", company: "AgroTanzania Ltd", vatPercentage: 18, effectiveFrom: "2024-01-01", effectiveTo: "2025-12-31", remarks: "Standard VAT rate", status: "Active" },
  ]} columns={[
    { key: "company", label: "Company" }, { key: "vatPercentage", label: "VAT %" }, { key: "effectiveFrom", label: "From" }, { key: "effectiveTo", label: "To" }, { key: "status", label: "Status" },
  ]} />;
}

export function AccountHeadsPage() {
  return <MasterCrudPage title="Account Heads" description="TBL_ACCOUNTS_HEAD_MASTER" idPrefix="ACH" fields={[
    { key: "accountHeadName", label: "Account Head Name", type: "text", required: true },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "ACH001", accountHeadName: "Transportation", remarks: "Transport costs", status: "Active" },
    { id: "ACH002", accountHeadName: "Loading/Offloading", remarks: "Loading costs", status: "Active" },
    { id: "ACH003", accountHeadName: "Accommodation", remarks: "Travel accommodation", status: "Active" },
    { id: "ACH004", accountHeadName: "Sales Revenue", remarks: "Product sales", status: "Active" },
  ]} columns={[
    { key: "accountHeadName", label: "Account Head" }, { key: "remarks", label: "Remarks" }, { key: "status", label: "Status" },
  ]} />;
}

export function LedgerGroupsPage() {
  return <MasterCrudPage title="Ledger Groups" description="TBL_ACCOUNTS_LEDGER_GROUP_MASTER" idPrefix="LGR" fields={[
    { key: "ledgerGroupName", label: "Ledger Group Name", type: "text", required: true },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "LGR001", ledgerGroupName: "Current Assets", remarks: "", status: "Active" },
    { id: "LGR002", ledgerGroupName: "Current Liabilities", remarks: "", status: "Active" },
    { id: "LGR003", ledgerGroupName: "Income", remarks: "", status: "Active" },
    { id: "LGR004", ledgerGroupName: "Expenses", remarks: "", status: "Active" },
  ]} columns={[
    { key: "ledgerGroupName", label: "Group Name" }, { key: "remarks", label: "Remarks" }, { key: "status", label: "Status" },
  ]} />;
}

export function LedgerMasterPage() {
  return <MasterCrudPage title="Ledger Master" description="TBL_ACCOUNTS_LEDGER_MASTER" idPrefix="LED" fields={[
    { key: "company", label: "Company", type: "text" },
    { key: "ledgerType", label: "Ledger Type", type: "select", options: ["Asset", "Liability", "Income", "Expense"] },
    { key: "ledgerGroupId", label: "Ledger Group", type: "text" },
    { key: "ledgerName", label: "Ledger Name", type: "text", required: true },
    { key: "ledgerDesc", label: "Description", type: "text" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "LED001", company: "AgroTanzania Ltd", ledgerType: "Expense", ledgerGroupId: "Expenses", ledgerName: "Purchase Account", ledgerDesc: "All purchases", remarks: "", status: "Active" },
    { id: "LED002", company: "AgroTanzania Ltd", ledgerType: "Income", ledgerGroupId: "Income", ledgerName: "Sales Account", ledgerDesc: "All sales", remarks: "", status: "Active" },
  ]} columns={[
    { key: "ledgerName", label: "Ledger" }, { key: "ledgerType", label: "Type" }, { key: "ledgerDesc", label: "Description" }, { key: "status", label: "Status" },
  ]} />;
}

export function PaymentModesPage() {
  return <MasterCrudPage title="Payment Modes" description="TBL_PAYMENT_MODE_MASTER" idPrefix="PMD" fields={[
    { key: "paymentModeName", label: "Payment Mode Name", type: "text", required: true },
    { key: "paymentModePercentage", label: "Payment Mode Percentage", type: "number" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "PMD001", paymentModeName: "Bank Transfer", paymentModePercentage: 0, remarks: "", status: "Active" },
    { id: "PMD002", paymentModeName: "Cheque", paymentModePercentage: 0, remarks: "", status: "Active" },
    { id: "PMD003", paymentModeName: "Cash", paymentModePercentage: 0, remarks: "", status: "Active" },
    { id: "PMD004", paymentModeName: "Mobile Money", paymentModePercentage: 0, remarks: "", status: "Active" },
  ]} columns={[
    { key: "paymentModeName", label: "Mode" }, { key: "paymentModePercentage", label: "%" }, { key: "status", label: "Status" },
  ]} />;
}

export function CustomerPaymentModesPage() {
  return <MasterCrudPage title="Customer Payment Modes" description="TBL_CUSTOMER_PAYMENT_MODE_MASTER" idPrefix="CPM" fields={[
    { key: "paymentModeName", label: "Payment Mode Name", type: "text", required: true },
    { key: "shortCode", label: "Short Code", type: "text" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "CPM001", paymentModeName: "Bank Transfer", shortCode: "BT", remarks: "", status: "Active" },
    { id: "CPM002", paymentModeName: "Mobile Money", shortCode: "MM", remarks: "", status: "Active" },
  ]} columns={[
    { key: "paymentModeName", label: "Mode" }, { key: "shortCode", label: "Code" }, { key: "status", label: "Status" },
  ]} />;
}

export function PaymentTermsPage() {
  return <MasterCrudPage title="Payment Terms" description="TBL_PAYMENT_TERM_MASTER" idPrefix="PT" fields={[
    { key: "paymentTermName", label: "Payment Term Name", type: "text", required: true },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "PT001", paymentTermName: "Cash on Delivery", remarks: "", status: "Active" },
    { id: "PT002", paymentTermName: "Net 30 Days", remarks: "", status: "Active" },
    { id: "PT003", paymentTermName: "Net 60 Days", remarks: "", status: "Active" },
    { id: "PT004", paymentTermName: "Advance Payment", remarks: "", status: "Active" },
  ]} columns={[
    { key: "paymentTermName", label: "Term" }, { key: "remarks", label: "Remarks" }, { key: "status", label: "Status" },
  ]} />;
}

export function AdditionalCostTypesPage() {
  return <MasterCrudPage title="Additional Cost Types" description="TBL_ADDITIONAL_COST_TYPE_MASTER" idPrefix="ACT" fields={[
    { key: "additionalCostTypeName", label: "Cost Type Name", type: "text", required: true },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "ACT001", additionalCostTypeName: "Transportation Cost", remarks: "", status: "Active" },
    { id: "ACT002", additionalCostTypeName: "Loading/Offloading", remarks: "", status: "Active" },
    { id: "ACT003", additionalCostTypeName: "Insurance", remarks: "", status: "Active" },
    { id: "ACT004", additionalCostTypeName: "Customs Duty", remarks: "", status: "Active" },
    { id: "ACT005", additionalCostTypeName: "Fumigation", remarks: "", status: "Active" },
  ]} columns={[
    { key: "additionalCostTypeName", label: "Cost Type" }, { key: "remarks", label: "Remarks" }, { key: "status", label: "Status" },
  ]} />;
}

// ==================== GEOGRAPHY ====================

export function CountriesPage() {
  return <MasterCrudPage title="Countries" description="TBL_COUNTRY_MASTER" idPrefix="CTR" fields={[
    { key: "countryName", label: "Country Name", type: "text", required: true },
    { key: "nicename", label: "Nice Name", type: "text" },
    { key: "iso3", label: "ISO3 Code", type: "text" },
    { key: "numcode", label: "Num Code", type: "number" },
    { key: "phonecode", label: "Phone Code", type: "number" },
    { key: "batchNo", label: "Batch No", type: "text" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "CTR001", countryName: "TANZANIA", nicename: "Tanzania", iso3: "TZA", numcode: 834, phonecode: 255, batchNo: "TZ", remarks: "", status: "Active" },
    { id: "CTR002", countryName: "KENYA", nicename: "Kenya", iso3: "KEN", numcode: 404, phonecode: 254, batchNo: "KE", remarks: "", status: "Active" },
    { id: "CTR003", countryName: "UGANDA", nicename: "Uganda", iso3: "UGA", numcode: 800, phonecode: 256, batchNo: "UG", remarks: "", status: "Active" },
  ]} columns={[
    { key: "countryName", label: "Country" }, { key: "iso3", label: "ISO3" }, { key: "phonecode", label: "Phone Code" }, { key: "status", label: "Status" },
  ]} />;
}

export function RegionsPage() {
  return <MasterCrudPage title="Regions" description="TBL_REGION_MASTER" idPrefix="REG" fields={[
    { key: "regionName", label: "Region Name", type: "text", required: true },
    { key: "country", label: "Country", type: "text" },
    { key: "capital", label: "Capital", type: "text" },
    { key: "noOfDistricts", label: "No. of Districts", type: "number" },
    { key: "totalPopulation", label: "Total Population", type: "number" },
    { key: "zoneName", label: "Zone Name", type: "text" },
    { key: "distanceFromArusha", label: "Distance from Arusha (km)", type: "number" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "REG001", regionName: "Dar es Salaam", country: "Tanzania", capital: "Dar es Salaam", noOfDistricts: 5, totalPopulation: 5383728, zoneName: "Eastern", distanceFromArusha: 662, status: "Active" },
    { id: "REG002", regionName: "Arusha", country: "Tanzania", capital: "Arusha", noOfDistricts: 7, totalPopulation: 1694310, zoneName: "Northern", distanceFromArusha: 0, status: "Active" },
    { id: "REG003", regionName: "Mbeya", country: "Tanzania", capital: "Mbeya", noOfDistricts: 7, totalPopulation: 2707410, zoneName: "Southern Highlands", distanceFromArusha: 880, status: "Active" },
  ]} columns={[
    { key: "regionName", label: "Region" }, { key: "country", label: "Country" }, { key: "capital", label: "Capital" }, { key: "zoneName", label: "Zone" }, { key: "status", label: "Status" },
  ]} />;
}

export function DistrictsPage() {
  return <MasterCrudPage title="Districts" description="TBL_DISTRICT_MASTER" idPrefix="DST" fields={[
    { key: "districtName", label: "District Name", type: "text", required: true },
    { key: "country", label: "Country", type: "text" },
    { key: "region", label: "Region", type: "text" },
    { key: "totalPopulation", label: "Total Population", type: "number" },
    { key: "zoneName", label: "Zone Name", type: "text" },
    { key: "distanceFromArusha", label: "Distance from Arusha (km)", type: "number" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "DST001", districtName: "Ilala", country: "Tanzania", region: "Dar es Salaam", totalPopulation: 1220611, zoneName: "Eastern", distanceFromArusha: 662, status: "Active" },
    { id: "DST002", districtName: "Kinondoni", country: "Tanzania", region: "Dar es Salaam", totalPopulation: 1775049, zoneName: "Eastern", distanceFromArusha: 662, status: "Active" },
    { id: "DST003", districtName: "Arusha City", country: "Tanzania", region: "Arusha", totalPopulation: 416442, zoneName: "Northern", distanceFromArusha: 0, status: "Active" },
  ]} columns={[
    { key: "districtName", label: "District" }, { key: "region", label: "Region" }, { key: "zoneName", label: "Zone" }, { key: "status", label: "Status" },
  ]} />;
}

// ==================== SYSTEM / ACCESS ====================

export function RolesPage() {
  return <MasterCrudPage title="Roles" description="TBL_ROLE_MASTER" idPrefix="ROL" fields={[
    { key: "roleName", label: "Role Name", type: "text", required: true },
    { key: "roleDescription", label: "Role Description", type: "text" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "ROL001", roleName: "Administrator", roleDescription: "Full system access", remarks: "", status: "Active" },
    { id: "ROL002", roleName: "Manager", roleDescription: "Department level access", remarks: "", status: "Active" },
    { id: "ROL003", roleName: "User", roleDescription: "Standard user access", remarks: "", status: "Active" },
    { id: "ROL004", roleName: "Viewer", roleDescription: "Read-only access", remarks: "", status: "Active" },
  ]} columns={[
    { key: "roleName", label: "Role" }, { key: "roleDescription", label: "Description" }, { key: "status", label: "Status" },
  ]} />;
}

export function UsersPage() {
  return <MasterCrudPage title="Users" description="TBL_USER_INFO_HDR" idPrefix="USR" fields={[
    { key: "loginName", label: "Login Name", type: "text", required: true },
    { key: "role", label: "Role", type: "select", options: ["Administrator", "Manager", "User", "Viewer"] },
    { key: "mobileNo", label: "Mobile No", type: "text" },
    { key: "mailId", label: "Email", type: "text" },
    { key: "stockShowStatus", label: "Stock Show Status", type: "select", options: ["Yes", "No"] },
    { key: "outsideAccess", label: "Outside Access", type: "select", options: ["Yes", "No"] },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "USR001", loginName: "julian.thorne", role: "Administrator", mobileNo: "+255 754 100200", mailId: "julian@agromanage.co.tz", stockShowStatus: "Yes", outsideAccess: "Yes", remarks: "", status: "Active" },
    { id: "USR002", loginName: "sarah.kimani", role: "Manager", mobileNo: "+255 712 300400", mailId: "sarah@agromanage.co.tz", stockShowStatus: "Yes", outsideAccess: "No", remarks: "", status: "Active" },
  ]} columns={[
    { key: "loginName", label: "Login" }, { key: "role", label: "Role" }, { key: "mobileNo", label: "Mobile" }, { key: "mailId", label: "Email" }, { key: "status", label: "Status" },
  ]} />;
}

export function UserStoreMappingPage() {
  return <MasterCrudPage title="User-Store Mapping" description="TBL_USER_TO_STORE_MAPPING" idPrefix="USM" fields={[
    { key: "user", label: "User", type: "text", required: true },
    { key: "company", label: "Company", type: "text" },
    { key: "store", label: "Store", type: "text", required: true },
    { key: "role", label: "Role", type: "text" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "USM001", user: "julian.thorne", company: "AgroTanzania Ltd", store: "Dar es Salaam Main Warehouse", role: "Administrator", status: "Active" },
    { id: "USM002", user: "sarah.kimani", company: "AgroTanzania Ltd", store: "Dar es Salaam Main Warehouse", role: "Manager", status: "Active" },
  ]} columns={[
    { key: "user", label: "User" }, { key: "company", label: "Company" }, { key: "store", label: "Store" }, { key: "role", label: "Role" }, { key: "status", label: "Status" },
  ]} />;
}

// ==================== INVENTORY SETTINGS ====================

export function StoreProductMinStockPage() {
  return <MasterCrudPage title="Store Product Minimum Stock" description="TBL_STORE_PRODUCT_MINIMUM_STOCK" idPrefix="SMS" fields={[
    { key: "company", label: "Company", type: "text" },
    { key: "store", label: "Store", type: "text", required: true },
    { key: "mainCategory", label: "Main Category", type: "text" },
    { key: "subCategory", label: "Sub Category", type: "text" },
    { key: "product", label: "Product", type: "text", required: true },
    { key: "minimumStockPcs", label: "Minimum Stock (pcs)", type: "number" },
    { key: "purchaseAlertQty", label: "Purchase Alert Qty", type: "number" },
    { key: "requestedBy", label: "Requested By", type: "text" },
    { key: "effectiveFrom", label: "Effective From", type: "date" },
    { key: "effectiveTo", label: "Effective To", type: "date" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "SMS001", company: "AgroTanzania Ltd", store: "Dar es Salaam Main Warehouse", mainCategory: "Grains", subCategory: "Maize", product: "White Maize – Grade A", minimumStockPcs: 1000, purchaseAlertQty: 500, requestedBy: "Julian Thorne", effectiveFrom: "2024-01-01", effectiveTo: "2025-12-31", remarks: "", status: "Active" },
  ]} columns={[
    { key: "store", label: "Store" }, { key: "product", label: "Product" }, { key: "minimumStockPcs", label: "Min Stock" }, { key: "purchaseAlertQty", label: "Alert Qty" }, { key: "status", label: "Status" },
  ]} />;
}

export function ProductOpeningStockPage() {
  return <MasterCrudPage title="Product Opening Stock" description="TBL_PRODUCT_OPENING_STOCK" idPrefix="POS" fields={[
    { key: "openingStockDate", label: "Opening Stock Date", type: "date", required: true },
    { key: "company", label: "Company", type: "text" },
    { key: "store", label: "Store", type: "text" },
    { key: "mainCategory", label: "Main Category", type: "text" },
    { key: "subCategory", label: "Sub Category", type: "text" },
    { key: "product", label: "Product", type: "text", required: true },
    { key: "totalQty", label: "Total Qty", type: "number", required: true },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "POS001", openingStockDate: "2024-01-01", company: "AgroTanzania Ltd", store: "Dar es Salaam Main Warehouse", mainCategory: "Grains", subCategory: "Maize", product: "White Maize – Grade A", totalQty: 5000, remarks: "", status: "Active" },
  ]} columns={[
    { key: "product", label: "Product" }, { key: "store", label: "Store" }, { key: "totalQty", label: "Qty" }, { key: "openingStockDate", label: "Date" }, { key: "status", label: "Status" },
  ]} />;
}

export function ProductCompanyCategoryMappingPage() {
  return <MasterCrudPage title="Product Company Category Mapping" description="TBL_PRODUCT_COMPANY_MAIN_CATEGORY_MAPPING" idPrefix="PCM" fields={[
    { key: "company", label: "Company", type: "text", required: true },
    { key: "mainCategory", label: "Main Category", type: "text", required: true },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Active", "Inactive"] },
  ]} initialData={[
    { id: "PCM001", company: "AgroTanzania Ltd", mainCategory: "Grains", remarks: "", status: "Active" },
    { id: "PCM002", company: "AgroTanzania Ltd", mainCategory: "Pulses", remarks: "", status: "Active" },
  ]} columns={[
    { key: "company", label: "Company" }, { key: "mainCategory", label: "Category" }, { key: "status", label: "Status" },
  ]} />;
}

// ==================== PURCHASE TRANSACTIONS ====================

export function GoodsReceiptsPage() {
  return <MasterCrudPage title="Goods Receipts (GRN)" description="TBL_GOODS_INWARD_GRN_HDR" idPrefix="GRN" fields={[
    { key: "grnRefNo", label: "GRN Ref No", type: "text", required: true },
    { key: "grnDate", label: "GRN Date", type: "date", required: true },
    { key: "company", label: "Company", type: "text" },
    { key: "sourceStore", label: "Source Store", type: "text" },
    { key: "grnStore", label: "GRN Store", type: "text" },
    { key: "grnSource", label: "GRN Source", type: "select", options: ["Purchase Order", "Stock Transfer"] },
    { key: "deliveryNoteRefNo", label: "Delivery Note Ref", type: "text" },
    { key: "supplier", label: "Supplier", type: "text" },
    { key: "poRefNo", label: "PO Reference", type: "text", required: true },
    { key: "purchaseInvoiceRefNo", label: "Purchase Invoice Ref", type: "text" },
    { key: "supplierInvoiceNumber", label: "Supplier Invoice No", type: "text" },
    { key: "containerNo", label: "Container No", type: "text" },
    { key: "driverName", label: "Driver Name", type: "text" },
    { key: "driverContactNumber", label: "Driver Contact", type: "text" },
    { key: "vehicleNo", label: "Vehicle No", type: "text" },
    { key: "sealNo", label: "Seal No", type: "text" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Received", "Pending", "Rejected"] },
  ]} initialData={[
    { id: "GRN001", grnRefNo: "GRN/03/001", grnDate: "2024-02-10", company: "AgroTanzania Ltd", sourceStore: "", grnStore: "Dar es Salaam Main Warehouse", grnSource: "Purchase Order", deliveryNoteRefNo: "", supplier: "Kilimo Bora Suppliers", poRefNo: "PO/MA/02/001", purchaseInvoiceRefNo: "", supplierInvoiceNumber: "SUP-INV-001", containerNo: "", driverName: "Juma Ali", driverContactNumber: "+255 789 111222", vehicleNo: "T 123 ABC", sealNo: "SEAL-001", remarks: "", status: "Received" },
  ]} columns={[
    { key: "grnRefNo", label: "GRN No" }, { key: "grnDate", label: "Date" }, { key: "poRefNo", label: "PO Ref" }, { key: "supplier", label: "Supplier" }, { key: "vehicleNo", label: "Vehicle" }, { key: "status", label: "Status" },
  ]} />;
}

export function PurchaseBookingPage() {
  return <MasterCrudPage title="Purchase Invoices" description="TBL_PURCHASE_INVOICE_HDR - Three-way matching" idPrefix="PBI" fields={[
    { key: "purchaseInvoiceRefNo", label: "Purchase Invoice Ref No", type: "text", required: true },
    { key: "company", label: "Company", type: "text" },
    { key: "invoiceNo", label: "Supplier Invoice No", type: "text", required: true },
    { key: "invoiceDate", label: "Invoice Date", type: "date", required: true },
    { key: "poRefNo", label: "PO Reference No", type: "text", required: true },
    { key: "purchaseType", label: "Purchase Type", type: "select", options: ["Local Purchase", "Import"] },
    { key: "supplier", label: "Supplier", type: "text" },
    { key: "store", label: "Store", type: "text" },
    { key: "paymentTerm", label: "Payment Term", type: "text" },
    { key: "modeOfPayment", label: "Mode of Payment", type: "text" },
    { key: "currency", label: "Currency", type: "select", options: ["TZS", "USD", "EUR"] },
    { key: "priceTerms", label: "Price Terms", type: "text" },
    { key: "productAmount", label: "Product Amount", type: "number" },
    { key: "totalAdditionalCost", label: "Total Additional Cost", type: "number" },
    { key: "totalVat", label: "Total VAT Amount", type: "number" },
    { key: "finalAmount", label: "Final Invoice Amount", type: "number" },
    { key: "exchangeRate", label: "Exchange Rate", type: "number" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Draft", "Submitted", "Approved", "Rejected"] },
  ]} initialData={[
    { id: "PBI001", purchaseInvoiceRefNo: "PI/03/001", company: "AgroTanzania Ltd", invoiceNo: "INV-2024-001", invoiceDate: "2024-02-15", poRefNo: "PO/MA/02/001", purchaseType: "Local Purchase", supplier: "Kilimo Bora Suppliers", store: "Dar es Salaam Main Warehouse", paymentTerm: "Net 30 Days", modeOfPayment: "Bank Transfer", currency: "USD", priceTerms: "FOB", productAmount: 50000, totalAdditionalCost: 2500, totalVat: 4730, finalAmount: 57230, exchangeRate: 2650, remarks: "", status: "Approved" },
  ]} columns={[
    { key: "purchaseInvoiceRefNo", label: "Ref No" }, { key: "invoiceNo", label: "Invoice" }, { key: "poRefNo", label: "PO Ref" }, { key: "supplier", label: "Supplier" }, { key: "finalAmount", label: "Amount" }, { key: "status", label: "Status" },
  ]} />;
}

// ==================== EXPENSE TRANSACTIONS ====================

export function ExpensesPage() {
  return <MasterCrudPage title="Expenses" description="TBL_EXPENSE_HDR" idPrefix="EXP" fields={[
    { key: "expenseRefNo", label: "Expense Ref No", type: "text", required: true },
    { key: "expenseDate", label: "Expense Date", type: "date", required: true },
    { key: "company", label: "Company", type: "text" },
    { key: "expenseAgainst", label: "Expense Against", type: "select", options: ["Purchase Order", "Sales Order", "General"] },
    { key: "poRefNo", label: "PO Reference", type: "text", required: true },
    { key: "accountHead", label: "Account Head", type: "select", required: true, options: ["Transportation", "Loading/Offloading", "Accommodation", "Travel Expenses", "Fines & Penalties", "Miscellaneous"] },
    { key: "expenseSupplier", label: "Expense Supplier/Provider", type: "text" },
    { key: "expenseType", label: "Expense Type", type: "text" },
    { key: "traEfdReceiptNo", label: "TRA EFD Receipt No", type: "text", required: true },
    { key: "currency", label: "Currency", type: "select", options: ["TZS", "USD", "EUR"] },
    { key: "exchangeRate", label: "Exchange Rate", type: "number" },
    { key: "totalExpenseAmount", label: "Total Expense Amount", type: "number", required: true },
    { key: "totalExpenseAmountLC", label: "Total Amount (Local Currency)", type: "number" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Pending", "Approved", "Rejected"] },
  ]} initialData={[
    { id: "EXP001", expenseRefNo: "EXP/03/001", expenseDate: "2024-02-12", company: "AgroTanzania Ltd", expenseAgainst: "Purchase Order", poRefNo: "PO/MA/02/001", accountHead: "Transportation", expenseSupplier: "Speedy Logistics", expenseType: "Transport", traEfdReceiptNo: "EFD-001234", currency: "USD", exchangeRate: 2650, totalExpenseAmount: 2500, totalExpenseAmountLC: 6625000, remarks: "", status: "Approved" },
    { id: "EXP002", expenseRefNo: "EXP/03/002", expenseDate: "2024-02-12", company: "AgroTanzania Ltd", expenseAgainst: "Purchase Order", poRefNo: "PO/MA/02/001", accountHead: "Loading/Offloading", expenseSupplier: "Local Labour Co", expenseType: "Loading", traEfdReceiptNo: "EFD-001235", currency: "USD", exchangeRate: 2650, totalExpenseAmount: 500, totalExpenseAmountLC: 1325000, remarks: "", status: "Approved" },
  ]} columns={[
    { key: "expenseRefNo", label: "Ref No" }, { key: "accountHead", label: "Account" }, { key: "poRefNo", label: "PO Ref" }, { key: "totalExpenseAmount", label: "Amount" }, { key: "traEfdReceiptNo", label: "EFD Receipt" }, { key: "status", label: "Status" },
  ]} />;
}

// ==================== SALES TRANSACTIONS ====================

export function SalesOrdersPage() {
  return <MasterCrudPage title="Sales Orders" description="TBL_SALES_ORDER_HDR" idPrefix="SO" fields={[
    { key: "salesOrderRefNo", label: "Sales Order Ref No", type: "text", required: true },
    { key: "salesOrderDate", label: "Sales Order Date", type: "date", required: true },
    { key: "company", label: "Company", type: "text" },
    { key: "store", label: "Store", type: "text" },
    { key: "customer", label: "Customer", type: "text", required: true },
    { key: "billingLocation", label: "Billing Location", type: "text" },
    { key: "salesPerson", label: "Sales Person", type: "text" },
    { key: "creditLimitAmount", label: "Credit Limit Amount", type: "number" },
    { key: "creditLimitDays", label: "Credit Limit Days", type: "number" },
    { key: "outstandingAmount", label: "Outstanding Amount", type: "number" },
    { key: "currency", label: "Currency", type: "select", options: ["TZS", "USD", "EUR"] },
    { key: "exchangeRate", label: "Exchange Rate", type: "number" },
    { key: "totalProductAmount", label: "Total Product Amount", type: "number" },
    { key: "vatAmount", label: "VAT Amount", type: "number" },
    { key: "finalSalesAmount", label: "Final Sales Amount", type: "number" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Draft", "Confirmed", "Delivered", "Invoiced", "Cancelled"] },
  ]} initialData={[
    { id: "SO001", salesOrderRefNo: "SO/03/001", salesOrderDate: "2024-03-01", company: "AgroTanzania Ltd", store: "Dar es Salaam Main Warehouse", customer: "Metro Foods Inc", billingLocation: "Dar es Salaam HQ", salesPerson: "James Kileo", creditLimitAmount: 500000, creditLimitDays: 30, outstandingAmount: 0, currency: "TZS", exchangeRate: 1, totalProductAmount: 7900000, vatAmount: 1422000, finalSalesAmount: 9322000, remarks: "", status: "Delivered" },
  ]} columns={[
    { key: "salesOrderRefNo", label: "SO No" }, { key: "salesOrderDate", label: "Date" }, { key: "customer", label: "Customer" }, { key: "finalSalesAmount", label: "Amount" }, { key: "salesPerson", label: "Sales Person" }, { key: "status", label: "Status" },
  ]} />;
}

export function DeliveryNotesPage() {
  return <MasterCrudPage title="Delivery Notes" description="TBL_DELIVERY_NOTE_HDR" idPrefix="DN" fields={[
    { key: "deliveryNoteRefNo", label: "Delivery Note Ref No", type: "text", required: true },
    { key: "deliveryDate", label: "Delivery Date", type: "date", required: true },
    { key: "company", label: "Company", type: "text" },
    { key: "fromStore", label: "From Store", type: "text" },
    { key: "deliverySourceType", label: "Delivery Source Type", type: "select", options: ["Sales Order", "Stock Transfer"] },
    { key: "deliverySourceRefNo", label: "Source Ref No (SO)", type: "text" },
    { key: "toStore", label: "To Store / Customer", type: "text" },
    { key: "customer", label: "Customer", type: "text" },
    { key: "truckNo", label: "Truck No", type: "text" },
    { key: "trailerNo", label: "Trailer No", type: "text" },
    { key: "driverName", label: "Driver Name", type: "text" },
    { key: "driverContactNumber", label: "Driver Contact", type: "text" },
    { key: "sealNo", label: "Seal No", type: "text" },
    { key: "currency", label: "Currency", type: "select", options: ["TZS", "USD", "EUR"] },
    { key: "totalProductAmount", label: "Total Product Amount", type: "number" },
    { key: "vatAmount", label: "VAT Amount", type: "number" },
    { key: "finalSalesAmount", label: "Final Amount", type: "number" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Pending", "Dispatched", "Delivered"] },
  ]} initialData={[
    { id: "DN001", deliveryNoteRefNo: "DN/03/001", deliveryDate: "2024-03-15", company: "AgroTanzania Ltd", fromStore: "Dar es Salaam Main Warehouse", deliverySourceType: "Sales Order", deliverySourceRefNo: "SO/03/001", toStore: "", customer: "Metro Foods Inc", truckNo: "T 456 DEF", trailerNo: "", driverName: "Hassan Juma", driverContactNumber: "+255 789 333444", sealNo: "SEAL-S001", currency: "TZS", totalProductAmount: 7900000, vatAmount: 1422000, finalSalesAmount: 9322000, remarks: "", status: "Delivered" },
  ]} columns={[
    { key: "deliveryNoteRefNo", label: "DN No" }, { key: "deliveryDate", label: "Date" }, { key: "deliverySourceRefNo", label: "SO Ref" }, { key: "customer", label: "Customer" }, { key: "truckNo", label: "Truck" }, { key: "status", label: "Status" },
  ]} />;
}

export function SalesInvoicesPage() {
  return <MasterCrudPage title="Sales Invoices (Tax Invoice)" description="TBL_TAX_INVOICE_HDR" idPrefix="INV" fields={[
    { key: "taxInvoiceRefNo", label: "Tax Invoice Ref No", type: "text", required: true },
    { key: "invoiceDate", label: "Invoice Date", type: "date", required: true },
    { key: "company", label: "Company", type: "text" },
    { key: "fromStore", label: "From Store", type: "text" },
    { key: "invoiceType", label: "Invoice Type", type: "select", options: ["Tax Invoice", "Proforma"] },
    { key: "deliveryNoteRefNo", label: "Delivery Note Ref", type: "text" },
    { key: "customer", label: "Customer", type: "text", required: true },
    { key: "currency", label: "Currency", type: "select", options: ["TZS", "USD", "EUR"] },
    { key: "exchangeRate", label: "Exchange Rate", type: "number" },
    { key: "totalProductAmount", label: "Total Product Amount", type: "number" },
    { key: "vatAmount", label: "VAT Amount", type: "number" },
    { key: "finalSalesAmount", label: "Final Sales Amount", type: "number" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Draft", "Sent", "Paid", "Overdue", "Cancelled"] },
  ]} initialData={[
    { id: "INV001", taxInvoiceRefNo: "SI/03/001", invoiceDate: "2024-03-16", company: "AgroTanzania Ltd", fromStore: "Dar es Salaam Main Warehouse", invoiceType: "Tax Invoice", deliveryNoteRefNo: "DN/03/001", customer: "Metro Foods Inc", currency: "TZS", exchangeRate: 1, totalProductAmount: 7900000, vatAmount: 1422000, finalSalesAmount: 9322000, remarks: "", status: "Paid" },
  ]} columns={[
    { key: "taxInvoiceRefNo", label: "Invoice" }, { key: "invoiceDate", label: "Date" }, { key: "customer", label: "Customer" }, { key: "finalSalesAmount", label: "Amount" }, { key: "invoiceType", label: "Type" }, { key: "status", label: "Status" },
  ]} />;
}

// ==================== CUSTOMER RECEIPTS ====================

export function CustomerReceiptsPage() {
  return <MasterCrudPage title="Customer Receipts" description="TBL_CUSTOMER_RECEIPT_HDR" idPrefix="CR" fields={[
    { key: "receiptRefNo", label: "Receipt Ref No", type: "text", required: true },
    { key: "receiptDate", label: "Receipt Date", type: "date", required: true },
    { key: "paymentType", label: "Payment Type", type: "select", options: ["Full Payment", "Partial Payment", "Advance"] },
    { key: "company", label: "Company", type: "text" },
    { key: "customer", label: "Customer", type: "text", required: true },
    { key: "paymentMode", label: "Payment Mode", type: "select", options: ["Bank Transfer", "Cheque", "Cash", "Mobile Money"] },
    { key: "crBankCash", label: "CR Bank/Cash", type: "text" },
    { key: "crAccount", label: "CR Account", type: "text" },
    { key: "drBankCash", label: "DR Bank/Cash", type: "text" },
    { key: "transactionRefNo", label: "Transaction Ref No", type: "text" },
    { key: "transactionDate", label: "Transaction Date", type: "date" },
    { key: "currency", label: "Currency", type: "select", options: ["TZS", "USD", "EUR"] },
    { key: "receiptAmount", label: "Receipt Amount", type: "number", required: true },
    { key: "exchangeRate", label: "Exchange Rate", type: "number" },
    { key: "receiptAmountLC", label: "Amount (Local Currency)", type: "number" },
    { key: "remarks", label: "Remarks", type: "textarea" },
    { key: "status", label: "Status", type: "select", required: true, options: ["Draft", "Submitted", "Approved", "Rejected"] },
  ]} initialData={[
    { id: "CR001", receiptRefNo: "CR/03/001", receiptDate: "2024-03-20", paymentType: "Full Payment", company: "AgroTanzania Ltd", customer: "Metro Foods Inc", paymentMode: "Bank Transfer", crBankCash: "CRDB Bank", crAccount: "0150-123456789", drBankCash: "", transactionRefNo: "TXN-2024-001", transactionDate: "2024-03-20", currency: "TZS", receiptAmount: 9322000, exchangeRate: 1, receiptAmountLC: 9322000, remarks: "", status: "Approved" },
  ]} columns={[
    { key: "receiptRefNo", label: "Receipt No" }, { key: "receiptDate", label: "Date" }, { key: "customer", label: "Customer" }, { key: "receiptAmount", label: "Amount" }, { key: "paymentMode", label: "Mode" }, { key: "status", label: "Status" },
  ]} />;
}
