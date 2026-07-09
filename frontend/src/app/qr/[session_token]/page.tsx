"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useCustomerStore } from "@/store/useCustomerStore";
// In a real app, you would import a Supabase client to fetch/verify the session from DB
// import { supabase } from "@/lib/supabase/client";

export default function QRSessionPage() {
  const router = useRouter();
  const params = useParams();
  const sessionToken = params.session_token as string;
  const setSession = useCustomerStore((state) => state.setSession);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Here we would normally query the database:
        // const { data, error } = await supabase.from('dining_sessions').select('*').eq('session_token', params.session_token).single();
        // if (error) throw error;
        
        // Mocking the successful initialization for now
        setTimeout(() => {
          setSession({
            id: "mock-session-id",
            sessionToken: sessionToken,
            restaurantId: "restaurant-1",
            branchId: "branch-1",
            tableId: "table-1",
            tableNumber: "T-08",
            status: "active",
          });
          
          // Route to the digital menu
          if (sessionToken) {
            router.push(`/m/${sessionToken}`);
          }
        }, 1500);
      } catch (err) {
        setError("Invalid or expired QR code.");
      }
    };

    if (sessionToken) {
      initializeSession();
    }
  }, [sessionToken, router, setSession]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
        <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <span className="text-2xl text-red-600">✕</span>
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-900">Oops!</h2>
          <p className="text-gray-500">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a192f] px-4 text-white">
      <div className="flex flex-col items-center">
        {/* Mock Logo */}
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#00D9D9]/20 shadow-[0_0_40px_rgba(0,217,217,0.2)]">
           <span className="text-4xl text-[#00D9D9]">🍽️</span>
        </div>
        
        <h1 className="mb-2 text-2xl font-bold">The Green Bowl</h1>
        <p className="mb-12 text-sm text-gray-400">Multi Cuisine Restaurant</p>
        
        <div className="mb-12 flex h-32 w-32 flex-col items-center justify-center rounded-2xl border border-[#00D9D9]/30 bg-[#00D9D9]/10">
          <span className="text-xs font-semibold text-[#00D9D9] uppercase tracking-wider mb-1">Table Number</span>
          <span className="text-3xl font-bold">T-08</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-400">
          <Loader2 className="h-5 w-5 animate-spin text-[#00D9D9]" />
          Setting up your dining session...
        </div>
      </div>
    </div>
  );
}
