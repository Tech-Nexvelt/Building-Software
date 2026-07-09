"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useBranchStore, Branch } from "@/store/useBranchStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { MapPin, ChevronDown, BellRing } from "lucide-react";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/dashboard": { title: "Dashboard",       description: "Overview & analytics" },
  "/billing":   { title: "Billing / POS",   description: "Create new orders" },
  "/products":  { title: "Products",        description: "Manage your menu" },
  "/sales":     { title: "Sales History",   description: "View past orders" },
  "/customers": { title: "Customers",       description: "Manage customer relationships" },
  "/settings":  { title: "Settings",        description: "Business configuration" },
};

interface NavbarProps {
  userName?: string;
  userEmail?: string;
  userRole?: string;
  signOutSlot?: React.ReactNode;
}

export function Navbar({
  userName = "User",
  userEmail = "",
  userRole = "cashier",
  signOutSlot,
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const { notifications, markAsRead } = useNotificationStore();

  const kitchenAlerts = notifications.filter(n => n.category === 'Kitchen' && !n.read);

  const currentPage = Object.entries(pageTitles).find(([key]) =>
    pathname.startsWith(key)
  );
  const pageInfo = currentPage?.[1] ?? { title: "Nexvelt POS", description: "" };

  return (
    <div className="flex h-full items-center justify-between px-6">
      {/* Page title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          {pageInfo.title}
        </h1>
        {pageInfo.description && (
          <p className="text-sm text-gray-500 mt-0.5 font-medium">
            {pageInfo.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Branch Switcher */}
        <BranchSwitcher userRole={userRole} />

        {/* Search */}
        <div className="hidden md:flex relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#00D9D9] transition-colors" />
          </div>
          <input
            type="text"
            className="block w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00D9D9] focus:ring-1 focus:ring-[#00D9D9] sm:text-sm transition-all"
            placeholder="Search anything..."
          />
        </div>

        {/* Notifications (Kitchen Alerts Dropdown) */}
        <DropdownMenu>
          <DropdownMenuTrigger 
            render={
              <button
                className="relative h-10 w-10 rounded-xl flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 hover:text-[#00D9D9] text-gray-500 transition-colors outline-none"
              >
                <Bell className="h-5 w-5" />
                {kitchenAlerts.length > 0 && (
                  <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                )}
              </button>
            }
          />
          <DropdownMenuContent align="end" className="w-80 bg-white border-gray-100 text-gray-900 rounded-xl shadow-lg p-2 max-h-[400px] overflow-y-auto">
            <div className="flex items-center justify-between px-2 py-1.5 mb-1">
              <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <BellRing className="h-4 w-4 text-orange-500" /> Kitchen Alerts
              </span>
              <span className="text-[10px] font-bold bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded-full">{kitchenAlerts.length} Unread</span>
            </div>
            <DropdownMenuSeparator className="bg-gray-100" />
            {kitchenAlerts.length === 0 ? (
               <div className="py-6 text-center text-xs text-gray-500 font-medium">No new kitchen alerts</div>
            ) : (
              kitchenAlerts.map(alert => (
                <DropdownMenuItem 
                  key={alert.id} 
                  className="flex flex-col items-start gap-1 p-3 cursor-pointer rounded-lg hover:bg-gray-50 mb-1"
                  onClick={() => {
                    markAsRead(alert.id);
                    router.push('/notifications/kitchen');
                  }}
                >
                  <div className="flex w-full justify-between items-start">
                    <span className="text-xs font-bold text-gray-900">{alert.title}</span>
                    <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-2">{alert.time}</span>
                  </div>
                  <span className="text-[11px] text-gray-500 leading-snug line-clamp-2">{alert.description}</span>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator className="bg-gray-100 mt-1" />
            <div 
              className="px-2 py-2 text-center text-xs font-bold text-[#00D9D9] hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              onClick={() => router.push('/notifications/kitchen')}
            >
              View All Kitchen Alerts
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                className="relative h-10 w-10 rounded-xl p-0 hover:ring-2 hover:ring-[#00D9D9]/30 focus:outline-none transition-all outline-none"
                aria-label="User menu"
              >
                <Avatar className="h-10 w-10 border border-gray-200 rounded-xl overflow-hidden">
                  <AvatarFallback className="bg-button-gradient text-white text-sm font-bold">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
              </button>
            }
          />
          <DropdownMenuContent align="end" className="w-56 bg-white border-gray-100 text-gray-900 rounded-xl shadow-lg">
            <DropdownMenuLabel>
              <div className="flex flex-col gap-1.5 p-1">
                <p className="text-sm font-bold text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500 truncate font-medium">{userEmail}</p>
                <Badge variant="outline" className="w-fit text-[10px] capitalize mt-1 border-[#00D9D9]/30 text-[#00D9D9] bg-[#00D9D9]/5">
                  {userRole}
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-100" />
            
            <DropdownMenuItem 
              className="cursor-pointer rounded-lg font-medium"
              onClick={() => router.push('/settings/business-profile')}
            >
              Profile Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-gray-100" />
            
            {signOutSlot ?? (
              <DropdownMenuItem
                className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer rounded-lg font-medium"
                onClick={() => logout()}
              >
                Sign out
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function BranchSwitcher({ userRole }: { userRole: string }) {
  const { currentBranch, availableBranches, setCurrentBranch } = useBranchStore();

  if (!currentBranch) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        render={
          <Button variant="outline" className="gap-2 rounded-xl text-gray-700 font-medium">
            <MapPin className="h-4 w-4 text-[#00D9D9]" />
            <span className="hidden sm:inline-block max-w-[120px] truncate">{currentBranch.name}</span>
            {userRole === 'owner' && <ChevronDown className="h-4 w-4 text-gray-400" />}
          </Button>
        }
      />
      {userRole === 'owner' && availableBranches.length > 0 && (
        <DropdownMenuContent align="end" className="w-56 bg-white rounded-xl shadow-lg border-gray-100">
          <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Switch Branch
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-100" />
          {availableBranches.map((branch) => (
            <DropdownMenuItem
              key={branch.id}
              onClick={() => setCurrentBranch(branch)}
              className={`cursor-pointer rounded-lg font-medium mb-1 ${
                currentBranch.id === branch.id 
                  ? "bg-[#00D9D9]/10 text-[#00D9D9]" 
                  : "text-gray-700"
              }`}
            >
              <div className="flex flex-col">
                <span>{branch.name}</span>
                {branch.address && <span className="text-[10px] text-gray-400 truncate">{branch.address}</span>}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
