"use client";

import { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { cn } from "@/lib/utils";
import { useNotificationStore } from "@/store/useNotificationStore";

interface AppShellProps {
  children: React.ReactNode;
  userName?: string;
  userEmail?: string;
  userRole?: string;
  signOutSlot?: React.ReactNode;
}

export function AppShell({
  children,
  userName,
  userEmail,
  userRole,
  signOutSlot,
}: AppShellProps) {
  const { addNotification } = useNotificationStore();

  useEffect(() => { 
    // Live simulation globally across the app
    const interval = setInterval(() => {
      addNotification({
        title: "Customer Request",
        description: `Table T-${Math.floor(Math.random() * 20 + 1).toString().padStart(2, '0')} requested for Waiter`,
        category: "Request",
        priority: "Low",
        time: "Just now"
      });
    }, 45000); 

    return () => clearInterval(interval);
  }, [addNotification]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Fixed */}
      <div className="shrink-0 bg-white">
        <Sidebar userName={userName} userEmail={userEmail} userRole={userRole} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50/50">
        {/* Top Navbar */}
        <header className="h-[72px] shrink-0 border-b border-gray-100 bg-white">
          <Navbar
            userName={userName}
            userEmail={userEmail}
            userRole={userRole}
            signOutSlot={signOutSlot}
          />
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
