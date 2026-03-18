import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Package, Users, UserCircle, ShoppingCart, ClipboardCheck,
  Settings, LogOut, Bell, Search, Sprout, ChevronDown, Building2, Store,
  MapPin, Calendar, Tag, Ruler, Landmark, CreditCard, Receipt, FileText,
  Truck, DollarSign, BarChart3, Briefcase
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "OVERVIEW",
    items: [
      { label: "Dashboard", path: "/", icon: LayoutDashboard },
    ],
  },
  {
    title: "MASTER DATA",
    items: [
      { label: "Products", path: "/products", icon: Package },
      { label: "Categories", path: "/categories", icon: Tag },
      { label: "Suppliers", path: "/suppliers", icon: Truck },
      { label: "Customers", path: "/customers", icon: Users },
      { label: "Companies", path: "/companies", icon: Building2 },
      { label: "Stores", path: "/stores", icon: Store },
      { label: "Employees", path: "/employees", icon: Briefcase },
      { label: "Bank Accounts", path: "/bank-accounts", icon: Landmark },
      { label: "UOM", path: "/uom", icon: Ruler },
      { label: "Tax Master", path: "/tax-master", icon: Receipt },
      { label: "Account Heads", path: "/account-heads", icon: FileText },
      { label: "Billing Locations", path: "/billing-locations", icon: MapPin },
      { label: "Financial Years", path: "/financial-years", icon: Calendar },
      { label: "Payment Modes", path: "/payment-modes", icon: CreditCard },
    ],
  },
  {
    title: "PURCHASING",
    items: [
      { label: "Purchase Orders", path: "/purchase-orders", icon: ShoppingCart },
      { label: "Goods Receipts", path: "/goods-receipts", icon: ClipboardCheck },
      { label: "Purchase Booking", path: "/purchase-booking", icon: FileText },
    ],
  },
  {
    title: "SALES",
    items: [
      { label: "Sales Orders", path: "/sales-orders", icon: DollarSign },
      { label: "Delivery Notes", path: "/delivery-notes", icon: Truck },
      { label: "Sales Invoices", path: "/sales-invoices", icon: Receipt },
    ],
  },
  {
    title: "FINANCE",
    items: [
      { label: "Expenses", path: "/expenses", icon: CreditCard },
      { label: "Reports", path: "/reports", icon: BarChart3 },
    ],
  },
];

export default function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="sidebar-gradient flex flex-col w-[240px] min-h-screen text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Sprout className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-base text-sidebar-foreground">AgroManage</h1>
          <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60">Forest Admin v2.0</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {navSections.map((section) => (
          <div key={section.title} className="mb-2">
            <button
              onClick={() => toggleSection(section.title)}
              className="flex items-center justify-between w-full px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50 hover:text-sidebar-foreground/70"
            >
              {section.title}
              <ChevronDown className={`w-3 h-3 transition-transform ${collapsed[section.title] ? "-rotate-90" : ""}`} />
            </button>
            {!collapsed[section.title] && (
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-sidebar-accent">
          <div className="w-9 h-9 rounded-full bg-sidebar-foreground/20 flex items-center justify-center text-sm font-bold">
            JT
          </div>
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground">Julian Thorne</p>
            <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/50">Chief Agronomist</p>
          </div>
        </div>
        <Link to="/settings" className="flex items-center gap-3 px-3 py-2 mt-1 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent">
          <Settings className="w-4 h-4" /> Settings
        </Link>
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent w-full">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
