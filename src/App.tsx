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
  CategoriesPage, SubCategoriesPage, CompaniesPage, StoresPage, LocationsPage, EmployeesPage,
  BankAccountsPage, BankMasterPage, UomPage, TaxMasterPage, VatSettingsPage, AccountHeadsPage,
  LedgerGroupsPage, LedgerMasterPage,
  BillingLocationsPage, FinancialYearsPage, PaymentModesPage, CustomerPaymentModesPage,
  PaymentTermsPage, AdditionalCostTypesPage,
  CountriesPage, RegionsPage, DistrictsPage, CurrencyMasterPage, ExchangeRatePage,
  RolesPage, UsersPage, UserStoreMappingPage, SalesPersonsPage,
  StoreProductMinStockPage, ProductOpeningStockPage, ProductCompanyCategoryMappingPage,
  GoodsReceiptsPage, PurchaseBookingPage,
  SalesOrdersPage, DeliveryNotesPage, SalesInvoicesPage, ExpensesPage,
  CustomerReceiptsPage,
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
            {/* Core Master Data */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/sub-categories" element={<SubCategoriesPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/sales-persons" element={<SalesPersonsPage />} />
            {/* Financial */}
            <Route path="/bank-master" element={<BankMasterPage />} />
            <Route path="/bank-accounts" element={<BankAccountsPage />} />
            <Route path="/currencies" element={<CurrencyMasterPage />} />
            <Route path="/exchange-rates" element={<ExchangeRatePage />} />
            <Route path="/uom" element={<UomPage />} />
            <Route path="/tax-master" element={<TaxMasterPage />} />
            <Route path="/vat-settings" element={<VatSettingsPage />} />
            <Route path="/account-heads" element={<AccountHeadsPage />} />
            <Route path="/ledger-groups" element={<LedgerGroupsPage />} />
            <Route path="/ledger-master" element={<LedgerMasterPage />} />
            <Route path="/billing-locations" element={<BillingLocationsPage />} />
            <Route path="/financial-years" element={<FinancialYearsPage />} />
            <Route path="/payment-modes" element={<PaymentModesPage />} />
            <Route path="/customer-payment-modes" element={<CustomerPaymentModesPage />} />
            <Route path="/payment-terms" element={<PaymentTermsPage />} />
            <Route path="/additional-cost-types" element={<AdditionalCostTypesPage />} />
            {/* Geography */}
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/regions" element={<RegionsPage />} />
            <Route path="/districts" element={<DistrictsPage />} />
            {/* System */}
            <Route path="/roles" element={<RolesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/user-store-mapping" element={<UserStoreMappingPage />} />
            {/* Inventory Settings */}
            <Route path="/store-product-min-stock" element={<StoreProductMinStockPage />} />
            <Route path="/product-opening-stock" element={<ProductOpeningStockPage />} />
            <Route path="/product-company-category" element={<ProductCompanyCategoryMappingPage />} />
            {/* Purchasing */}
            <Route path="/purchase-orders" element={<PurchaseOrdersPage />} />
            <Route path="/purchase-orders/create" element={<CreatePurchaseOrderPage />} />
            <Route path="/goods-receipts" element={<GoodsReceiptsPage />} />
            <Route path="/purchase-booking" element={<PurchaseBookingPage />} />
            {/* Sales */}
            <Route path="/sales-orders" element={<SalesOrdersPage />} />
            <Route path="/delivery-notes" element={<DeliveryNotesPage />} />
            <Route path="/sales-invoices" element={<SalesInvoicesPage />} />
            {/* Finance */}
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/customer-receipts" element={<CustomerReceiptsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
