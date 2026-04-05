"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import {
  BarChart3,
  FileText,
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  TrendingUp,
  X,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/sites", label: "Sites", icon: Globe },
  { href: "/dashboard/rankings", label: "Rankings", icon: TrendingUp },
  { href: "/dashboard/queries", label: "Queries", icon: Search },
  { href: "/dashboard/reports", label: "Reports", icon: FileText },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  const NavContent = () => (
    <>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-[rgba(0,240,255,0.08)] text-[#00f0ff] border border-[rgba(0,240,255,0.1)]"
                  : "text-[#64748b] hover:text-white hover:bg-[rgba(255,255,255,0.03)]"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[rgba(0,240,255,0.06)]">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center text-xs font-bold text-[#050510]">
            {(user.user_metadata?.full_name?.[0] || user.email?.[0] || "U").toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user.user_metadata?.full_name || "User"}
            </p>
            <p className="text-xs text-[#475569] truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#64748b] hover:text-red-400 hover:bg-red-400/5 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-[rgba(0,240,255,0.06)] bg-[rgba(5,5,16,0.95)]">
        <div className="h-16 flex items-center px-6 border-b border-[rgba(0,240,255,0.06)]">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center">
              <span className="text-xs font-bold text-[#050510]">G</span>
            </div>
            <span className="text-base font-bold text-white">
              GEO<span className="text-[#00f0ff]">Tool</span>
            </span>
          </Link>
        </div>
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 border-b border-[rgba(0,240,255,0.06)] bg-[rgba(5,5,16,0.98)] backdrop-blur-sm">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center">
            <span className="text-xs font-bold text-[#050510]">G</span>
          </div>
          <span className="text-base font-bold text-white">
            GEO<span className="text-[#00f0ff]">Tool</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-[#64748b] hover:text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="md:hidden fixed top-14 right-0 bottom-0 z-50 w-64 flex flex-col border-l border-[rgba(0,240,255,0.06)] bg-[rgba(5,5,16,0.98)]">
            <NavContent />
          </aside>
        </>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-[#050510]">
        <div className="p-6 lg:p-8 md:pt-6 pt-20">{children}</div>
      </main>
    </div>
  );
}
