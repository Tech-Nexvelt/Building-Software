import { AppShell } from "@/components/layout/AppShell";
import { AuthProvider } from "@/modules/auth/components/AuthProvider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AppShell>{children}</AppShell>
    </AuthProvider>
  );
}
