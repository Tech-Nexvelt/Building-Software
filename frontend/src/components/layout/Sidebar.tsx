"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  ChefHat,
  LayoutGrid,
  MenuSquare,
  Users,
  CreditCard,
  UserCircle,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Package2,
  LogOut,
  QrCode,
  ChevronDown,
  ChevronUp,
  CircleDot,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Receipt,
  Landmark,
  Wallet,
  History,
  TrendingUp,
  LineChart,
  PieChart,
  Target,
  BarChart2,
  CalendarDays,
  Hammer,
  FileDown,
  BellRing,
  Megaphone,
  UserPlus,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";
import { useAppStore } from "@/store/useAppStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getInitials } from "@/lib/utils";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/billing",   label: "Orders",    icon: ShoppingCart },
  { href: "/kitchen",   label: "Kitchen",   icon: ChefHat },
  { href: "/tables",    label: "Tables",    icon: LayoutGrid },
  { 
    href: "/products",  
    label: "Menu Management", 
    icon: MenuSquare,
    subItems: [
      { href: "/products/categories", label: "Categories", icon: CircleDot },
      { href: "/products/items", label: "Menu Items", icon: CircleDot },
      { href: "/products/variants", label: "Variants", icon: CircleDot },
      { href: "/products/addons", label: "Add-ons", icon: CircleDot },
      { href: "/products/availability", label: "Menu Availability", icon: CircleDot },
      { href: "/products/bulk", label: "Bulk Operations", icon: CircleDot },
      { href: "/products/preview", label: "Menu Preview", icon: CircleDot },
    ]
  },
  { 
    href: "/notifications",  
    label: "Notifications",  
    icon: Bell,
    badge: "12",
    subItems: [
      { href: "/notifications", label: "All Notifications", icon: Bell },
      { href: "/notifications/kitchen", label: "Kitchen Alerts", icon: BellRing },
      { href: "/notifications/payments", label: "Payment Alerts", icon: Wallet },
      { href: "/notifications/orders", label: "Order Notifications", icon: CircleDot },
      { href: "/notifications/customers", label: "Customer Requests", icon: UserPlus, badge: "3" },
      { href: "/notifications/announcements", label: "Announcements", icon: Megaphone },
    ]
  },
  { href: "/qrcodes",   label: "QR Codes",  icon: QrCode },
  { 
    href: "/payments",  
    label: "Payments",  
    icon: CreditCard,
    subItems: [
      { href: "/payments", label: "Payments Dashboard", icon: LayoutDashboard },
      { href: "/payments/transactions", label: "Transactions", icon: CircleDot },
      { href: "/payments/pending", label: "Pending Payments", icon: Clock },
      { href: "/payments/successful", label: "Successful Payments", icon: CheckCircle2 },
      { href: "/payments/failed", label: "Failed Payments", icon: XCircle },
      { href: "/payments/refunds", label: "Refunds", icon: RotateCcw },
      { href: "/payments/invoices", label: "Invoices", icon: Receipt },
      { href: "/payments/settlements", label: "Settlements", icon: Landmark },
      { href: "/payments/gateways", label: "Payment Gateways", icon: Wallet },
      { href: "/payments/history", label: "Payment History", icon: History },
    ]
  },
  { 
    href: "/reports",   
    label: "Reports",   
    icon: FileText,
    subItems: [
      { href: "/reports", label: "Reports Dashboard", icon: LayoutDashboard },
      { href: "/reports/sales", label: "Sales Reports", icon: TrendingUp },
      { href: "/reports/orders", label: "Orders Reports", icon: LineChart },
      { href: "/reports/payments", label: "Payments Reports", icon: PieChart },
      { href: "/reports/tax", label: "Tax Reports", icon: Receipt },
      { href: "/reports/menu", label: "Menu Performance", icon: Target },
      { href: "/reports/tables", label: "Table Utilization", icon: BarChart2 },
      { href: "/reports/closing", label: "Daily Closing", icon: CalendarDays },
      { href: "/reports/custom", label: "Custom Builder", icon: Hammer },
      { href: "/reports/scheduled", label: "Scheduled Reports", icon: Clock },
      { href: "/reports/exports", label: "Export Center", icon: FileDown },
    ]
  },
  { href: "/settings",  label: "Settings",  icon: Settings },
];

interface SidebarProps {
  userName?: string;
  userEmail?: string;
  userRole?: string;
}

export function Sidebar({
  userName = "User",
  userEmail = "",
  userRole = "cashier",
}: SidebarProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    "/products": false,
    "/payments": false,
    "/reports": false,
    "/notifications": true, // Default expand Notifications
  });

  const toggleMenu = (href: string) => {
    setExpandedMenus(prev => ({ ...prev, [href]: !prev[href] }));
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  return (
    <TooltipProvider delay={0}>
      <aside
        className={cn(
          "relative flex flex-col h-full border-r border-gray-100 bg-white transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-[68px]" : "w-[240px]"
        )}
      >
        {/* Logo */}
        <div className="flex h-[72px] items-center border-b border-gray-100 px-3 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Nexvelt Logo" 
                width={36} 
                height={36} 
                className="object-contain"
              />
            </div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="text-lg font-bold text-gray-900 whitespace-nowrap leading-none tracking-tight">
                    Nexvelt <span className="text-[#00D9D9]">POS</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            const linkEl = (
              <Link
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                  "hover:bg-gray-50 hover:text-gray-900",
                  isActive
                    ? "bg-[#00D9D9]/10 text-[#00D9D9] shadow-sm"
                    : "text-gray-600"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-transform duration-150",
                    "group-hover:scale-110",
                    isActive ? "text-[#00D9D9]" : "text-gray-400"
                  )}
                />
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap overflow-hidden flex-1"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!sidebarCollapsed && item.subItems && (
                  <div 
                    className="ml-auto"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation when just toggling
                      toggleMenu(item.href);
                    }}
                  >
                    {expandedMenus[item.href] ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                )}
              </Link>
            );

            const hasExpandedSubmenu = !sidebarCollapsed && item.subItems && expandedMenus[item.href];

            if (sidebarCollapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    {linkEl}
                  </TooltipTrigger>
                  <TooltipContent side="right" className="font-medium bg-gray-900 text-white border-transparent">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <div key={item.href} className="space-y-1">
                {linkEl}
                <AnimatePresence>
                  {hasExpandedSubmenu && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-9 pr-3 space-y-1 py-1">
                        {item.subItems?.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          const SubIcon = sub.icon;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-bold transition-all duration-200",
                                "hover:bg-[#00D9D9]/5 hover:text-[#00D9D9]",
                                isSubActive
                                  ? "bg-[#00D9D9]/10 text-[#00D9D9]"
                                  : "text-gray-500"
                              )}
                            >
                              <SubIcon className="h-3 w-3 shrink-0" />
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="shrink-0 p-3">
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={cn(
              "flex items-center gap-3 px-3 py-2 w-full rounded-xl text-[14px] font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all",
              sidebarCollapsed && "justify-center"
            )}
          >
            {isLoggingOut ? (
              <Loader2 className="w-5 h-5 animate-spin shrink-0" />
            ) : (
              <LogOut className="w-5 h-5 shrink-0" />
            )}
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "absolute -right-3.5 top-[22px] h-7 w-7 rounded-full border border-gray-200 bg-white shadow-sm z-10",
            "hover:bg-gray-50 text-gray-500 hover:text-[#00D9D9]"
          )}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </Button>
      </aside>
    </TooltipProvider>
  );
}
