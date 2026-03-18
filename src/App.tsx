import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import DashboardPage from "@/pages/DashboardPage";
import ProductsPage from "@/pages/ProductsPage";
import SuppliersPage from "@/pages/SuppliersPage";
import CustomersPage from "@/pages/CustomersPage";
import PurchaseOrdersPage from "@/pages/PurchaseOrdersPage";
import CreatePurchaseOrderPage from "@/pages/CreatePurchaseOrderPage";
import {
  CategoriesPage, CompaniesPage, StoresPage, EmployeesPage,
  BankAccountsPage, UomPage, TaxMasterPage, AccountHeadsPage,
  BillingLocationsPage, FinancialYearsPage, PaymentModesPage,
  GoodsReceiptsPage, PurchaseBookingPage,
  SalesOrdersPage, DeliveryNotesPage, SalesInvoicesPage, ExpensesPage,
} from "@/pages/MasterPages";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/bank-accounts" element={<BankAccountsPage />} />
            <Route path="/uom" element={<UomPage />} />
            <Route path="/tax-master" element={<TaxMasterPage />} />
            <Route path="/account-heads" element={<AccountHeadsPage />} />
            <Route path="/billing-locations" element={<BillingLocationsPage />} />
            <Route path="/financial-years" element={<FinancialYearsPage />} />
            <Route path="/payment-modes" element={<PaymentModesPage />} />
            <Route path="/purchase-orders" element={<PurchaseOrdersPage />} />
            <Route path="/purchase-orders/create" element={<CreatePurchaseOrderPage />} />
            <Route path="/goods-receipts" element={<GoodsReceiptsPage />} />
            <Route path="/purchase-booking" element={<PurchaseBookingPage />} />
            <Route path="/sales-orders" element={<SalesOrdersPage />} />
            <Route path="/delivery-notes" element={<DeliveryNotesPage />} />
            <Route path="/sales-invoices" element={<SalesInvoicesPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
